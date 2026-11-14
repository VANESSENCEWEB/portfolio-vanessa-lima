/* =========================================================
   Testes dos dados da página Projetos (data/projetos.js)
   ---------------------------------------------------------
   Garantem que todo destaque está completo e que a lista
   automática do GitHub não repete os destaques.
   ========================================================= */
import { describe, expect, it } from "vitest";
import { DESTAQUES, GITHUB } from "@/data/projetos";

const ehLink = (valor) => /^https:\/\//.test(valor);

describe("DESTAQUES", () => {
  it("tem projetos e nenhum id repetido", () => {
    const ids = DESTAQUES.map((p) => p.id);
    expect(ids.length).toBeGreaterThan(0);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it.each(DESTAQUES.map((p) => [p.id, p]))("%s tem título, contexto, descrição e tags", (_, p) => {
    expect(p.titulo).toBeTruthy();
    expect(p.contexto).toBeTruthy();
    expect(p.descricao.length).toBeGreaterThan(40);
    expect(p.tags.length).toBeGreaterThan(0);
  });

  it.each(DESTAQUES.map((p) => [p.id, p]))("%s: links são https (ou null)", (_, p) => {
    for (const link of [p.site, p.codigo]) {
      if (link != null) expect(ehLink(link), link).toBe(true);
    }
  });

  it("projeto sem link nenhum explica o porquê numa nota", () => {
    for (const p of DESTAQUES.filter((p) => !p.site && !p.codigo)) {
      expect(p.nota, p.id).toBeTruthy();
    }
  });
});

describe("GITHUB", () => {
  it("aponta para o perfil certo", () => {
    expect(GITHUB.perfil.toLowerCase()).toContain(GITHUB.usuario.toLowerCase());
  });

  it("os repositórios dos destaques ficam fora da lista automática (não repetem)", () => {
    for (const p of DESTAQUES.filter((p) => p.repositorio)) {
      expect(GITHUB.excluir).toContain(p.repositorio);
    }
  });

  it("o README do perfil nunca aparece como projeto", () => {
    expect(GITHUB.excluir).toContain("vanessenceweb");
  });
});
