/* =========================================================
   Testes dos dados do site (data/perfil.js)
   ---------------------------------------------------------
   Garantem que ninguém cadastre um link do menu que leva a
   uma página que não existe (erro 404).
   ========================================================= */
import { existsSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { MENU, PESSOA, SEO } from "@/data/perfil";

// "/" → app/page.jsx  ·  "/sobre" → app/sobre/page.jsx
function arquivoDaPagina(link) {
  return path.join(process.cwd(), "app", link, "page.jsx");
}

describe("MENU", () => {
  it("começa pela Home", () => {
    expect(MENU[0]).toEqual({ texto: "Início", link: "/" });
  });

  it("todo item tem texto e link interno só com minúsculas, números e hífen", () => {
    for (const item of MENU) {
      expect(item.texto.trim()).not.toBe("");
      expect(item.link).toMatch(/^\/[a-z0-9-]*$/);
    }
  });

  it("não tem links repetidos", () => {
    const links = MENU.map((item) => item.link);
    expect(new Set(links).size).toBe(links.length);
  });

  it.each(MENU)("o link $link aponta para uma página que existe", ({ link }) => {
    expect(existsSync(arquivoDaPagina(link))).toBe(true);
  });
});

describe("PESSOA", () => {
  it("as redes usam HTTPS e os endereços certos", () => {
    expect(PESSOA.redes.github).toBe("https://github.com/VANESSENCEWEB");
    expect(PESSOA.redes.linkedin).toBe("https://www.linkedin.com/in/vanessa-lima-dev/");
  });

  it("o e-mail público tem formato válido", () => {
    expect(PESSOA.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  });
});

describe("SEO", () => {
  it("o modelo de título tem o %s que o Next substitui", () => {
    expect(SEO.modeloTitulo).toContain("%s");
  });

  it("a descrição tem tamanho bom para o Google (50 a 160 letras)", () => {
    expect(SEO.descricao.length).toBeGreaterThanOrEqual(50);
    expect(SEO.descricao.length).toBeLessThanOrEqual(160);
  });
});
