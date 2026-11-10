/* =========================================================
   data/perfil.js — TODOS os textos do site num lugar só
   ---------------------------------------------------------
   Por que separar? Para mudar um texto você mexe só aqui,
   sem precisar procurar dentro dos componentes.
   As próximas partes (Hero, Sobre, Projetos...) também vão
   ler daqui.
   ========================================================= */

/* Nome e redes (usados na navbar, no rodapé e em várias páginas) */
export const PESSOA = {
  nome: "Vanessa Lima",
  primeiroNome: "Vanessa",
  // E-mail PÚBLICO (pode aparecer no site)
  email: "vanessalimaunicap@gmail.com",
  redes: {
    github: "https://github.com/VANESSENCEWEB",
    linkedin: "https://www.linkedin.com/in/vanessa-lima-dev/",
  },
};

/* Links do menu.
   Cada página que existe dentro de /app aparece aqui.
   Ex.: app/sobre/page.jsx  →  { texto: "Sobre", link: "/sobre" } */
export const MENU = [
  { texto: "Início", link: "/" },
  { texto: "Sobre", link: "/sobre" },
  { texto: "Acadêmica", link: "/experiencia-academica" },
  { texto: "Profissional", link: "/experiencia-profissional" },
  { texto: "Projetos", link: "/projetos" },
];
