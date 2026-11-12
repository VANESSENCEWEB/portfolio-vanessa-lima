/* Página "Projetos" (endereço /projetos) — provisória até construirmos de verdade */
import EmConstrucao from "@/components/EmConstrucao/EmConstrucao";

/* SEO da página
   - title: só o nome; o layout completa → "Projetos — Vanessa Lima"
   - canonical: o endereço "oficial" desta página para o Google */
export const metadata = {
  title: "Projetos",
  description: "Projetos desenvolvidos por Vanessa Lima com React, Next.js e JavaScript.",
  alternates: { canonical: "/projetos" },
};

export default function Pagina() {
  return <EmConstrucao titulo="Projetos" />;
}
