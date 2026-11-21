/* =========================================================
   Testes dos dados das experiências (data/experiencias.js)
   ---------------------------------------------------------
   Garantem que os dados estão completos e seguros e LISTAM
   (sem falhar) os campos que a Vanessa ainda precisa preencher.
   ========================================================= */
import { existsSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import {
  CERTIFICACOES,
  EXPERIENCIA_PROFISSIONAL,
  FORMACAO,
  PROJETOS_CLIENTES,
  RESUMO_ACADEMICO,
} from "@/data/experiencias";
import { camposPendentes, temValor } from "@/lib/experiencias";
import PRINTS from "@/data/prints.json";

const LINHAS_DO_TEMPO = { FORMACAO, EXPERIENCIA_PROFISSIONAL };
const TODOS_OS_ITENS = [...FORMACAO, ...EXPERIENCIA_PROFISSIONAL, ...CERTIFICACOES.destaques];

describe.each(Object.entries(LINHAS_DO_TEMPO))("%s", (_nome, itens) => {
  it("tem pelo menos um item", () => {
    expect(itens.length).toBeGreaterThan(0);
  });

  it("todo item tem id, título e organização de verdade (nunca PREENCHER)", () => {
    for (const item of itens) {
      expect(item.id).toMatch(/^[a-z0-9-]+$/);
      expect(temValor(item.titulo), item.id).toBe(true);
      expect(temValor(item.organizacao), item.id).toBe(true);
    }
  });

  it("destaques, tags e links são listas", () => {
    for (const item of itens) {
      expect(Array.isArray(item.destaques), item.id).toBe(true);
      expect(Array.isArray(item.tags), item.id).toBe(true);
      expect(Array.isArray(item.links), item.id).toBe(true);
    }
  });
});

describe("ids", () => {
  it("não se repetem (viram ids no HTML)", () => {
    const ids = [...TODOS_OS_ITENS, ...PROJETOS_CLIENTES].map((item) => item.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});

describe("links", () => {
  it("todos usam HTTPS (segurança)", () => {
    const links = [
      ...[...FORMACAO, ...EXPERIENCIA_PROFISSIONAL].flatMap((item) => item.links.map((link) => link.href)),
      // site/codigo null = projeto privado (sem link)
      ...PROJETOS_CLIENTES.flatMap((projeto) => [projeto.site, projeto.codigo]).filter(Boolean),
      CERTIFICACOES.linkTodas,
    ];
    for (const link of links) {
      expect(link).toMatch(/^https:\/\//);
    }
  });

  it("o código dos clientes fica no GitHub da Vanessa", () => {
    for (const projeto of PROJETOS_CLIENTES.filter((p) => p.codigo)) {
      expect(projeto.codigo).toMatch(/^https:\/\/github\.com\/VANESSENCEWEB\//);
    }
  });

  it("projeto de cliente sem link explica o motivo (nota) e todos têm prints", () => {
    for (const projeto of PROJETOS_CLIENTES) {
      if (!projeto.site && !projeto.codigo) expect(projeto.nota, projeto.id).toBeTruthy();
      expect(PRINTS[projeto.prints], projeto.id).toBeDefined();
    }
  });
});

describe("certificações e resumo", () => {
  it("o total aparece igual no resumo do topo e na seção", () => {
    expect(RESUMO_ACADEMICO.map((item) => item.valor)).toContain(CERTIFICACOES.total);
  });

  it("todo destaque tem imagem que existe em public/ e link de validação em HTTPS (ou null)", () => {
    for (const { id, imagem, verificar } of CERTIFICACOES.destaques) {
      expect(existsSync(path.join(process.cwd(), "public", imagem)), id).toBe(true);
      if (verificar !== null) expect(verificar, id).toMatch(/^https:\/\//);
    }
  });

  it("todo destaque tem instituição e título", () => {
    for (const certificacao of CERTIFICACOES.destaques) {
      expect(temValor(certificacao.instituicao)).toBe(true);
      expect(temValor(certificacao.titulo)).toBe(true);
    }
  });
});

describe("campos para a Vanessa preencher", () => {
  it("lista o que falta (aviso, não erro)", () => {
    const pendentes = camposPendentes(TODOS_OS_ITENS);
    if (pendentes.length > 0) {
      // Aparece no terminal do npm test. Preencheu tudo? O aviso some sozinho.
      console.warn(`✏️ Falta preencher em data/experiencias.js: ${pendentes.join(", ")}`);
    }
    expect(Array.isArray(pendentes)).toBe(true);
  });
});
