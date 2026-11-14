/* =========================================================
   lib/metadados.js — metadados COMPLETOS de cada página
   ---------------------------------------------------------
   O problema que esta função resolve:
   o Next junta os metadados do layout com os da página de
   forma RASA. Se a página escreve "openGraph: { title }", o
   openGraph inteiro do layout (imagem, tipo, idioma, nome do
   site) é jogado fora. Resultado: o link de /projetos
   compartilhado no LinkedIn saía SEM imagem, e o cartão do
   Twitter/X repetia o título da Home.
   Solução: cada página chama esta função, que devolve tudo
   de uma vez (canonical + Open Graph + Twitter), com a
   imagem de compartilhamento do app/opengraph-image.jsx.
   Uso:
     export const metadata = metadadosDaPagina({
       titulo: "Sobre", descricao: "...", caminho: "/sobre",
     });
   ========================================================= */
import { PESSOA, SEO } from "@/data/perfil";

/* A imagem gerada por app/opengraph-image.jsx (1200 x 630) */
export const IMAGEM_COMPARTILHAMENTO = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: `${PESSOA.nome} — ${PESSOA.cargo} · Portfólio`,
};

/* O que é igual em todas as páginas */
export const OG_BASE = {
  type: "website",
  locale: "pt_BR",
  siteName: SEO.nomeDoSite,
  images: [IMAGEM_COMPARTILHAMENTO],
};

/* Imagens de compartilhamento feitas à mão (em public/og/), para as páginas
   que têm a sua. As outras usam a imagem gerada por app/opengraph-image.jsx. */
export const IMAGENS_PROPRIAS = {
  inicio: {
    url: "/og/inicio.jpg",
    width: 1200,
    height: 630,
    alt: "Vanessa Lima, desenvolvedora front-end, na página inicial do portfólio",
  },
  sobre: {
    url: "/og/sobre.jpg",
    width: 1200,
    height: 630,
    alt: "Sobre mim — Vanessa Lima, desenvolvedora front-end",
  },
};

/* titulo: o nome da página ("Sobre"). Na Home, use null: fica o título padrão.
   caminho: "/sobre" (vira o canonical e o og:url)
   imagem: opcional, uma das IMAGENS_PROPRIAS (sem ela, vale a imagem gerada) */
export function metadadosDaPagina({ titulo = null, descricao, caminho, imagem = IMAGEM_COMPARTILHAMENTO }) {
  const tituloCompleto = titulo ? SEO.modeloTitulo.replace("%s", titulo) : SEO.tituloPadrao;

  return {
    ...(titulo && { title: titulo }), // o layout completa → "Sobre — Vanessa Lima"
    description: descricao,
    alternates: { canonical: caminho },
    openGraph: {
      ...OG_BASE,
      title: tituloCompleto,
      description: descricao,
      url: caminho,
      images: [imagem],
    },
    twitter: {
      card: "summary_large_image",
      title: tituloCompleto,
      description: descricao,
      images: [imagem],
    },
  };
}
