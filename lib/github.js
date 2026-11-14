/* =========================================================
   lib/github.js — repositórios públicos pela API do GitHub
   ---------------------------------------------------------
   Duas partes, separadas de propósito:
   1. filtrarRepositorios() → função "pura": recebe a lista
      crua da API e devolve só o que deve aparecer no site,
      já no formato que a página usa. Não acessa a internet,
      então dá para testar com dados de mentira.
   2. buscarRepositorios() → faz o fetch de verdade e guarda
      o resultado com "use cache" + cacheLife("hours"). Assim
      a API é chamada poucas vezes (o limite sem token é de
      60 pedidos por hora) e a página abre rápido.
   Documentação da API:
   https://docs.github.com/rest/repos/repos#list-repositories-for-a-user
   ========================================================= */
import { cacheLife } from "next/cache";

const API = "https://api.github.com";

/* ---------- Data no formato brasileiro ----------
   "2026-11-12T19:57:07Z" → "12/11/2026"
   timeZone UTC: o resultado não muda conforme o fuso do servidor. */
export function formatarData(iso) {
  if (!iso) return null;
  const data = new Date(iso);
  if (Number.isNaN(data.getTime())) return null;
  return data.toLocaleDateString("pt-BR", { timeZone: "UTC" });
}

/* ---------- 1. Filtro ----------
   Fica de fora:
   - fork (cópia do projeto de outra pessoa)
   - arquivado (projeto encerrado)
   - vazio (size 0: repositório criado e nunca preenchido)
   - qualquer nome da lista "excluir" (comparação sem maiúsculas)
   Ordem: o atualizado mais recentemente primeiro.
   limite: quantos devolver (padrão: todos). */
export function filtrarRepositorios(lista, { excluir = [], limite = Infinity } = {}) {
  if (!Array.isArray(lista)) return [];
  const proibidos = new Set(excluir.map((nome) => nome.toLowerCase()));

  return lista
    .filter((repo) => repo && !repo.fork && !repo.archived && repo.size > 0)
    .filter((repo) => !proibidos.has(String(repo.name).toLowerCase()))
    .sort((a, b) => new Date(b.pushed_at) - new Date(a.pushed_at))
    .slice(0, limite)
    .map((repo) => ({
      id: repo.id,
      nome: repo.name,
      descricao: repo.description || null,
      linguagem: repo.language || null,
      codigo: repo.html_url,
      site: repo.homepage || null,
      atualizadoEm: formatarData(repo.pushed_at),
    }));
}

/* ---------- 2. Busca (com cache) ----------
   Devolve { repositorios, erro }. Nunca "quebra" a página:
   se a API falhar (sem internet, limite estourado...), volta
   com erro: true e a página mostra um link para o GitHub.
   GITHUB_TOKEN é opcional (ver .env.example) e fica SÓ no
   servidor: sem o prefixo NEXT_PUBLIC_, nunca vai para o navegador. */
export async function buscarRepositorios(usuario, opcoes = {}) {
  "use cache";
  cacheLife("hours");

  const cabecalhos = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  if (process.env.GITHUB_TOKEN) {
    cabecalhos.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  try {
    const url = `${API}/users/${encodeURIComponent(usuario)}/repos?type=owner&sort=pushed&per_page=100`;
    const resposta = await fetch(url, { headers: cabecalhos });
    if (!resposta.ok) {
      console.warn(`[github] a API respondeu ${resposta.status}`);
      return { repositorios: [], erro: true };
    }
    const lista = await resposta.json();
    return { repositorios: filtrarRepositorios(lista, opcoes), erro: false };
  } catch (erro) {
    console.warn("[github] não foi possível buscar os repositórios:", erro.message);
    return { repositorios: [], erro: true };
  }
}
