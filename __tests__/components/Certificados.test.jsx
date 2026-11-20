/* Testes da galeria de certificados */
import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Certificados from "@/components/Certificados/Certificados";
import { CERTIFICACOES } from "@/data/experiencias";

const ITENS = CERTIFICACOES.destaques;

describe("Certificados", () => {
  it("um cartão por certificado, com o título em h3", () => {
    render(<Certificados itens={ITENS} />);
    const lista = screen.getByRole("list", { name: "Certificados em destaque" });
    expect(within(lista).getAllByRole("listitem")).toHaveLength(ITENS.length);
    for (const { titulo } of ITENS) {
      expect(screen.getByRole("heading", { level: 3, name: titulo })).toBeInTheDocument();
    }
  });

  it("cada miniatura é um botão com nome para o leitor de tela", () => {
    render(<Certificados itens={ITENS} />);
    for (const { titulo } of ITENS) {
      expect(screen.getByRole("button", { name: `Ampliar o certificado ${titulo}` })).toBeInTheDocument();
    }
  });

  it("'Verificar' só aparece com link oficial, em nova aba e com segurança", () => {
    render(<Certificados itens={ITENS} />);
    const links = screen.getAllByRole("link", { name: /^Verificar/ });
    expect(links).toHaveLength(ITENS.filter((c) => c.verificar).length);
    for (const link of links) {
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
    }
  });

  it("a cópia da faixa (só visual) fica escondida do leitor de tela e do Tab", () => {
    const { container } = render(<Certificados itens={ITENS} />);
    const listas = container.querySelectorAll("ul");
    expect(listas).toHaveLength(2);
    expect(listas[1]).toHaveAttribute("aria-hidden", "true");
    expect(listas[1]).toHaveAttribute("inert");
  });

  it("tem botão para pausar e continuar a passagem (WCAG 2.2.2)", () => {
    render(<Certificados itens={ITENS} />);
    const botao = screen.getByRole("button", { name: /Pausar a passagem/ });
    fireEvent.click(botao);
    expect(screen.getByRole("button", { name: /Continuar a passagem/ })).toBeInTheDocument();
  });

  it("clicar na miniatura abre o certificado grande, com alt", () => {
    render(<Certificados itens={ITENS} />);
    const [primeiro] = ITENS;
    fireEvent.click(screen.getByRole("button", { name: `Ampliar o certificado ${primeiro.titulo}` }));
    const dialogo = screen.getByRole("dialog", { name: `Certificado: ${primeiro.titulo}` });
    expect(within(dialogo).getByRole("img", { name: new RegExp(primeiro.titulo) })).toBeInTheDocument();
    expect(within(dialogo).getByRole("button", { name: /Fechar/ })).toBeInTheDocument();
  });
});
