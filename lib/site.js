/* =========================================================
   lib/site.js — endereço público do site
   ---------------------------------------------------------
   Usado no sitemap, no robots.txt, no Open Graph e no JSON-LD.
   Esses lugares precisam do endereço COMPLETO (com https://),
   porque o Google e as redes sociais leem de fora do site.
   ========================================================= */

// Endereço de produção na Vercel (o padrão, se nada for configurado)
const ENDERECO_PADRAO = "https://portfolio-vanessa-lima.vercel.app";

/**
 * Limpa o endereço: tira espaços e a barra do final.
 * Ex.: "https://meusite.com/ " → "https://meusite.com"
 * Se vier vazio ou inválido (sem http/https), usa o padrão.
 */
export function normalizarUrl(valor) {
  const limpo = String(valor ?? "")
    .trim()
    .replace(/\/+$/, "");
  return /^https?:\/\/[^\s/]+/.test(limpo) ? limpo : ENDERECO_PADRAO;
}

// NEXT_PUBLIC_SITE_URL é opcional (veja .env.example). Não é segredo:
// é o endereço que qualquer pessoa vê na barra do navegador.
export const URL_SITE = normalizarUrl(process.env.NEXT_PUBLIC_SITE_URL);

/** Monta um endereço completo a partir de um caminho. Ex.: "/sobre" → "https://.../sobre" */
export function urlCompleta(caminho = "/") {
  return caminho === "/" ? URL_SITE : `${URL_SITE}${caminho}`;
}
