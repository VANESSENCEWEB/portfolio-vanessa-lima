/* =========================================================
   app/layout.jsx — a "moldura" de TODAS as páginas
   ---------------------------------------------------------
   Tudo que está aqui aparece em todas as páginas do site:
   a tag <html>, as fontes, o tema, a Navbar e (Dia 2) o
   Footer, o SEO completo e a "ficha" JSON-LD para o Google.
   Cada página (app/page.jsx, app/sobre/page.jsx...) entra
   no lugar do {children}.
   ========================================================= */
import { Anton, Caveat_Brush, Manrope } from "next/font/google";
import { CHAVE_TEMA } from "@/lib/tema";
import { URL_SITE } from "@/lib/site";
import { criarJsonLdPessoa, serializarJsonLd } from "@/lib/jsonLd";
import { PESSOA, SEO } from "@/data/perfil";
import { TemaProvider } from "@/components/TemaProvider";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import "./globals.css";

/* ---------- FONTES ----------
   next/font/google: o Next baixa as fontes do Google UMA vez,
   na hora de montar o site, e entrega junto com ele.
   "variable" cria uma variável CSS, usada no globals.css. */
const fonteDisplay = Anton({
  weight: "400", // a Anton só tem um peso
  subsets: ["latin"], // só as letras do nosso alfabeto (arquivo menor)
  variable: "--fonte-display",
  display: "swap",
});
const fonteScript = Caveat_Brush({
  weight: "400",
  subsets: ["latin"],
  variable: "--fonte-script",
  display: "swap",
  preload: false, // só aparece no "Olá, eu sou": não precisa vir antes
});
const fonteTexto = Manrope({
  subsets: ["latin"], // fonte variável: já vem com todos os pesos
  variable: "--fonte-texto",
  display: "swap",
});

/* ---------- SEO ----------
   O Next transforma isso nas tags <title> e <meta> de cada página.
   - metadataBase: endereço base. Com ele, caminhos como "/sobre"
     viram endereços completos (o Google e o WhatsApp precisam disso).
   - title.template: cada página só escreve o próprio nome
     (ex.: "Sobre") e o Next completa → "Sobre — Vanessa Lima".
   - openGraph/twitter: o "cartão" que aparece ao compartilhar o link.
     A imagem vem sozinha do arquivo app/opengraph-image.jsx.
   Atenção: NÃO colocamos "canonical" aqui, porque o layout vale
   para todas as páginas e todas diriam "eu sou a Home". Cada
   página define o seu. */
export const metadata = {
  metadataBase: new URL(URL_SITE),
  title: {
    default: SEO.tituloPadrao,
    template: SEO.modeloTitulo,
  },
  description: SEO.descricao,
  keywords: SEO.palavrasChave,
  authors: [{ name: PESSOA.nome, url: URL_SITE }],
  creator: PESSOA.nome,
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: SEO.nomeDoSite,
    title: SEO.tituloPadrao,
    description: SEO.descricao,
  },
  twitter: {
    card: "summary_large_image",
    title: SEO.tituloPadrao,
    description: SEO.descricao,
  },
  robots: { index: true, follow: true },
};

/* Cor da barra do navegador no celular, conforme o tema do aparelho */
export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0b0b0e" },
    { media: "(prefers-color-scheme: light)", color: "#f3eee7" },
  ],
};

/* ---------- SCRIPT DO TEMA (anti-"piscada") ----------
   Roda ANTES da página aparecer e já coloca data-tema no <html>.
   Segurança: é um texto FIXO escrito por nós (nada vem de quem
   visita o site), por isso é seguro usar dangerouslySetInnerHTML.
   E o valor salvo é conferido: só aceita "claro" ou "escuro". */
const scriptTema = `
(function () {
  try {
    var t = localStorage.getItem("${CHAVE_TEMA}");
    if (t !== "claro" && t !== "escuro") {
      t = window.matchMedia("(prefers-color-scheme: light)").matches ? "claro" : "escuro";
    }
    document.documentElement.dataset.tema = t;
  } catch (e) {
    document.documentElement.dataset.tema = "escuro";
  }
})();
`;

/* ---------- JSON-LD ----------
   "Ficha" da Vanessa para o Google (ver lib/jsonLd.js).
   Também é texto nosso, e o serializarJsonLd ainda troca "<"
   por um código seguro, para nada "fechar" a tag <script>. */
const jsonLd = serializarJsonLd(criarJsonLdPessoa());

export default function RootLayout({ children }) {
  return (
    // suppressHydrationWarning: avisa o React que o data-tema pode
    // ser trocado pelo script (não é um erro)
    <html
      lang="pt-BR"
      data-tema="escuro"
      suppressHydrationWarning
      className={`${fonteDisplay.variable} ${fonteScript.variable} ${fonteTexto.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: scriptTema }} />
      </head>
      <body>
        <TemaProvider>
          {/* Link escondido para quem navega pelo teclado pular direto ao conteúdo */}
          <a href="#conteudo" className="pular-para-conteudo">
            Pular para o conteúdo
          </a>
          <Navbar />
          <main id="conteudo">{children}</main>
          <Footer />
        </TemaProvider>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      </body>
    </html>
  );
}
