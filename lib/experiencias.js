/* =========================================================
   lib/experiencias.js — funções pequenas das páginas de experiência
   ---------------------------------------------------------
   1. PREENCHER   → marcador de "dado que ainda falta"
   2. temValor    → o campo tem algo para mostrar?
   3. formatarPeriodo → { inicio, fim, emAndamento } vira texto
   4. camposPendentes → lista o que falta preencher
   Ficam aqui (e não no componente) para poder testar sem tela.
   ========================================================= */

/* ---------- 1. Marcador de campo pendente ----------
   Em data/experiencias.js, todo dado que a Vanessa ainda não
   confirmou recebe PREENCHER em vez de um valor inventado.
   - No site publicado: o campo some (nada de "a preencher" na tela).
   - No npm run dev: aparece um aviso ✏️ no item, para lembrar.
   - No npm test: o teste lista tudo que falta.
   Object.freeze = ninguém consegue alterar o marcador sem querer. */
export const PREENCHER = Object.freeze({ preencher: true });

/* Mostra os avisos ✏️ só no modo desenvolvimento (npm run dev) */
export const MOSTRAR_PENDENTES = process.env.NODE_ENV === "development";

/* ---------- 2. O campo tem valor de verdade? ----------
   Falso para: null, undefined, texto vazio e o marcador PREENCHER. */
export function temValor(valor) {
  if (valor === null || valor === undefined || valor === PREENCHER) return false;
  return typeof valor !== "string" || valor.trim() !== "";
}

/* ---------- 3. Período em texto ----------
   Exemplos:
   { inicio: "2025.1", emAndamento: true }  → "2025.1 — atual"
   { inicio: "2024", fim: "2025" }          → "2024 — 2025"
   { inicio: "2026.1" }                     → "2026.1"
   sem início                               → null (a Tag "Em andamento" já avisa) */
export function formatarPeriodo({ inicio, fim, emAndamento } = {}) {
  if (!temValor(inicio)) return null;
  if (emAndamento) return `${inicio} — atual`;
  if (temValor(fim) && fim !== inicio) return `${inicio} — ${fim}`;
  return inicio;
}

/* ---------- 4. O que falta preencher ----------
   camposPendentesDoItem({ id: "x", cargo: PREENCHER }) → ["cargo"]
   camposPendentes([...itens]) → ["x.cargo", "y.inicio"] */
export function camposPendentesDoItem(item = {}) {
  return Object.keys(item).filter((campo) => item[campo] === PREENCHER);
}

export function camposPendentes(itens = []) {
  return itens.flatMap((item) => camposPendentesDoItem(item).map((campo) => `${item.id}.${campo}`));
}
