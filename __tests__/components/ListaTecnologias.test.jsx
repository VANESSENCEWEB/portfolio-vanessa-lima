/* Testes do componente ListaTecnologias */
import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ListaTecnologias, { idDoGrupo } from "@/components/ListaTecnologias/ListaTecnologias";
import { versaoDe } from "@/data/sobre";

// Dados pequenos de exemplo (não dependem do data/sobre.js)
const GRUPOS = [
  {
    grupo: "Módulos do Next.js",
    descricao: "Peças prontas.",
    itens: [
      { nome: "Next.js", pacote: "next", papel: "Framework do site." },
      { nome: "next/link", papel: "Links internos sem recarregar." },
    ],
  },
  { grupo: "Testes", itens: [{ nome: "Vitest", pacote: "vitest", papel: "Roda os testes." }] },
];

describe("ListaTecnologias", () => {
  it("cria uma região com título h3 para cada grupo", () => {
    render(<ListaTecnologias grupos={GRUPOS} />);
    // O contador "02" é aria-hidden: o nome do título é só o grupo
    expect(screen.getByRole("region", { name: "Módulos do Next.js" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 3, name: "Testes" })).toBeInTheDocument();
  });

  it("lista os itens com o papel de cada um", () => {
    render(<ListaTecnologias grupos={GRUPOS} />);
    const grupo = screen.getByRole("region", { name: "Módulos do Next.js" });
    expect(within(grupo).getAllByRole("listitem")).toHaveLength(2);
    expect(within(grupo).getByText("Links internos sem recarregar.")).toBeInTheDocument();
  });

  it("mostra a versão do package.json só para quem tem pacote", () => {
    render(<ListaTecnologias grupos={GRUPOS} />);
    expect(screen.getByText(versaoDe("next"))).toBeInTheDocument();
    // next/link não tem pacote próprio: nenhuma versão no item dele
    const itemLink = screen.getByText("next/link").closest("li");
    expect(within(itemLink).queryByText(/versão/)).not.toBeInTheDocument();
  });
});

describe("idDoGrupo", () => {
  it("gera ids sem acento, espaço nem ponto", () => {
    expect(idDoGrupo("Módulos do Next.js")).toBe("grupo-modulos-do-next-js");
    expect(idDoGrupo("Hooks e APIs do navegador")).toBe("grupo-hooks-e-apis-do-navegador");
  });
});
