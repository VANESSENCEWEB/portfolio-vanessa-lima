/* =========================================================
   lib/contato.js — monta o link "mailto:" do formulário
   ---------------------------------------------------------
   O site não tem servidor de e-mail: o formulário abre o
   e-mail de quem está visitando, já com assunto e mensagem
   preenchidos. Separado do componente para poder ser testado.
   encodeURIComponent: acentos, espaços e quebras de linha
   viram códigos que o link aceita (ex.: espaço → %20).
   ========================================================= */
export function montarMailto(destino, { nome = "", email = "", assunto = "", mensagem = "" }) {
  const quem = nome.trim();
  const titulo = [assunto.trim(), quem].filter(Boolean).join(" — ");
  const corpo = `${mensagem.trim()}\n\n${quem}${email.trim() ? ` (${email.trim()})` : ""}`;
  return `mailto:${destino}?subject=${encodeURIComponent(titulo)}&body=${encodeURIComponent(corpo.trim())}`;
}
