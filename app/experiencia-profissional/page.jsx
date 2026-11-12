/* Página "Experiência Profissional" (endereço /experiencia-profissional) — provisória até construirmos de verdade */
import EmConstrucao from "@/components/EmConstrucao/EmConstrucao";

/* SEO da página
   - title: só o nome; o layout completa → "Experiência Profissional — Vanessa Lima"
   - canonical: o endereço "oficial" desta página para o Google */
export const metadata = {
  title: "Experiência Profissional",
  description: "Experiência de Vanessa Lima em desenvolvimento web e design de interfaces.",
  alternates: { canonical: "/experiencia-profissional" },
};

export default function Pagina() {
  return <EmConstrucao titulo="Experiência Profissional" />;
}
