/* Testes do Card */
import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Card from "@/components/ui/Card/Card";

describe("Card", () => {
  it("mostra título (h3 por padrão), descrição e rótulo", () => {
    render(<Card titulo="ISAC Conecta" descricao="Plataforma de apoio" rotulo="2026" />);
    expect(screen.getByRole("heading", { level: 3, name: "ISAC Conecta" })).toBeInTheDocument();
    expect(screen.getByText("Plataforma de apoio")).toBeInTheDocument();
    expect(screen.getByText("2026")).toBeInTheDocument();
  });

  it("sem href não tem nenhum link", () => {
    render(<Card titulo="Sem link" />);
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });

  it("com href tem UM link só, com o nome do projeto", () => {
    render(<Card titulo="NASA Explorer" href="/projetos" tags={["React", "API"]} />);
    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(1);
    expect(links[0]).toHaveAccessibleName("NASA Explorer");
    expect(links[0]).toHaveAttribute("href", "/projetos");
  });

  it("link externo abre em nova aba com segurança", () => {
    render(<Card titulo="Repositório" href="https://github.com/VANESSENCEWEB" />);
    const link = screen.getByRole("link", { name: /Repositório/ });
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("as tags viram uma lista acessível", () => {
    render(<Card titulo="Projeto" tags={["React", "Next.js", "CSS"]} />);
    const lista = screen.getByRole("list", { name: "Tecnologias" });
    expect(within(lista).getAllByRole("listitem")).toHaveLength(3);
  });

  it("nivelTitulo muda a tag do título", () => {
    render(<Card titulo="Certificação" nivelTitulo={4} />);
    expect(screen.getByRole("heading", { level: 4, name: "Certificação" })).toBeInTheDocument();
  });
});
