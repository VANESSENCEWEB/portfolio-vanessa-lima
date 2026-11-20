/* =========================================================
   data/home.js — textos da página Início (/)
   ---------------------------------------------------------
   Mesmo padrão dos outros arquivos de data/: conteúdo aqui,
   layout nos componentes (components/Hero e app/page.jsx).
   Textos trazidos da Hero do portfólio anterior (feito em
   React + Vite), já com os fatos atualizados.
   Partes:
   1. HERO    → tudo que aparece na primeira tela
   2. MIDIA   → arquivos do vídeo e das imagens da Hero
   3. ATALHOS → cartões "Navegue pelo portfólio"
   ========================================================= */
import { PESSOA } from "@/data/perfil";
import { CERTIFICACOES } from "@/data/experiencias";
import PRINTS from "@/data/prints.json";
import { FOTO } from "@/data/sobre";

/* "90+" → 90 (o número da Hero, com o "+" ao lado) */
const totalCertificacoes = Number.parseInt(CERTIFICACOES.total, 10);

/* ---------- 1. HERO ---------- */
export const HERO = {
  saudacao: "Olá, eu sou",
  palavra: "Portfólio", // na vertical, à direita (só enfeite: o leitor de tela não lê)
  nome: PESSOA.nome, // "Vanessa Lima": cada palavra vira uma linha
  cargo: ["Desenvolvedora front-end", "& designer de interfaces"],
  descricao:
    "Estudante de Sistemas para Internet na UNICAP. Faço design e código no mesmo projeto: do esboço no Figma ao site no ar, com projetos reais em produção.",
  botao: { texto: "Ver projetos", href: "/projetos" },
  caso: { texto: "Como este site foi feito", href: "/sobre#como-foi-feito" },
  // Números calculados, não digitados: nunca ficam desatualizados
  numeros: [
    { valor: Object.values(PRINTS).filter((p) => p.site).length, sufixo: "", legenda: "Projetos no ar" },
    { valor: totalCertificacoes, sufixo: "+", legenda: "Certificações" },
  ],
  // Fim da linha de baixo (ao lado dos números)
  disponivel: "Disponível para estágio",
  local: "Recife · PE — presencial ou híbrido",
};

/* ---------- 2. MIDIA ----------
   Tema CLARO: a foto de blusa vinho (a mesma da página Sobre).
   Tema ESCURO:
   - video: WebM com fundo TRANSPARENTE (canal alfa)
   - animada: a mesma animação em WebP, para o Safari (que não
     mostra a transparência do WebM e pintaria o fundo de preto)
   - parada: um quadro só, para quem pediu menos movimento,
     para o botão de pausar e enquanto o vídeo carrega
   As três têm a mesma proporção (640 x 866). */
export const MIDIA = {
  video: "/videos/vanessa-hero.webm",
  animada: "/images/vanessa-hero-loop.webp",
  parada: "/images/vanessa-hero-parada.webp",
  largura: 640,
  altura: 866,
  alt: "Vanessa Lima, de camiseta preta, com luz vermelha e azul no cabelo",
  clara: FOTO, // { src, largura, altura, alt }
};

/* ---------- 3. ATALHOS (cartões abaixo da Hero) ---------- */
export const ATALHOS = [
  { href: "/sobre", titulo: "Sobre", descricao: "Quem eu sou e todas as tecnologias deste site." },
  {
    href: "/experiencia-academica",
    titulo: "Experiência Acadêmica",
    descricao: "UNICAP, duas residências no Porto Digital e certificações.",
  },
  {
    href: "/experiencia-profissional",
    titulo: "Experiência Profissional",
    descricao: "Sites para clientes e um sistema interno em uso todos os dias.",
  },
  { href: "/projetos", titulo: "Projetos", descricao: "Destaques com prints e repositórios do GitHub." },
];
