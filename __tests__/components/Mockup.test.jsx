/* Testes do Mockup (prints do projeto em computador + celular) */
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Mockup from "@/components/Mockup/Mockup";
import Card from "@/components/ui/Card/Card";

const PRINTS = {
  computador: "/images/projetos/exemplo-computador.jpg",
  celular: "/images/projetos/exemplo-celular.jpg",
};

describe("Mockup", () => {
  it("com prints mostra as duas telas, com alt descrevendo cada aparelho", () => {
    render(<Mockup titulo="NASA Explorer" prints={PRINTS} />);
    expect(screen.getByAltText("Tela de NASA Explorer no computador")).toBeInTheDocument();
    expect(screen.getByAltText("Tela de NASA Explorer no celular")).toBeInTheDocument();
  });

  it("sem prints não mostra imagem nenhuma (só a moldura com o nome)", () => {
    const { container } = render(<Mockup titulo="Sistema Recife Flats" />);
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
    expect(container).toHaveTextContent("Sistema Recife Flats");
  });

  it("print pela metade (só computador) conta como sem print", () => {
    render(<Mockup titulo="Meio" prints={{ computador: PRINTS.computador }} />);
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });

  it("dentro do Card, o cartão continua com UM link só", () => {
    render(
      <Card
        titulo="NASA Explorer"
        href="https://exemplo.com"
        midia={<Mockup titulo="NASA Explorer" prints={PRINTS} />}
      />,
    );
    expect(screen.getAllByRole("link")).toHaveLength(1);
    expect(screen.getAllByRole("img")).toHaveLength(2);
  });
});
