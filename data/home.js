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

/* "87+" → 87 (o contador anima até esse número e põe o "+") */
const totalCertificacoes = Number.parseInt(CERTIFICACOES.total, 10);

/* ---------- 1. HERO ---------- */
export const HERO = {
  topoEsquerda: ["Front-end developer em formação", "Design · Código · Produto"],
  topoDireita: "Disponível para estágio",
  palavraGigante: "PORTFÓLIO", // decorativa: o leitor de tela não lê
  saudacao: "Olá, eu sou",
  nome: PESSOA.primeiroNome,
  cargo: ["Desenvolvedora front-end", "& designer de interfaces"],
  descricao:
    "Estudante de Sistemas para Internet na UNICAP. Faço design e código no mesmo projeto: do esboço no Figma ao site no ar, com projetos reais em produção.",
  local: "Recife · PE — estágio presencial ou híbrido",
  frase: ["Do esboço ao ar.", "Design e código juntos."],
  // Números calculados, não digitados: nunca ficam desatualizados
  numeros: [
    { valor: Object.keys(PRINTS).length, legenda: "Projetos no ar" },
    { valor: totalCertificacoes, legenda: "Certificações concluídas" },
  ],
  botao: { texto: "Ver projetos", href: "/projetos" },
  rodape: {
    caso: { texto: "Ver um caso por dentro", href: "/projetos" },
    extra: "Residência em Software e IA · Porto Digital",
    direita: "React · Next.js · Figma · Supabase",
  },
};

/* ---------- 2. MIDIA ----------
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
