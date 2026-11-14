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

  "Desenvolvi o sistema interno do Recife Flats Temporada (40 telas, usadas todos os dias pela equipe) e, na Residência em Software e IA (GrowUp · Porto Digital), trabalho no ISAC Conecta, um app que usa IA para organizar os anúncios dos grupos de WhatsApp do bairro. Construí e publiquei a minha versão, com React, Supabase e mais de 200 testes automatizados.",

  "Procuro estágio ou vaga júnior em front-end em Recife, presencial ou híbrido.",
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
  { titulo: "Certificações", valor: "87+ (DIO Campus Expert, Origamid, Rocketseat...)" },
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
   Cada item: { nome, papel, pacote? }
   - nome: como aparece na tela
   - papel: para que serve AQUI, em uma frase
   - pacote: nome no package.json → a versão aparece sozinha
   O teste __tests__/data/sobre.test.js falha se:
   - um pacote do package.json não estiver nesta lista, ou
   - o código importar um módulo "next/..." que não esteja aqui.
   Ou seja: instalou algo novo? Explique aqui o papel dele. */
export const TECNOLOGIAS_DO_APP = [
  {
    grupo: "Base",
    descricao: "O que faz o site existir.",
    itens: [
      {
        nome: "Next.js",
        pacote: "next",
        papel:
          "Framework: cada pasta em app/ vira uma página, o HTML é montado no servidor e fontes e imagens já saem otimizadas.",
      },
      {
        nome: "React",
        pacote: "react",
        papel: "Biblioteca dos componentes: cada parte da tela é uma função reaproveitável.",
      },
      {
        nome: "React DOM",
        pacote: "react-dom",
        papel: "Liga o React ao navegador: desenha os componentes na página e cuida dos cliques.",
      },
      {
        nome: "JavaScript (ES2023)",
        papel: "Linguagem do projeto inteiro (sem TypeScript, por escolha de estudo).",
      },
      {
        nome: "CSS Modules + variáveis CSS",
        papel:
          "Um .module.css por componente, para as classes nunca se misturarem, e as cores do tema em variáveis.",
      },
    ],
  },
  {
    grupo: "Módulos do Next.js",
    descricao: "Peças prontas do Next que o código importa.",
    itens: [
      { nome: "next/link", papel: "Links internos que trocam de página sem recarregar o site." },
      {
        nome: "next/navigation",
        papel: "usePathname: a Navbar descobre a página atual e marca o link ativo.",
      },
      {
        nome: "next/image",
        papel:
          "A foto da página Sobre e os prints dos projetos: formato leve (AVIF/WebP) e tamanho certo para cada tela.",
      },
      {
        nome: "next/font/google",
        papel: "Anton, Caveat Brush e Manrope baixadas no build e servidas pelo próprio site.",
      },
      { nome: "next/og", papel: "Desenha a imagem de compartilhamento (Open Graph) a partir de JSX." },
      {
        nome: "Metadata API",
        papel: "Título, descrição, canonical e Open Graph de cada página, com title.template no layout.",
      },
      { nome: "sitemap.js e robots.js", papel: "Geram /sitemap.xml e /robots.txt a partir do MENU." },
      {
        nome: '"use cache"',
        papel:
          "Guarda o ano do rodapé e a lista de repositórios do GitHub, para não refazer o trabalho a cada visita (exigência do cacheComponents).",
      },
      {
        nome: "next/cache",
        papel: "cacheLife: diz por quanto tempo a lista do GitHub fica guardada (algumas horas).",
      },
      {
        nome: "fetch",
        papel: "Busca os repositórios públicos na API REST do GitHub, no servidor, para a página Projetos.",
      },
    ],
  },
  {
    grupo: "Hooks e APIs do navegador",
    descricao: "Recursos do React e do navegador usados no código.",
    itens: [
      {
        nome: "useSyncExternalStore",
        papel: "Lê o tema do <html> e avisa o React quando ele muda (uma só fonte da verdade).",
      },
      {
        nome: "createContext + useContext",
        papel: "Entregam o tema a qualquer componente pelo hook useTema().",
      },
      {
        nome: "useState + useEffect",
        papel: "Menu do celular: abre, fecha, trava a rolagem e escuta a tecla Esc.",
      },
      { nome: "useCallback", papel: "Mantém a mesma função alternarTema entre uma renderização e outra." },
      { nome: "localStorage", papel: "Lembra o tema escolhido para a próxima visita." },
      {
        nome: "matchMedia",
        papel: "Descobre se o aparelho está no modo claro ou escuro na primeira visita.",
      },
      { nome: "MutationObserver", papel: "Vigia o atributo data-tema do <html> para o tema mudar na hora." },
    ],
  },
  {
    grupo: "Qualidade do código",
    descricao: "Ferramentas que rodam só no meu computador (não vão para o site).",
    itens: [
      {
        nome: "ESLint",
        pacote: "eslint",
        papel: "Aponta erros antes de rodar: hooks usados errado, imagem sem alt...",
      },
      {
        nome: "eslint-config-next",
        pacote: "eslint-config-next",
        papel: "Regras oficiais do Next, de React Hooks e de acessibilidade (jsx-a11y).",
      },
      {
        nome: "eslint-config-prettier",
        pacote: "eslint-config-prettier",
        papel: "Desliga as regras de estilo do ESLint para não brigarem com o Prettier.",
      },
      {
        nome: "Prettier",
        pacote: "prettier",
        papel: "Formata o código sempre do mesmo jeito (espaços, aspas, quebras).",
      },
    ],
  },
  {
    grupo: "Testes",
    descricao: "Garantem que o que funciona hoje continua funcionando amanhã.",
    itens: [
      { nome: "Vitest", pacote: "vitest", papel: "Roda os testes automatizados (npm test)." },
      {
        nome: "@vitest/coverage-v8",
        pacote: "@vitest/coverage-v8",
        papel: "Mostra quanto do código os testes cobrem (npm run coverage).",
      },
      {
        nome: "@vitejs/plugin-react",
        pacote: "@vitejs/plugin-react",
        papel: "Ensina o Vitest a entender JSX.",
      },
      {
        nome: "jsdom",
        pacote: "jsdom",
        papel: "Simula um navegador dentro dos testes (com document e window).",
      },
      {
        nome: "Testing Library (React)",
        pacote: "@testing-library/react",
        papel: "Desenha o componente no teste e procura os elementos como uma pessoa procuraria.",
      },
      {
        nome: "Testing Library (DOM)",
        pacote: "@testing-library/dom",
        papel: "Base da Testing Library: as buscas por papel (button, link) e por texto.",
      },
      {
        nome: "jest-dom",
        pacote: "@testing-library/jest-dom",
        papel: 'Verificações legíveis, como toHaveAttribute("rel", "noopener noreferrer").',
      },
      {
        nome: "user-event",
        pacote: "@testing-library/user-event",
        papel: "Simula cliques e teclas de verdade (ex.: Esc fechando o menu).",
      },
    ],
  },
  {
    grupo: "Ferramentas e publicação",
    descricao: "Do meu computador até o site no ar.",
    itens: [
      {
        nome: "Playwright",
        pacote: "playwright",
        papel:
          "Abre sites num navegador invisível e tira os prints do diário (npm run mockup) e dos cartões de projeto (npm run prints).",
      },
      { nome: "Git + GitHub", papel: "Histórico do código com Conventional Commits e repositório público." },
      { nome: "Vercel", papel: "Hospedagem: cada push na main publica o site sozinho." },
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
