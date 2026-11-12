/* =========================================================
   Testes do componente Navbar
   ---------------------------------------------------------
   "Mock" = uma versão de mentira de algo que o componente usa.
   - next/navigation: fora do Next não existe rota, então
     dizemos qual é o endereço atual (usePathname).
   - TemaProvider: aqui só conferimos se o botão chama a troca.
   ========================================================= */
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import Navbar from "@/components/Navbar/Navbar";
import { MENU, PESSOA } from "@/data/perfil";

// vi.hoisted: cria as funções falsas ANTES dos vi.mock (que sobem para o topo do arquivo)
const { usePathnameFalso, alternarTemaFalso } = vi.hoisted(() => ({
  usePathnameFalso: vi.fn(),
  alternarTemaFalso: vi.fn(),
}));

vi.mock("next/navigation", () => ({ usePathname: usePathnameFalso }));
vi.mock("@/components/TemaProvider", () => ({
  useTema: () => ({ tema: "escuro", alternarTema: alternarTemaFalso }),
}));

const menuDesktop = () => screen.getByRole("navigation", { name: "Navegação principal" });

describe("Navbar", () => {
  beforeEach(() => {
    usePathnameFalso.mockReturnValue("/"); // por padrão estamos na Home
  });

  it("mostra todos os links do MENU com o endereço certo", () => {
    render(<Navbar />);
    for (const item of MENU) {
      expect(within(menuDesktop()).getByRole("link", { name: item.texto })).toHaveAttribute(
        "href",
        item.link,
      );
    }
  });

  it("marca a página atual com aria-current", () => {
    usePathnameFalso.mockReturnValue("/sobre");
    render(<Navbar />);
    expect(within(menuDesktop()).getByRole("link", { name: "Sobre" })).toHaveAttribute(
      "aria-current",
      "page",
    );
    expect(within(menuDesktop()).getByRole("link", { name: "Início" })).not.toHaveAttribute("aria-current");
  });

  it("links externos abrem em nova aba com rel=noopener noreferrer (segurança)", () => {
    const { container } = render(<Navbar />);
    const externos = container.querySelectorAll('a[target="_blank"]');
    expect(externos.length).toBeGreaterThan(0);
    for (const link of externos) {
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
    }
  });

  it("os ícones do GitHub e LinkedIn levam aos perfis certos", () => {
    render(<Navbar />);
    expect(within(menuDesktop()).getByRole("link", { name: /GitHub/ })).toHaveAttribute(
      "href",
      PESSOA.redes.github,
    );
    expect(within(menuDesktop()).getByRole("link", { name: /LinkedIn/ })).toHaveAttribute(
      "href",
      PESSOA.redes.linkedin,
    );
  });

  it("o botão hambúrguer abre e fecha o menu (aria-expanded)", async () => {
    const usuario = userEvent.setup();
    render(<Navbar />);
    const botao = screen.getByRole("button", { name: "Abrir menu" });
    expect(botao).toHaveAttribute("aria-expanded", "false");

    await usuario.click(botao);
    expect(botao).toHaveAttribute("aria-expanded", "true");
    expect(botao).toHaveAccessibleName("Fechar menu");

    await usuario.click(botao);
    expect(botao).toHaveAttribute("aria-expanded", "false");
  });

  it("a tecla Esc fecha o menu e destrava a rolagem", async () => {
    const usuario = userEvent.setup();
    render(<Navbar />);
    const botao = screen.getByRole("button", { name: "Abrir menu" });

    await usuario.click(botao);
    expect(document.body.style.overflow).toBe("hidden");

    await usuario.keyboard("{Escape}");
    expect(botao).toHaveAttribute("aria-expanded", "false");
    expect(document.body.style.overflow).toBe("");
  });

  it("o menu fecha sozinho quando a página muda", async () => {
    const usuario = userEvent.setup();
    const { rerender } = render(<Navbar />);
    const botao = screen.getByRole("button", { name: "Abrir menu" });

    await usuario.click(botao);
    usePathnameFalso.mockReturnValue("/projetos"); // simula a navegação
    rerender(<Navbar />);
    expect(botao).toHaveAttribute("aria-expanded", "false");
  });

  it("o botão de tema chama alternarTema", async () => {
    const usuario = userEvent.setup();
    render(<Navbar />);
    await usuario.click(screen.getByRole("button", { name: "Alternar entre tema claro e escuro" }));
    expect(alternarTemaFalso).toHaveBeenCalledTimes(1);
  });
});
