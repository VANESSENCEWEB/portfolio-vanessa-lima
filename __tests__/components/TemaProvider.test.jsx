/* Testes do TemaProvider (tema claro/escuro) */
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { TemaProvider, useTema } from "@/components/TemaProvider";
import { CHAVE_TEMA } from "@/lib/tema";

// Componente pequeno de teste: mostra o tema e troca no clique
function MostraTema() {
  const { tema, alternarTema } = useTema();
  return (
    <button type="button" onClick={alternarTema}>
      {tema}
    </button>
  );
}

describe("TemaProvider", () => {
  beforeEach(() => {
    document.documentElement.dataset.tema = "escuro"; // como o script do layout deixaria
    localStorage.clear();
  });

  it("lê o tema que está no <html>", () => {
    document.documentElement.dataset.tema = "claro";
    render(
      <TemaProvider>
        <MostraTema />
      </TemaProvider>,
    );
    expect(screen.getByRole("button")).toHaveTextContent("claro");
  });

  it("alterna o tema, atualiza o <html> e salva a escolha", async () => {
    const usuario = userEvent.setup();
    render(
      <TemaProvider>
        <MostraTema />
      </TemaProvider>,
    );
    const botao = screen.getByRole("button");

    await usuario.click(botao);
    expect(document.documentElement.dataset.tema).toBe("claro");
    expect(localStorage.getItem(CHAVE_TEMA)).toBe("claro");
    expect(botao).toHaveTextContent("claro");

    await usuario.click(botao);
    expect(document.documentElement.dataset.tema).toBe("escuro");
  });

  it("useTema fora do Provider avisa com um erro claro", () => {
    vi.spyOn(console, "error").mockImplementation(() => {}); // esconde o erro esperado
    expect(() => render(<MostraTema />)).toThrow("useTema precisa estar dentro de <TemaProvider>");
  });
});
