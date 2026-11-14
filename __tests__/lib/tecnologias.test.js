/* Testes de lib/tecnologias.js (cor por área das Tags) */
import { describe, expect, it } from "vitest";
import { FAMILIAS, familiaDe, normalizar } from "@/lib/tecnologias";
import { DESTAQUES } from "@/data/projetos";
import { HABILIDADES } from "@/data/sobre";

describe("familiaDe", () => {
  it.each([
    ["HTML", 1],
    ["CSS3", 1],
    ["JavaScript", 2],
    ["Next.js", 2],
    ["Node.js", 3],
    ["PostgreSQL", 3],
    ["React", 4],
    ["TypeScript", 4],
    ["Figma", 5],
    ["IA", 5],
  ])("%s → família %i", (nome, familia) => {
    expect(familiaDe(nome)).toBe(familia);
  });

  it("não liga para maiúsculas, acentos nem espaços nas pontas", () => {
    expect(familiaDe("  NODE.JS ")).toBe(3);
    expect(familiaDe("Integração com IA (LLM)")).toBe(5);
    expect(normalizar("Integração")).toBe("integracao");
  });

  it("tecnologia desconhecida fica neutra (null)", () => {
    expect(familiaDe("Cobol")).toBeNull();
    expect(familiaDe("")).toBeNull();
  });
});

describe("FAMILIAS", () => {
  it("nenhuma tecnologia está em duas famílias", () => {
    const todas = Object.values(FAMILIAS).flatMap((f) => f.itens.map(normalizar));
    expect(new Set(todas).size).toBe(todas.length);
  });

  it("toda tag dos projetos em destaque tem cor", () => {
    for (const tag of DESTAQUES.flatMap((p) => p.tags)) {
      expect(familiaDe(tag), tag).not.toBeNull();
    }
  });

  it("toda habilidade da página Sobre tem cor", () => {
    for (const item of HABILIDADES.flatMap((g) => g.itens)) {
      expect(familiaDe(item), item).not.toBeNull();
    }
  });
});
