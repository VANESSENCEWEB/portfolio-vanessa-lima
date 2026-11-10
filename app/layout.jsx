/* =========================================================
   app/layout.jsx — a "moldura" de TODAS as páginas
   ---------------------------------------------------------
   Tudo que está aqui aparece em todas as páginas do site:
   a tag <html>, as fontes, o tema e a Navbar.
   Cada página (app/page.jsx, app/sobre/page.jsx...) entra
   no lugar do {children}.
   ========================================================= */
import { Anton, Caveat_Brush, Manrope } from "next/font/google";
import { CHAVE_TEMA } from "@/lib/tema";
import { TemaProvider } from "@/components/TemaProvider";
import Navbar from "@/components/Navbar/Navbar";
import "./globals.css";

/* ---------- FONTES ----------
   next/font/google: o Next baixa as fontes do Google UMA vez,
   na hora de montar o site, e entrega junto com ele.
   Vantagens: carrega rápido, o texto não "pula" e o navegador
   da visitante não precisa falar com o Google (privacidade).
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
   O Next transforma isso nas tags <title> e <meta> da página
   (o que aparece na aba e no resultado do Google). */
export const metadata = {
  title: "Vanessa Lima — Desenvolvedora Front-end",
  description:
    "Portfólio de Vanessa Lima, desenvolvedora front-end e designer de interfaces em Recife. Projetos em React, Next.js e Figma.",
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
   Sem ele, a página abriria escura e depois "piscaria" para clara.
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
        {/* TemaProvider "envolve" o site: qualquer parte dele pode
            saber o tema e trocar (ex.: o botão sol/lua da Navbar) */}
        <TemaProvider>
          {/* Link escondido para quem navega pelo teclado pular direto ao conteúdo */}
          <a href="#conteudo" className="pular-para-conteudo">
            Pular para o conteúdo
          </a>
          <Navbar />
          <main id="conteudo">{children}</main>
        </TemaProvider>
      </body>
    </html>
  );
}
