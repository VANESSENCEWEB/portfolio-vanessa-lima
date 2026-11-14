/* =========================================================
   scripts/prints-projetos.mjs — prints dos projetos para a
   página /projetos (computador + celular)
   ---------------------------------------------------------
   O que ele faz, sozinho:
   1. Monta a lista de sites: os DESTAQUES de data/projetos.js
      que têm site + os repositórios da API do GitHub que têm
      "homepage" (o mesmo filtro que a página usa).
   2. Abre cada site num navegador invisível, no tamanho de
      COMPUTADOR e de CELULAR, e salva os dois prints em
      public/images/projetos/ (ex.: jogue-dados-computador.jpg).
   3. Atualiza data/prints.json, a lista que a página lê para
      saber quais projetos já têm print.
   A moldura (janela + celular) NÃO fica na imagem: é feita em
   CSS pelo componente Mockup, então se adapta ao tamanho do
   cartão e ao tema.

   Como usar (precisa de internet; o site do portfólio NÃO
   precisa estar rodando):
     npm run prints                 → todos os projetos
     npm run prints -- --so jogue-dados   → só um (pela chave)
   Rode de novo quando um projeto mudar de visual.
   Depois: confira as imagens e faça o commit delas junto com
   o data/prints.json.
   ========================================================= */
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { parseArgs } from "node:util";
import { chromium } from "playwright";
import { DESTAQUES, GITHUB } from "../data/projetos.js";
import { chaveDe, filtrarRepositorios } from "../lib/repositorios.js";

/* ---------- 1. Opções do terminal ---------- */
const { values: opcoes } = parseArgs({ options: { so: { type: "string" } } });

const PASTA_IMAGENS = path.join("public", "images", "projetos");
const ARQUIVO_LISTA = path.join("data", "prints.json");

const COMPUTADOR = { width: 1440, height: 900 };
const CELULAR = { width: 390, height: 844 }; // tamanho de um iPhone
const ESPERA_ANIMACOES = 2500; // tempo para as animações de entrada terminarem
const LIMITE_CARREGAMENTO = 45000; // 45 s (sites gratuitos às vezes "acordam" devagar)

/* ---------- 2. Lista de sites ---------- */
async function repositoriosComSite() {
  const cabecalhos = { Accept: "application/vnd.github+json" };
  if (process.env.GITHUB_TOKEN) cabecalhos.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  const url = `https://api.github.com/users/${GITHUB.usuario}/repos?type=owner&sort=pushed&per_page=100`;
  const resposta = await fetch(url, { headers: cabecalhos });
  if (!resposta.ok) {
    console.warn(`⚠️  API do GitHub respondeu ${resposta.status}: sigo só com os destaques.`);
    return [];
  }
  const repos = filtrarRepositorios(await resposta.json(), {
    excluir: GITHUB.excluir,
    limite: GITHUB.limite,
  });
  return repos.filter((r) => r.site).map((r) => ({ chave: r.chave, site: r.site }));
}

async function montarLista() {
  const destaques = DESTAQUES.filter((p) => p.site).map((p) => ({
    chave: chaveDe(p.id),
    site: p.site,
  }));
  const lista = [...destaques, ...(await repositoriosComSite())];
  // Só https (segurança: nada de endereço estranho)
  return lista.filter(({ site }) => /^https:\/\//i.test(site));
}

/* ---------- 3. Um print num tamanho ----------
   Devolve null se o endereço não for uma página (ex.: uma API
   que responde JSON): print de JSON não mostra nada de bonito. */
async function fotografar(navegador, site, tamanho, arquivo) {
  const pagina = await navegador.newPage({
    viewport: tamanho,
    deviceScaleFactor: tamanho === CELULAR ? 2 : 1, // celular nítido; computador já é grande
    colorScheme: "light",
  });
  try {
    const resposta = await pagina.goto(site, { waitUntil: "load", timeout: LIMITE_CARREGAMENTO });
    // Hospedagem gratuita (ex.: Render) mostra "waking up" enquanto o servidor acorda.
    // Espera essa tela sumir (até 90 s) antes de olhar o que veio.
    await pagina
      .waitForFunction(() => !/waking up|application loading/i.test(document.body?.innerText ?? ""), null, {
        timeout: 90000,
      })
      .catch(() => {});
    const tipo =
      (await pagina.evaluate(() => document.contentType)) || resposta?.headers()["content-type"] || "";
    if (!tipo.includes("html")) return null;
    await pagina.waitForTimeout(ESPERA_ANIMACOES);
    await pagina.screenshot({ path: arquivo, type: "jpeg", quality: 82 });
    return arquivo;
  } finally {
    await pagina.close();
  }
}

/* ---------- 4. Juntar tudo ---------- */
async function main() {
  // Lista anterior: o que não for refeito agora continua valendo
  let prints = {};
  try {
    prints = JSON.parse(await readFile(ARQUIVO_LISTA, "utf8"));
  } catch {
    // primeira vez: ainda não existe
  }

  let lista = await montarLista();
  if (opcoes.so) lista = lista.filter((p) => p.chave === opcoes.so);
  if (lista.length === 0) {
    console.error("Nenhum site para fotografar. Confira a chave em --so.");
    process.exitCode = 1;
    return;
  }

  await mkdir(PASTA_IMAGENS, { recursive: true });
  const navegador = await chromium.launch();
  const hoje = new Date().toLocaleDateString("sv-SE"); // formato 2026-11-14

  try {
    for (const { chave, site } of lista) {
      process.stdout.write(`📸 ${chave} (${site})... `);
      try {
        const computador = path.join(PASTA_IMAGENS, `${chave}-computador.jpg`);
        const celular = path.join(PASTA_IMAGENS, `${chave}-celular.jpg`);
        const ok =
          (await fotografar(navegador, site, COMPUTADOR, computador)) &&
          (await fotografar(navegador, site, CELULAR, celular));
        if (!ok) {
          delete prints[chave]; // sem página, sem print (apaga o antigo da lista, se houver)
          console.log("pulei (não é uma página HTML)");
          continue;
        }
        prints[chave] = {
          site,
          computador: `/images/projetos/${chave}-computador.jpg`,
          celular: `/images/projetos/${chave}-celular.jpg`,
          data: hoje,
        };
        console.log("ok");
      } catch (erro) {
        console.log(`falhou (${erro.message.split("\n")[0]})`);
      }
    }
  } finally {
    await navegador.close(); // fecha o navegador invisível sempre, mesmo com erro
  }

  // Salva a lista em ordem alfabética (diff limpo no Git)
  const ordenado = Object.fromEntries(Object.entries(prints).sort(([a], [b]) => a.localeCompare(b)));
  await writeFile(ARQUIVO_LISTA, `${JSON.stringify(ordenado, null, 2)}\n`);
  console.log(`\nPronto! ${Object.keys(ordenado).length} projetos com print em ${ARQUIVO_LISTA}.`);
}

main();
