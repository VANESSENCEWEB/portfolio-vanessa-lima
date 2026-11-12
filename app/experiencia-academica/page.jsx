/* Página "Experiência Acadêmica" (endereço /experiencia-academica) — provisória até construirmos de verdade */
import EmConstrucao from "@/components/EmConstrucao/EmConstrucao";

/* SEO da página
   - title: só o nome; o layout completa → "Experiência Acadêmica — Vanessa Lima"
   - canonical: o endereço "oficial" desta página para o Google */
export const metadata = {
  title: "Experiência Acadêmica",
  description:
    "Formação de Vanessa Lima: Sistemas para Internet na UNICAP, residência tecnológica e certificações.",
  alternates: { canonical: "/experiencia-academica" },
};

export default function Pagina() {
  return <EmConstrucao titulo="Experiência Acadêmica" />;
}
