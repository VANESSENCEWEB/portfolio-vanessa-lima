/* Testes da seção Contato (canais + formulário) */
import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Contato from "@/components/Contato/Contato";
import { CONTATO } from "@/data/contato";
import { PESSOA } from "@/data/perfil";

describe("Contato", () => {
  it("é uma região com o título 'Vamos conversar' e a âncora #contato", () => {
    render(<Contato />);
    const regiao = screen.getByRole("region", { name: /Vamos conversar/ });
    expect(regiao).toHaveAttribute("id", "contato");
  });

  it("tem os canais com os endereços certos e links externos seguros", () => {
    render(<Contato />);
    expect(screen.getByRole("link", { name: new RegExp(PESSOA.email) })).toHaveAttribute(
      "href",
      `mailto:${PESSOA.email}`,
    );
    for (const { rotulo, link } of CONTATO.canais.filter((c) => c.link.startsWith("http"))) {
      const a = screen.getByRole("link", { name: new RegExp(rotulo) });
      expect(a).toHaveAttribute("href", link);
      expect(a).toHaveAttribute("rel", "noopener noreferrer");
    }
  });

  it("todo campo tem rótulo, e nome, e-mail e mensagem são obrigatórios", () => {
    render(<Contato />);
    expect(screen.getByRole("textbox", { name: /Nome/ })).toBeRequired();
    expect(screen.getByRole("textbox", { name: /E-mail/ })).toHaveAttribute("type", "email");
    expect(screen.getByRole("textbox", { name: /E-mail/ })).toBeRequired();
    expect(screen.getByRole("textbox", { name: /Mensagem/ })).toBeRequired();
    const assunto = screen.getByRole("combobox", { name: /Assunto/ });
    expect(within(assunto).getAllByRole("option")).toHaveLength(CONTATO.assuntos.length);
  });

  it("o botão envia o formulário e existe uma região de status para o aviso", () => {
    render(<Contato />);
    expect(screen.getByRole("button", { name: CONTATO.botao })).toHaveAttribute("type", "submit");
    expect(screen.getByRole("status")).toBeInTheDocument();
  });
});
