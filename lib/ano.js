/* =========================================================
   lib/ano.js — ano atual para o "© 2026" do rodapé
   ---------------------------------------------------------
   Por que não escrever new Date() direto no Footer?
   Com "cacheComponents: true" (next.config.mjs), o Next monta
   as páginas no build e RECUSA valores que mudam a cada vez
   (data e hora), porque a página pronta ficaria "congelada"
   sem ele saber. O erro aparece no npm run build.
   "use cache" resolve: diz ao Next "pode guardar este valor".
   Ele calcula o ano no build e recalcula de tempos em tempos,
   então em janeiro o rodapé vira o ano sozinho.
   ========================================================= */
export async function anoAtual() {
  "use cache";
  return new Date().getFullYear();
}
