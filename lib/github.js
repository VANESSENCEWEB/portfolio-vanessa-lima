/* =========================================================
   lib/github.js — repositórios públicos pela API do GitHub
   ---------------------------------------------------------
   Duas partes, separadas de propósito:
   1. filtrarRepositorios() → função "pura" (em lib/repositorios.js):
      recebe a lista crua da API e devolve só o que deve aparecer
      no site. Não acessa a internet: dá para testar com dados de mentira.
   2. buscarRepositorios() → faz o fetch de verdade e guarda
      o resultado com "use cache" + cacheLife("hours"). Assim
      a API é chamada poucas vezes (o limite sem token é de
      60 pedidos por hora) e a página abre rápido.
   Documentação da API:
   https://docs.github.com/rest/repos/repos#list-repositories-for-a-user
   ========================================================= */
import { cacheLife } from "next/cache";
import { filtrarRepositorios } from "./repositorios";

const API = "https://api.github.com";

/* As funções "puras" (filtro, data, chave) moram em lib/repositorios.js,
   porque o script de prints também usa. Exportadas aqui de novo para
   quem já importava de lib/github.js. */
export { chaveDe, filtrarRepositorios, formatarData } from "./repositorios";

/* ---------- Busca (com cache) ----------
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
