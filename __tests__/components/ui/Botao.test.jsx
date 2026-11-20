/* =========================================================
   Testes do Botao
   ---------------------------------------------------------
   Buscamos os elementos como uma pessoa (ou leitor de tela)
   veria: pelo PAPEL (button, link) e pelo NOME acessível.
   ========================================================= */
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import Botao, { ehExterno } from "@/components/ui/Botao/Botao";

describe("Botao", () => {
  it("sem href vira <button type=button> e chama o onClick", async () => {
    const aoClicar = vi.fn();
    render(<Botao onClick={aoClicar}>Enviar</Botao>);

    const botao = screen.getByRole("button", { name: "Enviar" });
    expect(botao).toHaveAttribute("type", "button"); // não envia formulário sem querer
    await userEvent.click(botao);
    expect(aoClicar).toHaveBeenCalledTimes(1);
  });

  it("com href interno vira link na mesma aba", () => {
    render(<Botao href="/projetos">Ver projetos</Botao>);
    const link = screen.getByRole("link", { name: "Ver projetos" });
    expect(link).toHaveAttribute("href", "/projetos");
    expect(link).not.toHaveAttribute("target");
  });

  it("com href externo abre em nova aba com rel=noopener noreferrer (segurança)", () => {
    render(<Botao href="https://github.com/VANESSENCEWEB">GitHub</Botao>);
    const link = screen.getByRole("link", { name: /GitHub/ });
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
    // O leitor de tela é avisado de que abre em outra aba
    expect(link).toHaveAccessibleName(/GitHub.*abre em nova aba/);
  });

  it("mailto vira <a> comum, sem nova aba", () => {
    render(<Botao href="mailto:teste@exemplo.com">E-mail</Botao>);
    const link = screen.getByRole("link", { name: "E-mail" });
    expect(link).toHaveAttribute("href", "mailto:teste@exemplo.com");
    expect(link).not.toHaveAttribute("target");
  });

  it("aplica a variante e a seta fica escondida do leitor de tela", () => {
    render(
      <Botao href="/sobre" variante="secundario" seta>
        Sobre
      </Botao>,
    );
    const link = screen.getByRole("link", { name: "Sobre" }); // a seta "→" não entra no nome
    expect(link).toHaveClass("botao", "secundario");
  });
});

describe("ehExterno", () => {
  it.each([
    ["https://site.com", true],
    ["http://site.com", true],
    ["/sobre", false],
    ["mailto:a@b.com", false],
    ["#conteudo", false],
    [undefined, false],
  ])("ehExterno(%s) → %s", (href, esperado) => {
    expect(ehExterno(href)).toBe(esperado);
  });

  it("link para o GitHub ou LinkedIn vira o botão da marca (com ícone), menos o fantasma", () => {
    const { rerender, container } = render(<Botao href="https://github.com/VANESSENCEWEB">GitHub</Botao>);
    expect(container.querySelector("a").className).toMatch(/github/);
    expect(container.querySelector("a svg")).not.toBeNull();
    rerender(<Botao href="https://www.linkedin.com/in/vanessa-lima-dev/">LinkedIn</Botao>);
    expect(container.querySelector("a").className).toMatch(/linkedin/);
    rerender(
      <Botao href="https://github.com/VANESSENCEWEB" variante="fantasma">
        Código
      </Botao>,
    );
    expect(container.querySelector("a").className).not.toMatch(/github/);
  });
});
