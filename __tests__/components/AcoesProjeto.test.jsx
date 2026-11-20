/* Testes dos botões "Ver online" e "Ver código" dos cartões de projeto */
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import AcoesProjeto from "@/components/AcoesProjeto/AcoesProjeto";

const SITE = "https://nasa.exemplo.com";
const CODIGO = "https://github.com/VANESSENCEWEB/nasa_explorer";

describe("AcoesProjeto", () => {
  it("com site e código mostra os dois botões, com o nome do projeto para o leitor de tela", () => {
    render(<AcoesProjeto titulo="NASA Explorer" site={SITE} codigo={CODIGO} />);
    expect(screen.getByRole("link", { name: /^Ver online: NASA Explorer/ })).toHaveAttribute("href", SITE);
    expect(screen.getByRole("link", { name: /^Ver código: NASA Explorer no GitHub/ })).toHaveAttribute(
      "href",
      CODIGO,
    );
  });

  it("os dois abrem em nova aba com segurança", () => {
    render(<AcoesProjeto titulo="NASA Explorer" site={SITE} codigo={CODIGO} />);
    for (const link of screen.getAllByRole("link")) {
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
    }
  });

  it("mostra só o que o projeto tem", () => {
    render(<AcoesProjeto titulo="CLI" codigo={CODIGO} />);
    expect(screen.getAllByRole("link")).toHaveLength(1);
    expect(screen.queryByRole("link", { name: /Ver online/ })).not.toBeInTheDocument();
  });

  it("projeto privado sem links mostra só a nota", () => {
    render(<AcoesProjeto titulo="Sistema" nota="Sistema privado." />);
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
    expect(screen.getByText("Sistema privado.")).toBeInTheDocument();
  });

  it("sem nada, não desenha nada", () => {
    const { container } = render(<AcoesProjeto titulo="Vazio" />);
    expect(container).toBeEmptyDOMElement();
  });
});
