/* =========================================================
   lib/repositorios.js — funções "puras" sobre repositórios
   ---------------------------------------------------------
   Puras = não acessam internet nem o Next: recebem dados e
   devolvem dados. Por isso ficam num arquivo SEM imports:
   - lib/github.js usa no site (com cache do Next)
   - scripts/prints-projetos.mjs usa no terminal (Node puro,
     que não entende "next/cache" nem o atalho "@/")
   ========================================================= */

/* ---------- Data no formato brasileiro ----------
   "2026-11-12T19:57:07Z" → "12/11/2026"
   timeZone UTC: o resultado não muda conforme o fuso do servidor. */
export function formatarData(iso) {
  if (!iso) return null;
  const data = new Date(iso);
  if (Number.isNaN(data.getTime())) return null;
  return data.toLocaleDateString("pt-BR", { timeZone: "UTC" });
}

/* ---------- Chave de um projeto ----------
   Nome do arquivo de print e índice do data/prints.json.
   "Jogo_Dados" → "jogo-dados" (só minúsculas, números e hífen) */
export function chaveDe(nome = "") {
  return String(nome)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/* ---------- Filtro da lista da API ----------
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
      chave: chaveDe(repo.name),
      nome: repo.name,
      descricao: repo.description || null,
      linguagem: repo.language || null,
      codigo: repo.html_url,
      site: repo.homepage || null,
      atualizadoEm: formatarData(repo.pushed_at),
    }));
}
