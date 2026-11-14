/* =========================================================
   Testes dos dados da página Sobre (data/sobre.js)
   ---------------------------------------------------------
   O mais importante: a seção "Tecnologias e módulos usados
   neste app" é OBRIGATÓRIA e precisa estar COMPLETA.
   Estes testes leem o package.json e o código do projeto e
   falham se alguma tecnologia ficar sem explicação.
   ========================================================= */
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import pacote from "@/package.json";
import {
  BIO,
  COMO_FOI_FEITO,
  FATOS,
  FOTO,
  HABILIDADES,
  LINKS_DO_PROJETO,
  TECNOLOGIAS_DO_APP,
  versaoDe,
} from "@/data/sobre";

// Todos os itens de todos os grupos numa lista só
const ITENS = TECNOLOGIAS_DO_APP.flatMap((grupo) => grupo.itens);

/* Lista todos os arquivos .js/.jsx de uma pasta (e subpastas) */
function arquivosDeCodigo(pasta) {
  return readdirSync(pasta).flatMap((nome) => {
    const caminho = path.join(pasta, nome);
    if (statSync(caminho).isDirectory()) return arquivosDeCodigo(caminho);
    return /\.(js|jsx|mjs)$/.test(nome) ? [caminho] : [];
  });
}

/* Procura os módulos "next/..." importados no código do site */
function modulosNextImportados() {
  const pastas = ["app", "components", "lib", "hooks"].filter((p) => existsSync(p));
  const modulos = new Set();
  for (const arquivo of pastas.flatMap(arquivosDeCodigo)) {
    const codigo = readFileSync(arquivo, "utf8");
    for (const [, modulo] of codigo.matchAll(/from\s+"(next\/[^"]+)"/g)) modulos.add(modulo);
  }
  return [...modulos];
}

describe("Tecnologias e módulos usados neste app", () => {
  const todosOsPacotes = Object.keys({ ...pacote.dependencies, ...pacote.devDependencies });
  const pacotesListados = ITENS.map((item) => item.pacote).filter(Boolean);

  it.each(todosOsPacotes)("o pacote %s do package.json está explicado na página", (nome) => {
    expect(pacotesListados).toContain(nome);
  });

  it("todo pacote citado na página existe no package.json (versão aparece)", () => {
    for (const nome of pacotesListados) {
      expect(versaoDe(nome), nome).not.toBeNull();
    }
  });

  it("todo módulo next/... importado no código aparece na lista", () => {
    const nomes = ITENS.map((item) => item.nome);
    const modulos = modulosNextImportados();
    expect(modulos.length).toBeGreaterThan(0); // a busca funcionou
    for (const modulo of modulos) {
      expect(nomes, `faltou explicar ${modulo}`).toContain(modulo);
    }
  });

  it("todo item tem nome e papel, sem repetidos", () => {
    for (const item of ITENS) {
      expect(item.nome.trim()).not.toBe("");
      expect(item.papel.trim().length).toBeGreaterThan(10);
    }
    const nomes = ITENS.map((item) => item.nome);
    expect(new Set(nomes).size).toBe(nomes.length);
  });
});

describe("versaoDe", () => {
  it("tira o ^ e o ~ do começo", () => {
    expect(versaoDe("next")).toBe(pacote.dependencies.next.replace(/^[\^~]/, ""));
    expect(versaoDe("vitest")).toMatch(/^\d+\.\d+\.\d+/);
  });

  it("devolve null para pacote que não existe", () => {
    expect(versaoDe("pacote-que-nao-existe")).toBeNull();
  });
});

describe("Conteúdo da página Sobre", () => {
  it("a foto existe em public/ e tem texto alternativo", () => {
    // Se falhar: copie vanessa.webp da pasta antiga para public/images/
    expect(existsSync(path.join("public", FOTO.src))).toBe(true);
    expect(FOTO.alt.length).toBeGreaterThan(10);
  });

  it("tem bio, fatos, habilidades e passos preenchidos", () => {
    expect(BIO.length).toBeGreaterThan(0);
    expect(FATOS.every((f) => f.titulo && f.valor)).toBe(true);
    expect(HABILIDADES.every((h) => h.itens.length > 0)).toBe(true);
    expect(COMO_FOI_FEITO.every((p) => p.titulo && p.texto)).toBe(true);
  });

  it("nenhum grupo de habilidades se repete", () => {
    const grupos = HABILIDADES.map((h) => h.grupo);
    expect(new Set(grupos).size).toBe(grupos.length);
  });

  it("os links do projeto usam HTTPS e apontam para o GitHub da Vanessa", () => {
    for (const link of Object.values(LINKS_DO_PROJETO)) {
      expect(link).toMatch(/^https:\/\/github\.com\/VANESSENCEWEB\//);
    }
  });
});
