/* Testes da página 404 */
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import NaoEncontrada, { metadata } from "@/app/not-found";

describe("Página 404", () => {
  it("tem um único h1 e o número 404 escondido do leitor de tela", () => {
    render(<NaoEncontrada />);
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(screen.getByRole("heading", { level: 1 })).toHaveAccessibleName("Página não encontrada.");
    expect(screen.getByText("404")).toHaveAttribute("aria-hidden", "true");
  });

  it("oferece caminhos de volta", () => {
    render(<NaoEncontrada />);
    expect(screen.getByRole("link", { name: "Voltar para o início" })).toHaveAttribute("href", "/");
    expect(screen.getByRole("link", { name: "Ver projetos" })).toHaveAttribute("href", "/projetos");
  });

  it("tem título próprio para a aba", () => {
    expect(metadata.title).toBe("Página não encontrada");
  });
});
