/* =========================================================
   lib/tema.js — configurações do tema (claro/escuro)
   ---------------------------------------------------------
   Fica num arquivo "neutro" (sem "use client") de propósito:
   assim tanto o servidor (layout.jsx) quanto o navegador
   (o botão de tema, que vem na próxima etapa) podem ler.
   ========================================================= */

// Nome da "gaveta" do navegador (localStorage) onde guardamos
// a escolha da pessoa, para lembrar na próxima visita
export const CHAVE_TEMA = "tema-portfolio";
