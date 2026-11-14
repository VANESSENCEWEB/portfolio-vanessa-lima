/* =========================================================
   Testes de data/prints.json (gerado por npm run prints)
   ---------------------------------------------------------
   Garantem que todo print listado existe de verdade em
   public/ (senão o cartão mostraria imagem quebrada) e que
   as chaves seguem o padrão usado pela página.
   ========================================================= */
import { existsSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import PRINTS from "@/data/prints.json";
import { DESTAQUES } from "@/data/projetos";
import { chaveDe } from "@/lib/repositorios";

const ENTRADAS = Object.entries(PRINTS);

describe("data/prints.json", () => {
  it("tem pelo menos um projeto com print", () => {
    expect(ENTRADAS.length).toBeGreaterThan(0);
  });

  it.each(ENTRADAS)("%s: as duas imagens existem em public/", (_, print) => {
    for (const arquivo of [print.computador, print.celular]) {
      expect(existsSync(path.join("public", arquivo)), arquivo).toBe(true);
    }
  });

  it.each(ENTRADAS)("%s: chave no padrão (minúsculas, números e hífen)", (chave) => {
    expect(chaveDe(chave)).toBe(chave);
  });

  it("destaque com site tem print (rode npm run prints se este teste falhar)", () => {
    for (const p of DESTAQUES.filter((p) => p.site)) {
      expect(PRINTS[p.id], p.id).toBeDefined();
    }
  });
});
