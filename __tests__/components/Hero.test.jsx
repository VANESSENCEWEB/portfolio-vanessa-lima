/* Testes da Hero (página Início) */
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import Hero from "@/components/Hero/Hero";
import { HERO, MIDIA } from "@/data/home";

describe("Hero", () => {
  it("tem um h1 só, com a saudação e o nome", () => {
    render(<Hero />);
    const titulos = screen.getAllByRole("heading", { level: 1 });
    expect(titulos).toHaveLength(1);
    expect(titulos[0]).toHaveTextContent(HERO.saudacao);
    expect(titulos[0]).toHaveTextContent(HERO.nome);
  });

  it("a palavra gigante é só enfeite (escondida do leitor de tela)", () => {
    const { container } = render(<Hero />);
    const palavra = [...container.querySelectorAll('[aria-hidden="true"]')].find(
      (el) => el.textContent === HERO.palavraGigante,
    );
    expect(palavra).toBeDefined();
  });

  it("mostra você com texto alternativo", () => {
    render(<Hero />);
    // Pode ser o vídeo (aria-label) ou a imagem (alt), conforme o navegador
    const midia = screen.queryByAltText(MIDIA.alt) ?? screen.queryByLabelText(MIDIA.alt);
    expect(midia).toBeInTheDocument();
  });

  it("o botão de pausar alterna entre pausar e retomar", async () => {
    render(<Hero />);
    const botao = screen.getByRole("button", { name: "Pausar a animação" });
    expect(botao).toHaveAttribute("aria-pressed", "false");
    await userEvent.click(botao);
    expect(screen.getByRole("button", { name: "Retomar a animação" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
  });

  it("os links levam para a página Projetos", () => {
    render(<Hero />);
    expect(screen.getByRole("link", { name: /Ver projetos/ })).toHaveAttribute("href", "/projetos");
    expect(screen.getByRole("link", { name: /Ver um caso por dentro/ })).toHaveAttribute("href", "/projetos");
  });

  it("os números vêm calculados (nenhum é zero ou inválido)", () => {
    for (const { valor } of HERO.numeros) {
      expect(Number.isInteger(valor) && valor > 0).toBe(true);
    }
  });
});
