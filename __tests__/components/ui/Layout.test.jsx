/* =========================================================
   Testes dos componentes de estrutura:
   Container, TituloSecao, Secao e Tag
   ========================================================= */
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Container from "@/components/ui/Container/Container";
import TituloSecao from "@/components/ui/TituloSecao/TituloSecao";
import Secao from "@/components/ui/Secao/Secao";
import Tag from "@/components/ui/Tag/Tag";

describe("Container", () => {
  it("usa <div> por padrão e aceita outra tag e largura", () => {
    const { container, rerender } = render(<Container>Oi</Container>);
    expect(container.firstChild.tagName).toBe("DIV");

    rerender(
      <Container as="section" largura="estreita" aria-label="Teste">
        Oi
      </Container>,
    );
    const secao = screen.getByRole("region", { name: "Teste" });
    expect(secao).toHaveClass("container", "estreita");
  });
});

describe("TituloSecao", () => {
  it("é um h2 por padrão, com rótulo e descrição", () => {
    render(
      <TituloSecao rotulo="Portfólio" descricao="Alguns trabalhos">
        Projetos
      </TituloSecao>,
    );
    // O ponto vermelho é decorativo: não entra no nome do título
    expect(screen.getByRole("heading", { level: 2, name: "Projetos" })).toBeInTheDocument();
    expect(screen.getByText("Portfólio")).toBeInTheDocument();
    expect(screen.getByText("Alguns trabalhos")).toBeInTheDocument();
  });

  it("aceita outro nível e corrige valores inválidos", () => {
    const { rerender } = render(<TituloSecao nivel={1}>Sobre</TituloSecao>);
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();

    rerender(<TituloSecao nivel={9}>Sobre</TituloSecao>);
    expect(screen.getByRole("heading", { level: 6 })).toBeInTheDocument();
  });
});

describe("Secao", () => {
  it("liga a <section> ao título com aria-labelledby", () => {
    render(
      <Secao id="destaques" titulo="Destaques" rotulo="Home">
        <p>conteúdo</p>
      </Secao>,
    );
    // "region" só existe quando a seção tem nome: prova que a ligação funciona
    const regiao = screen.getByRole("region", { name: "Destaques" });
    expect(regiao).toHaveAttribute("id", "destaques");
    expect(screen.getByText("conteúdo")).toBeInTheDocument();
  });

  it("sem título não cria aria-labelledby quebrado", () => {
    const { container } = render(<Secao id="vazia">texto</Secao>);
    expect(container.querySelector("section")).not.toHaveAttribute("aria-labelledby");
  });
});

describe("Tag", () => {
  it("mostra o texto com a variante", () => {
    render(<Tag variante="destaque">Novo</Tag>);
    expect(screen.getByText("Novo")).toHaveClass("tag", "destaque");
  });
});
