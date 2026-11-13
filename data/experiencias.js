/* =========================================================
   data/experiencias.js — conteúdo das páginas de experiência
   ---------------------------------------------------------
   Mesmo padrão de data/perfil.js e data/sobre.js: os textos
   ficam aqui; o layout fica nos componentes.
   Partes:
   1. RESUMO_ACADEMICO → números do topo da página Acadêmica
   2. FORMACAO         → linha do tempo acadêmica
   3. CERTIFICACOES    → total + certificações em destaque
   4. EXPERIENCIA_PROFISSIONAL → linha do tempo profissional
   5. PROJETOS_CLIENTES → sites feitos pela Vanessenceweb

   ✏️ REGRA: nada de cargo ou data inventados. Onde o dado ainda
   não foi confirmado, o campo vale PREENCHER. O site esconde o
   campo, o npm run dev mostra um aviso ✏️ e o npm test lista
   tudo que falta. Para preencher: troque PREENCHER pelo valor,
   entre aspas. Ex.: inicio: PREENCHER  →  inicio: "2025.1"

   Formato de cada item das linhas do tempo:
   {
     id,            // único, só minúsculas e hífen (vira id no HTML)
     titulo,        // o nome grande do item
     cargo?,        // o seu papel (profissional)
     organizacao,   // instituição ou empresa
     tipo?, detalhe?, local?,
     inicio, fim?,  // texto livre: "2026.1", "2025", "mar/2025"
     emAndamento,   // true mostra a etiqueta "Em andamento"
     descricao?, destaques: [], tags: [], links: [{ texto, href }]
   }
   ========================================================= */
import { PESSOA } from "@/data/perfil";
import { PREENCHER } from "@/lib/experiencias";

/* ---------- 1. Números do topo (página Acadêmica) ---------- */
export const RESUMO_ACADEMICO = [
  { valor: "3º", rotulo: "período de Sistemas para Internet" },
  { valor: "2026.1", rotulo: "residência no Porto Digital" },
  { valor: "87+", rotulo: "certificações" },
];

/* ---------- 2. Formação (mais recente primeiro) ---------- */
export const FORMACAO = [
  {
    id: "residencia-porto-digital",
    titulo: "Residência Tecnológica",
    organizacao: "Porto Digital · RiseUp / GrowUp", // ✏️ confira o nome oficial do programa
    tipo: "Residência",
    local: "Recife, PE",
    inicio: "2026.1",
    fim: null,
    emAndamento: false,
    descricao:
      "Programa de residência do Porto Digital em que desenvolvi, em equipe, o ISAC Conecta, atuando na coordenação e no design.",
    destaques: ["Projeto ISAC Conecta selecionado para o CoDay"],
    tags: ["Figma", "UI Design", "Trabalho em equipe"],
    links: [], // ✏️ opcional: { texto: "Ver o ISAC Conecta", href: "https://..." }
  },
  {
    id: "unicap",
    titulo: "Sistemas para Internet",
    organizacao: PESSOA.universidade,
    tipo: "Graduação",
    detalhe: "3º período",
    local: "Recife, PE",
    inicio: PREENCHER, // ✏️ semestre de início, ex.: "2025.1"
    fim: null, // ✏️ opcional: previsão de conclusão, ex.: "2027.2"
    emAndamento: true,
    // ✏️ REVISE com as suas palavras
    descricao:
      "Graduação voltada ao desenvolvimento para a web: programação, banco de dados, design de interfaces e projetos práticos.",
    destaques: [], // ✏️ opcional: disciplinas ou projetos de que você se orgulha
    tags: [],
    links: [],
  },
];

/* ---------- 3. Certificações ---------- */
export const CERTIFICACOES = {
  total: "87+",
  // Página de certificações do LinkedIn (a lista completa fica lá)
  linkTodas: `${PESSOA.redes.linkedin}details/certifications/`,
  destaques: [
    {
      id: "dio-campus-expert",
      instituicao: "DIO",
      titulo: "Campus Expert",
      ano: PREENCHER, // ✏️ ano de conclusão, ex.: "2025"
    },
    {
      id: "origamid",
      instituicao: "Origamid",
      titulo: "Interface e CSS", // ✏️ nome como estava no portfólio antigo: confira o nome exato
      ano: PREENCHER,
    },
    {
      id: "rocketseat",
      instituicao: "Rocketseat",
      titulo: "Programação", // ✏️ nome como estava no portfólio antigo: confira o nome exato
      ano: PREENCHER,
    },
  ],
};

/* ---------- 4. Experiência profissional (mais recente primeiro) ---------- */
export const EXPERIENCIA_PROFISSIONAL = [
  {
    id: "vanessenceweb",
    titulo: "Vanessenceweb",
    cargo: PREENCHER, // ✏️ o seu cargo, ex.: "Fundadora e desenvolvedora web"
    organizacao: "Estúdio de desenvolvimento web · empresa registrada no Reino Unido",
    tipo: "Empresa própria",
    inicio: PREENCHER, // ✏️ quando o estúdio começou, ex.: "2024"
    fim: null,
    emAndamento: true,
    descricao:
      "Meu estúdio de desenvolvimento web: sites institucionais para clientes reais, do layout no Figma à publicação.",
    destaques: [
      "Recife Flats: site de flat de temporada com galeria de apartamentos, avaliações de hóspedes e versão mobile",
      "Dra. Priscilla Barros: site de cirurgiã bucomaxilofacial com galeria de resultados, FAQ e agendamento",
    ],
    tags: ["HTML", "CSS", "JavaScript", "Figma", "Design responsivo"],
    links: [], // ✏️ opcional: site do estúdio, se houver
  },
  {
    id: "isac-conecta",
    titulo: "ISAC Conecta",
    cargo: "Coordenação e design",
    organizacao: "Residência Tecnológica · Porto Digital",
    tipo: "Projeto em equipe",
    inicio: "2026.1",
    fim: null,
    emAndamento: false,
    descricao:
      "Projeto desenvolvido em equipe na residência, em que atuei na coordenação do time e no design da interface.",
    destaques: ["Projeto selecionado para o CoDay"],
    tags: ["Figma", "UI Design", "Coordenação de equipe"],
    links: [], // ✏️ opcional: repositório ou protótipo, ex.: { texto: "Ver protótipo", href: "https://..." }
  },
];

/* ---------- 5. Sites feitos para clientes (Vanessenceweb) ----------
   Dados do portfólio antigo (vanessenceweb.github.io/portfolio-2). */
export const PROJETOS_CLIENTES = [
  {
    id: "recife-flats",
    titulo: "Recife Flats",
    cliente: "Flat de temporada · Recife",
    descricao:
      "Site institucional com matching guiado por perguntas, galeria de apartamentos, avaliações de hóspedes e versão mobile.",
    tags: ["HTML", "CSS", "JavaScript", "Responsivo"],
    site: "https://vanessenceweb.github.io/recife-flats-temporada/",
    codigo: "https://github.com/VANESSENCEWEB/recife-flats-temporada",
  },
  {
    id: "dra-priscilla-barros",
    titulo: "Dra. Priscilla Barros",
    cliente: "Cirurgiã bucomaxilofacial",
    descricao:
      "Site institucional com galeria de resultados, credenciais, vídeos, perguntas frequentes e agendamento.",
    tags: ["HTML", "CSS", "JavaScript"],
    site: "https://facial-harmony-clinic.vercel.app/",
    codigo: "https://github.com/VANESSENCEWEB/facial-harmony-clinic",
  },
];
