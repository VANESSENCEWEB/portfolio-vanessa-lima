/* =========================================================
   scripts/mockup.mjs — gera a imagem "computador + celular"
   para o diário do projeto (docs/DIARIO.md)
   ---------------------------------------------------------
   O que ele faz, sozinho:
   1. Abre o seu site (que precisa estar rodando com npm run dev)
      num navegador invisível, no tamanho de COMPUTADOR, e tira um print.
   2. Abre de novo no tamanho de CELULAR e tira outro print.
   3. Coloca os dois prints dentro de uma moldura (janela de
      navegador + celular) e salva UMA imagem em docs/progresso/.

   Como usar (com o site rodando em outro terminal):
     npm run mockup -- --nome etapa-02-navbar
   Opções:
     --nome   (obrigatório) parte do nome do arquivo
     --rota   página a fotografar        (padrão: /)       ex.: --rota /sobre
     --tema   escuro ou claro            (padrão: escuro)
     --porta  porta do npm run dev       (padrão: 3000)
   O arquivo sai com a data de hoje na frente:
     docs/progresso/2026-11-10-etapa-02-navbar.png
   ========================================================= */
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { parseArgs } from "node:util";
import { chromium } from "playwright";

/* ---------- 1. Ler as opções digitadas no terminal ---------- */
const { values: opcoes } = parseArgs({
  options: {
    nome: { type: "string" },
    rota: { type: "string", default: "/" },
    tema: { type: "string", default: "escuro" },
    porta: { type: "string", default: "3000" },
  },
});

if (!opcoes.nome) {
  console.error('Faltou o nome. Exemplo: npm run mockup -- --nome etapa-02-navbar');
  process.exit(1);
}
// Só letras minúsculas, números e hífen (nome seguro para arquivo e para o GitHub)
if (!/^[a-z0-9-]+$/.test(opcoes.nome)) {
  console.error("Use só letras minúsculas, números e hífen no --nome (sem acento e sem espaço).");
  process.exit(1);
}
if (!["escuro", "claro"].includes(opcoes.tema)) {
  console.error('O --tema precisa ser "escuro" ou "claro".');
  process.exit(1);
}

// Só aceita o site rodando NO SEU computador (localhost)
const endereco = new URL(opcoes.rota, `http://localhost:${opcoes.porta}`).href;

/* ---------- 2. Tamanhos das telas ---------- */
const COMPUTADOR = { width: 1440, height: 900 };
const CELULAR = { width: 390, height: 844 }; // tamanho de um iPhone

// Tempo de espera para as animações de entrada terminarem
const ESPERA_ANIMACOES = 2500;

/* ---------- 3. Tirar um print do site num tamanho ---------- */
async function fotografar(navegador, tamanho) {
  const pagina = await navegador.newPage({
    viewport: tamanho,
    deviceScaleFactor: 2, // imagem nítida (como tela Retina)
    // O site escolhe o tema pela preferência do "aparelho"
    colorScheme: opcoes.tema === "claro" ? "light" : "dark",
  });
  await pagina.goto(endereco, { waitUntil: "networkidle" });
  // Esconde o botãozinho "N" do Next, que só aparece no modo de desenvolvimento
  await pagina.addStyleTag({ content: "nextjs-portal { display: none !important; }" });
  await pagina.waitForTimeout(ESPERA_ANIMACOES);
  const imagem = await pagina.screenshot({ type: "png" });
  await pagina.close();
  return `data:image/png;base64,${imagem.toString("base64")}`; // imagem em texto, para usar no HTML
}

/* ---------- 4. A moldura (HTML + CSS) ----------
   Uma janela de navegador com as 3 bolinhas e um celular
   por cima, no canto direito, igual ao modelo. */
function montarMoldura(printComputador, printCelular) {
  return `<!doctype html>
<html><head><style>
  body { margin: 0; background: #1f1e1b; }
  .cena { position: relative; width: 1600px; height: 1000px; }
  .janela {
    position: absolute; left: 60px; top: 60px; width: 1300px;
    border-radius: 14px; overflow: hidden; background: #2b2a26;
    box-shadow: 0 30px 80px rgba(0, 0, 0, 0.5);
  }
  .barra { height: 44px; display: flex; align-items: center; gap: 9px; padding: 0 18px; }
  .barra span { width: 13px; height: 13px; border-radius: 50%; background: #45433d; }
  .janela img { display: block; width: 100%; }
  .celular {
    position: absolute; right: 60px; top: 230px; width: 340px;
    padding: 12px; border-radius: 52px; background: #111;
    box-shadow: 0 30px 80px rgba(0, 0, 0, 0.6), inset 0 0 0 2px #3a3833;
  }
  .celular img { display: block; width: 100%; border-radius: 40px; }
</style></head>
<body><div class="cena">
  <div class="janela"><div class="barra"><span></span><span></span><span></span></div>
    <img src="${printComputador}" alt="" /></div>
  <div class="celular"><img src="${printCelular}" alt="" /></div>
</div></body></html>`;
}

/* ---------- 5. Juntar tudo ---------- */
async function main() {
  const navegador = await chromium.launch();
  try {
    console.log(`Fotografando ${endereco} (tema ${opcoes.tema})...`);
    const printComputador = await fotografar(navegador, COMPUTADOR);
    const printCelular = await fotografar(navegador, CELULAR);

    // Abre a moldura e tira o print final só da "cena"
    const pagina = await navegador.newPage({ viewport: { width: 1600, height: 1000 }, deviceScaleFactor: 2 });
    await pagina.setContent(montarMoldura(printComputador, printCelular));

    const hoje = new Date().toLocaleDateString("sv-SE"); // formato 2026-11-10
    const pasta = path.join("docs", "progresso");
    await mkdir(pasta, { recursive: true }); // cria a pasta se não existir
    const arquivo = path.join(pasta, `${hoje}-${opcoes.nome}.png`);

    await pagina.locator(".cena").screenshot({ path: arquivo });
    console.log(`Pronto! Imagem salva em ${arquivo}`);
  } catch (erro) {
    // Erro mais comum: o site não está ligado
    if (String(erro).includes("ERR_CONNECTION_REFUSED")) {
      console.error(`Não achei o site em ${endereco}. Ele está rodando com "npm run dev"? Confira a porta.`);
    } else {
      console.error(erro);
    }
    process.exitCode = 1;
  } finally {
    await navegador.close(); // fecha o navegador invisível sempre, mesmo com erro
  }
}

main();
