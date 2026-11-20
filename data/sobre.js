/* =========================================================
   data/sobre.js — textos e listas da página Sobre (/sobre)
   ---------------------------------------------------------
   1. FOTO      → a imagem da página
   2. BIO       → parágrafo de apresentação
   3. FATOS     → resumo rápido
   4. HABILIDADES → o que uso nos projetos
   5. TECNOLOGIAS_DO_APP → TUDO que este site usa, com o papel
      de cada coisa (um teste confere que nada ficou de fora)
   6. COMO_FOI_FEITO → o processo, passo a passo
   ========================================================= */

import pacote from "@/package.json";

/* ---------- Versão real de um pacote ----------
   Lê a versão direto do package.json, então a página nunca
   mostra um número desatualizado.
   Ex.: "^16.3.3" → "16.3.3"  ·  pacote que não existe → null */
export function versaoDe(nome) {
  const todas = { ...pacote.dependencies, ...pacote.devDependencies };
  const versao = todas[nome];
  return versao ? versao.replace(/^[\^~]/, "") : null;
}

/* ---------- 1. FOTO ----------
(portfolio/public/images/vanessa.webp). Tamanho original: 760 x 1267. */
export const FOTO = {
  src: "/images/vanessa.webp",
  largura: 760,
  altura: 1267,
  alt: "Vanessa Lima sorrindo, de blusa vinho, olhando para a câmera",
};

/* ---------- 2. BIO ----------
   Sobre: . */
export const BIO = [
  "Sou a Vanessa, desenvolvedora front-end em formação e designer de interfaces em Recife. Estudo Sistemas para Internet na UNICAP e cuido do projeto inteiro: do Figma ao site no ar.",

  "Desenvolvi o sistema interno do Recife Flats Temporada, com 40 telas usadas todos os dias pela equipe. Hoje, na Residência em Software e IA (GrowUp · Porto Digital), trabalho no ISAC Conecta, um app que usa IA para organizar os anúncios dos grupos de WhatsApp do bairro.",
];

/* ---------- 3. FATOS (resumo rápido ao lado da bio) ---------- */
export const FATOS = [
  {
    titulo: "Formação",
    valor: "Sistemas para Internet · UNICAP (3º período, em andamento)",
  },
  {
    titulo: "Residência atual",
    valor: "Software e IA · GrowUp / Porto Digital (2026.2) · ISAC Conecta",
  },
  { titulo: "Empresa", valor: "Vanessenceweb · sites e sistemas desde 2025" },
  { titulo: "Certificações", valor: "90+ (DIO Campus Expert, Origamid, Rocketseat...)" },
  { titulo: "Idiomas", valor: "Português nativo · inglês intermediário" },
  {
    titulo: "Onde estou",
    valor: "Recife, PE · estágio presencial ou híbrido no Porto Digital, ou remoto",
  },
];

/* ---------- 4. HABILIDADES ---------- */
export const HABILIDADES = [
  {
    grupo: "Front-end",
    itens: [
      "HTML5",
      "CSS3",
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
      "Vite",
      "Design responsivo",
      "GSAP",
      "Three.js",
    ],
  },
  { grupo: "Design", itens: ["Figma", "UI Design", "Design Tokens", "Canva"] },
  {
    grupo: "Dados e back-end",
    itens: [
      "Node.js",
      "Express",
      "APIs REST",
      "Supabase (Auth, Storage, pg_cron)",
      "PostgreSQL + RLS",
      "Migrations SQL",
      "Edge Functions (Deno)",
      "Integração com IA (LLM)",
      "SQL",
      "Python",
      "Java",
    ],
  },
  {
    grupo: "Testes e qualidade",
    itens: ["Vitest", "Testing Library", "node:test", "Postman/Newman", "ESLint", "Prettier"],
  },
  {
    grupo: "Ferramentas",
    itens: ["Git", "GitHub", "GitHub Actions", "VS Code", "Vercel", "Cloudflare Pages", "Netlify", "Render"],
  },
  {
    grupo: "Em estudo",
    itens: ["Angular", "Tailwind", "Jest"],
  },
];

/* ---------- 5. TECNOLOGIAS E MÓDULOS USADOS NESTE APP ----------
   Cada item: { nome, papel, pacote?, junto? }
   - nome: como aparece na tela
   - papel: para que serve AQUI, numa frase curta
   - pacote: nome no package.json → a versão aparece sozinha
   - junto: pacotes, módulos ou APIs da mesma família, mostrados
     como etiquetas no mesmo item (pacote → com a versão)
   O teste __tests__/data/sobre.test.js falha se:
   - um pacote do package.json não estiver nesta lista, ou
   - o código importar um módulo "next/..." que não esteja aqui.
   Ou seja: instalou algo novo? Coloque aqui (item novo ou "junto"). */
