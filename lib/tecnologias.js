/* =========================================================
   lib/tecnologias.js — a "família" (cor) de cada tecnologia
   ---------------------------------------------------------
   Inspirado no site da Origamid: em vez de uma cor por
   tecnologia (viraria um arco-íris), 5 cores por ÁREA.
   A Tag usa isto para pintar a bolinha e a borda.
   As cores ficam no app/globals.css (--familia-1 a --familia-5),
   com uma versão para o tema escuro e outra para o claro.

   1 · vermelho  → base da web (HTML, CSS)
   2 · laranja   → JavaScript e o que roda em cima dele
   3 · verde     → back-end e dados
   4 · azul      → React, tipagem, testes e ferramentas
   5 · roxo      → design e IA
   Tecnologia fora da lista fica neutra (a Tag de antes).
   Para incluir uma: escreva o nome em minúsculas, sem acento,
   na família certa.
   ========================================================= */

export const FAMILIAS = {
  1: {
    nome: "Base da web",
    itens: [
      "html",
      "html5",
      "css",
      "css3",
      "css modules",
      "css modules + variaveis css",
      "tailwind",
      "responsivo",
      "design responsivo",
      "web components",
    ],
  },
  2: {
    nome: "JavaScript",
    itens: [
      "javascript",
      "javascript (es2023)",
      "es modules",
      "next.js",
      "vite",
      "three.js",
      "gsap",
      "chart.js",
      "jspdf",
    ],
  },
  3: {
    nome: "Back-end e dados",
    itens: [
      "node.js",
      "express",
      "apis rest",
      "api rest",
      "supabase",
      "supabase (auth, storage, pg_cron)",
      "postgresql",
      "postgresql + rls",
      "sql",
      "sqlite",
      "migrations sql",
      "edge functions",
      "edge functions (deno)",
      "back4app",
      "python",
      "java",
      "n8n",
      "docker",
    ],
  },
  4: {
    nome: "React, testes e ferramentas",
    itens: [
      "react",
      "angular",
      "jest",
      "typescript",
      "vitest",
      "testing library",
      "node:test",
      "postman/newman",
      "newman",
      "eslint",
      "prettier",
      "git",
      "github",
      "github actions",
      "cli",
      "vs code",
      "vercel",
      "cloudflare pages",
      "netlify",
      "render",
    ],
  },
  5: {
    nome: "Design e IA",
    itens: ["figma", "ui design", "design tokens", "canva", "ia", "integracao com ia (llm)"],
  },
};

/* "Node.js" → "node.js" · "Integração" → "integracao" */
export function normalizar(texto = "") {
  return String(texto)
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "") // tira os acentos
    .trim()
    .toLowerCase();
}

/* Índice pronto: "react" → 4 (montado uma vez só) */
const INDICE = new Map(
  Object.entries(FAMILIAS).flatMap(([numero, { itens }]) =>
    itens.map((item) => [normalizar(item), Number(numero)]),
  ),
);

/* Família (1 a 5) de uma tecnologia, ou null se não estiver na lista */
export function familiaDe(tecnologia) {
  return INDICE.get(normalizar(tecnologia)) ?? null;
}
