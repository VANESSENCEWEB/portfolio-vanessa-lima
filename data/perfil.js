/* =========================================================
   data/perfil.js — TODOS os textos do site num lugar só
   ---------------------------------------------------------
   Por que separar? Para mudar um texto você mexe só aqui,
   sem procurar dentro dos componentes.
   Dia 2: PESSOA ganhou cargo, cidade e resumo (usados no SEO,
   no Footer e no JSON-LD) e nasceu o SEO (títulos do Google).
   ========================================================= */

/* Nome, dados públicos e redes */
export const PESSOA = {
  nome: "Vanessa Lima",
  primeiroNome: "Vanessa",
  cargo: "Desenvolvedora Front-end",
  cidade: "Recife",
  estado: "PE",
  universidade: "UNICAP — Universidade Católica de Pernambuco",
  // Frase curta usada no rodapé e no JSON-LD
  resumo:
    "Desenvolvedora front-end e designer de interfaces em Recife, estudante de Sistemas para Internet na UNICAP.",
  // Assuntos que a pessoa domina (vão para o JSON-LD)
  conhecimentos: ["Front-end", "React", "Next.js", "JavaScript", "CSS", "UI Design", "Figma"],
  // E-mail PÚBLICO (pode aparecer no site)
  email: "vanessalimaunicap@gmail.com",
  redes: {
    github: "https://github.com/VANESSENCEWEB",
    linkedin: "https://www.linkedin.com/in/vanessa-lima-dev/",
  },
};

/* Links do menu.
   Cada página que existe dentro de /app aparece aqui.
   O sitemap.xml também é montado a partir desta lista. */
export const MENU = [
  { texto: "Início", link: "/" },
  { texto: "Sobre", link: "/sobre" },
  { texto: "Acadêmica", link: "/experiencia-academica" },
  { texto: "Profissional", link: "/experiencia-profissional" },
  { texto: "Projetos", link: "/projetos" },
];

/* SEO: o que aparece na aba do navegador, no Google e ao
   compartilhar o link (WhatsApp, LinkedIn...) */
export const SEO = {
  // Título da Home (e o padrão de quem não definir o seu)
  tituloPadrao: "Vanessa Lima — Desenvolvedora Front-end",
  // "%s" é trocado pelo título de cada página: "Sobre — Vanessa Lima"
  modeloTitulo: "%s — Vanessa Lima",
  descricao:
    "Portfólio de Vanessa Lima, desenvolvedora front-end e designer de interfaces em Recife. Projetos em React, Next.js e Figma.",
  nomeDoSite: "Vanessa Lima — Portfólio",
  palavrasChave: [
    "Vanessa Lima",
    "desenvolvedora front-end",
    "portfólio",
    "React",
    "Next.js",
    "Recife",
    "UNICAP",
    "estágio front-end",
  ],
};
