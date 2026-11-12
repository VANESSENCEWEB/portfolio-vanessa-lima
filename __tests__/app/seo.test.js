/* =========================================================
   Testes do SEO técnico: sitemap.xml e robots.txt
   ---------------------------------------------------------
   As funções do sitemap e do robots são JavaScript comum:
   dá para chamar e conferir o que elas devolvem.
   ========================================================= */
import { describe, expect, it } from "vitest";
import sitemap from "@/app/sitemap";
import robots from "@/app/robots";
import { MENU } from "@/data/perfil";
import { URL_SITE } from "@/lib/site";

describe("sitemap.xml", () => {
  const paginas = sitemap();

  it("tem uma entrada para cada página do MENU", () => {
    expect(paginas).toHaveLength(MENU.length);
  });

  it("usa endereços completos com https e sem barra dupla", () => {
    for (const pagina of paginas) {
      expect(pagina.url.startsWith(URL_SITE)).toBe(true);
      expect(pagina.url).toMatch(/^https:\/\//);
      expect(pagina.url.replace("https://", "")).not.toContain("//");
    }
  });

  it("a Home vem primeiro, com prioridade máxima", () => {
    expect(paginas[0]).toMatchObject({ url: URL_SITE, priority: 1 });
  });
});

describe("robots.txt", () => {
  const regras = robots();

  it("libera o site para os robôs e bloqueia só /api/", () => {
    expect(regras.rules).toMatchObject({ userAgent: "*", allow: "/", disallow: "/api/" });
  });

  it("aponta para o sitemap", () => {
    expect(regras.sitemap).toBe(`${URL_SITE}/sitemap.xml`);
  });
});
