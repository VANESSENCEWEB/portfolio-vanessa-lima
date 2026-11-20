/* =========================================================
   data/projetos.js — conteúdo da página Projetos (/projetos)
   ---------------------------------------------------------
   Mesmo padrão de data/perfil.js e data/sobre.js: os textos
   ficam aqui; o layout fica na página.
   Partes:
   1. DESTAQUES → projetos escolhidos à mão, com contexto
   2. GITHUB    → configuração da lista automática (API)

   ✏️ REGRA: só fatos que estão no README de cada projeto.
   Projeto privado não tem link de código (codigo: null).
   ========================================================= */
/* Import RELATIVO ("./perfil.js") em vez do atalho "@/data/perfil":
   este arquivo também é lido pelo script de prints, que roda no
   Node puro, e o Node não conhece o atalho "@/" do Next. */
import { PESSOA } from "./perfil.js";

/* ---------- 1. DESTAQUES ----------
   Formato de cada item:
   {
     id,          // único, minúsculas e hífen
     titulo,
     contexto,    // rótulo pequeno acima do título
     descricao,   // o problema e o que foi feito, em 1 ou 2 frases
     tags: [],    // tecnologias principais
     site?,       // link do projeto no ar (ou null)
     codigo?,     // link do repositório (ou null, se for privado)
     repositorio?,// repo do GitHub que este destaque já representa: some da lista automática
     nota?,       // aviso curto (ex.: por que não há link)
   }
   Ordem = ordem na tela. */
export const DESTAQUES = [
  {
    id: "isac-conecta",
    titulo: "ISAC Conecta",
    contexto: "Residência em Software e IA · GrowUp / Porto Digital · em andamento",
    descricao:
      "App que usa IA para transformar os anúncios bagunçados dos grupos de WhatsApp do bairro numa vitrine organizada, com moderação e renda para o Instituto. Banco com regras de acesso (RLS) e mais de 250 testes automatizados.",
    tags: ["React", "Vite", "Supabase", "PostgreSQL", "Edge Functions", "IA"],
    site: "https://isac-conecta-pi.vercel.app",
    codigo: null,
    // O repositório público "isac-conecta" (documentação) não repete na lista automática
    repositorio: "isac-conecta",
    nota: "Código ainda privado: o projeto está em andamento.",
  },
  {
    id: "sistema-recife-flats",
    titulo: "Sistema Recife Flats",
    contexto: "Sistema interno · em uso todos os dias",
    descricao:
      "Sistema com 40 telas que substituiu a planilha de uma empresa de hospedagem por temporada em Recife: reservas, caução, limpezas, financeiro e documentos em PDF, com conferência automática com a Booking e com a FNRH e exclusão automática de documentos (LGPD).",
    tags: ["JavaScript", "Supabase", "PostgreSQL", "Edge Functions", "GitHub Actions"],
    site: null,
    codigo: null,
    nota: "Sistema privado: os prints usam dados fictícios.",
  },
  {
    id: "api-projeto-integrador",
    titulo: "API REST — Projeto Integrador",
    contexto: "Engenharia de Software · UNICAP",
    descricao:
      "API REST com rotas documentadas, 40 testes automatizados (100% de aprovação), CI no GitHub Actions e deploy no Render.",
    tags: ["Node.js", "Express", "Newman", "GitHub Actions"],
    site: "https://api-projeto-integrador-0e79.onrender.com/",
    codigo: "https://github.com/VANESSENCEWEB/api-projeto-integrador",
    repositorio: "api-projeto-integrador",
  },
  {
    id: "nasa-explorer",
    titulo: "NASA Explorer",
    contexto: "APIs + visualização 3D",
    descricao:
      "Painel com a foto astronômica do dia, asteroides próximos da Terra numa Terra 3D interativa e favoritos com CRUD salvo no Back4app.",
    tags: ["JavaScript", "Three.js", "APIs REST", "Back4app"],
    site: "https://nasa-explorer-nine-rho.vercel.app",
    codigo: "https://github.com/VANESSENCEWEB/nasa_explorer",
    repositorio: "nasa_explorer",
  },
];

/* ---------- 2. GITHUB (lista automática) ----------
   usuario: de onde a página busca os repositórios públicos.
   excluir: repositórios que NUNCA aparecem na lista, mesmo
   sendo públicos. Já entram aqui:
   - o README do perfil (não é um projeto)
   - os repositórios que já estão nos DESTAQUES (não repetir)
   Para esconder mais algum, acrescente o nome em EXCLUIR_SEMPRE.
   limite: quantos cartões mostrar (o resto fica no link do perfil).
   somente/titulos: curadoria da lista (ver comentário no objeto). */
const EXCLUIR_SEMPRE = ["vanessenceweb", "fire-content-web"];

export const GITHUB = {
  usuario: "VANESSENCEWEB",
  perfil: PESSOA.redes.github,
  limite: 6,
  exigirDescricao: true, // só aparece repositório com descrição no GitHub
  excluir: [...EXCLUIR_SEMPRE, ...DESTAQUES.map((p) => p.repositorio).filter(Boolean)],
  // Curadoria: só estes aparecem, nesta ordem (os dados vêm da API).
  // Lista vazia = volta a ser automática (os mais recentes primeiro).
  somente: ["jogo-dados-unicap", "simulador-irpf", "click-shop-pdv", "mini-bio", "recife-flats-temporada"],
  // Nome do cartão (o repositório continua com o nome original no GitHub)
  titulos: {
    "jogo-dados-unicap": "Jogue Dados",
    "simulador-irpf": "Simulador IRPF",
    "click-shop-pdv": "Click Shop PDV",
    "mini-bio": "Mini Bio",
    "recife-flats-temporada": "Recife Flats Temporada",
  },
};
