/* Testes de lib/metadados.js (metadados completos por página) */
import { describe, expect, it } from "vitest";
import { metadadosDaPagina, OG_BASE } from "@/lib/metadados";
import { metadata as home } from "@/app/page";
import { metadata as sobre } from "@/app/sobre/page";
import { metadata as academica } from "@/app/experiencia-academica/page";
import { metadata as profissional } from "@/app/experiencia-profissional/page";
import { metadata as projetos } from "@/app/projetos/page";

const PAGINAS = [
  ["/", home],
  ["/sobre", sobre],
  ["/experiencia-academica", academica],
  ["/experiencia-profissional", profissional],
  ["/projetos", projetos],
];

describe("metadadosDaPagina", () => {
  it("monta o título completo para o Open Graph e o Twitter", () => {
    const m = metadadosDaPagina({ titulo: "Sobre", descricao: "x", caminho: "/sobre" });
    expect(m.title).toBe("Sobre");
    expect(m.openGraph.title).toBe("Sobre — Vanessa Lima");
    expect(m.twitter.title).toBe("Sobre — Vanessa Lima");
  });

  it("na Home (sem título) não define title: fica o padrão do layout", () => {
    expect(metadadosDaPagina({ descricao: "x", caminho: "/" })).not.toHaveProperty("title");
  });
});

describe.each(PAGINAS)("página %s", (caminho, m) => {
  it("tem canonical próprio", () => {
    expect(m.alternates.canonical).toBe(caminho);
  });

  it("não perde o Open Graph do site (imagem, tipo, idioma, nome)", () => {
    expect(m.openGraph).toMatchObject(OG_BASE);
    expect(m.openGraph.url).toBe(caminho);
  });

  it("o Twitter usa o título DESTA página, com imagem", () => {
    expect(m.twitter.title).toBe(m.openGraph.title);
    expect(m.twitter.images.length).toBeGreaterThan(0);
  });
});

it("cada página tem título e descrição diferentes", () => {
  const titulos = PAGINAS.map(([, m]) => m.openGraph.title);
  const descricoes = PAGINAS.map(([, m]) => m.description);
  expect(new Set(titulos).size).toBe(PAGINAS.length);
  expect(new Set(descricoes).size).toBe(PAGINAS.length);
});
