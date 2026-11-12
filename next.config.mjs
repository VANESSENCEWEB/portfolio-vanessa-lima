/* =========================================================
   next.config.mjs — configurações do Next.js
   ---------------------------------------------------------
   As duas primeiras opções vieram do create-next-app e ficam.
   Novidade do Dia 2: cabeçalhos de SEGURANÇA, enviados pelo
   servidor junto com cada página.
   ========================================================= */

/* Cabeçalhos de segurança (valem para todas as páginas) */
const cabecalhosDeSeguranca = [
  // Proíbe outros sites de colocarem o portfólio dentro de um <iframe> (golpe de "clickjacking")
  { key: "X-Frame-Options", value: "DENY" },
  // O navegador não "adivinha" o tipo de um arquivo (evita executar algo disfarçado)
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Ao clicar num link externo, o outro site só sabe o domínio de origem, não a página inteira
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // O site não usa câmera, microfone nem localização: bloqueia de vez
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  // Sempre HTTPS (a Vercel já usa; isso avisa o navegador para nunca tentar HTTP)
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  cacheComponents: true,
  partialPrefetching: true,

  // Esconde o cabeçalho "X-Powered-By: Next.js" (não contar a tecnologia a quem procura falhas)
  poweredByHeader: false,

  async headers() {
    return [{ source: "/:path*", headers: cabecalhosDeSeguranca }];
  },
};

export default nextConfig;