export const TECNOLOGIAS_DO_APP = [
  {
    grupo: "Base",
    descricao: "O que faz o site existir.",
    itens: [
      {
        nome: "Next.js",
        pacote: "next",
        papel: "Rotas, HTML pronto no servidor e fontes e imagens otimizadas.",
      },
      {
        nome: "React",
        pacote: "react",
        junto: ["react-dom"],
        papel: "Cada parte da tela é um componente reaproveitável.",
      },
      {
        nome: "JavaScript + CSS Modules",
        papel:
          "JavaScript puro (escolha de estudo) e um .module.css por componente, com o tema em variáveis.",
      },
    ],
  },
  {
    grupo: "Módulos do Next.js",
    descricao: "Peças prontas do Next que o código importa.",
    itens: [
      {
        nome: "next/link",
        junto: ["next/navigation"],
        papel: "Troca de página sem recarregar e marca o link ativo no menu.",
      },
      { nome: "next/image", papel: "Fotos e prints em AVIF/WebP, no tamanho certo para cada tela." },
      { nome: "next/font/google", papel: "Anton, Caveat Brush e Manrope servidas pelo próprio site." },
      {
        nome: "Metadata API",
        junto: ["next/og", "sitemap.js", "robots.js"],
        papel: "Título, descrição e imagem de compartilhamento de cada página.",
      },
      {
        nome: '"use cache"',
        junto: ["next/cache", "fetch"],
        papel: "Busca os repositórios do GitHub no servidor e guarda por algumas horas.",
      },
    ],
  },
  {
    grupo: "Hooks e APIs do navegador",
    descricao: "Recursos do React e do navegador usados no código.",
    itens: [
      {
        nome: "Tema claro/escuro",
        junto: [
          "createContext",
          "useSyncExternalStore",
          "useCallback",
          "matchMedia",
          "MutationObserver",
          "localStorage",
        ],
        papel: "Segue o aparelho na primeira visita, troca na hora e lembra a escolha.",
      },
      {
        nome: "Menu do celular",
        junto: ["useState", "useEffect"],
        papel: "Abre, fecha, trava a rolagem e fecha com a tecla Esc.",
      },
      {
        nome: "Seções que aparecem",
        junto: ["IntersectionObserver", "useRef"],
        papel: "As seções da Início sobem ao entrar na tela, uma vez só.",
      },
      {
        nome: "Vídeo da Hero",
        junto: ["<video>"],
        papel: "WebM com fundo transparente; no Safari, um WebP animado.",
      },
    ],
  },
  {
    grupo: "Qualidade do código",
    descricao: "Rodam só no meu computador (não vão para o site).",
    itens: [
      {
        nome: "ESLint",
        pacote: "eslint",
        junto: ["eslint-config-next", "eslint-config-prettier"],
        papel: "Aponta erros antes de rodar, com as regras do Next e de acessibilidade.",
      },
      { nome: "Prettier", pacote: "prettier", papel: "Formata o código sempre do mesmo jeito." },
    ],
  },
  {
    grupo: "Testes",
    descricao: "O que funciona hoje continua funcionando amanhã.",
    itens: [
      {
        nome: "Vitest",
        pacote: "vitest",
        junto: ["@vitest/coverage-v8", "@vitejs/plugin-react", "jsdom"],
        papel: "Roda os testes num navegador simulado e mede a cobertura.",
      },
      {
        nome: "Testing Library",
        pacote: "@testing-library/react",
        junto: ["@testing-library/dom", "@testing-library/jest-dom", "@testing-library/user-event"],
        papel: "Testa como uma pessoa usa: procura por texto, clica e aperta teclas.",
      },
    ],
  },
  {
    grupo: "Ferramentas e publicação",
    descricao: "Do meu computador até o site no ar.",
    itens: [
      { nome: "Playwright", pacote: "playwright", papel: "Tira os prints dos projetos e do diário." },
      { nome: "Git + GitHub", papel: "Histórico com Conventional Commits, em repositório público." },
      { nome: "Vercel", papel: "Cada push na main publica o site sozinho." },
    ],
  },
];

/* ---------- 6. COMO ESTE SITE FOI FEITO ---------- */
export const COMO_FOI_FEITO = [
  {
    titulo: "Identidade visual",
    texto:
      "Visual editorial: títulos grandes em Anton, ponto final vermelho, rótulos pequenos, linhas finas e muito respiro.",
  },
  {
    titulo: "Base em Next.js",
    texto:
      "Projeto criado com create-next-app, com cores e tema claro/escuro em variáveis CSS, sem piscar ao abrir.",
  },
  {
    titulo: "Design system",
    texto:
      "Seis componentes base (Container, Secao, TituloSecao, Botao, Tag, Card) reaproveitados em todas as páginas.",
  },
  {
    titulo: "Qualidade desde o início",
    texto: "ESLint, Prettier e testes automatizados com Vitest e Testing Library em cada etapa.",
  },
  {
    titulo: "Acessibilidade, SEO e segurança",
    texto:
      "Navegação por teclado, textos para leitor de tela, sitemap, JSON-LD, cabeçalhos HTTP e chaves só no servidor.",
  },
  {
    titulo: "Entregas diárias",
    texto:
      "Uma etapa por dia, com commits pequenos, deploy automático na Vercel e um diário com prints de cada fase.",
  },
];

/* Links da seção "Como este site foi feito" */
export const LINKS_DO_PROJETO = {
  repositorio: "https://github.com/VANESSENCEWEB/portfolio-vanessa-lima",
  decisoes: "https://github.com/VANESSENCEWEB/portfolio-vanessa-lima/blob/main/docs/DECISOES.md",
};
