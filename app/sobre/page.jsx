/* Página "Sobre" (endereço /sobre) — provisória até construirmos de verdade */
import EmConstrucao from "@/components/EmConstrucao/EmConstrucao";

/* SEO da página
   - title: só o nome; o layout completa → "Sobre — Vanessa Lima"
   - canonical: o endereço "oficial" desta página para o Google */
export const metadata = {
  title: "Sobre",
  description: "Quem é Vanessa Lima: trajetória, formação e as tecnologias usadas neste portfólio.",
  alternates: { canonical: "/sobre" },
};

export default function Pagina() {
  return <EmConstrucao titulo="Sobre" />;
}
