/* =========================================================
   app/robots.js — gera o /robots.txt
   ---------------------------------------------------------
   O robots.txt diz aos robôs de busca o que podem visitar.
   Aqui: tudo liberado, menos as rotas de API (o Dia 5 pode
   criar alguma), e o endereço do sitemap.
   Não bloqueamos /_next/: lá ficam o CSS e o JS, e o Google
   precisa deles para "ver" a página como uma pessoa vê.
   Teste: http://localhost:3000/robots.txt
   ========================================================= */
import { URL_SITE, urlCompleta } from "@/lib/site";

export default function robots() {
  return {
    rules: {
      userAgent: "*", // vale para todos os robôs
      allow: "/",
      disallow: "/api/",
    },
    sitemap: urlCompleta("/sitemap.xml"),
    host: URL_SITE,
  };
}
