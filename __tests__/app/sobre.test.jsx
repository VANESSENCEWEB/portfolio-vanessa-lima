/* =========================================================
   Testes da página Sobre (app/sobre/page.jsx)
   Conferem a estrutura que o Google e o leitor de tela usam:
   um só h1, seções nomeadas, foto com alt e links seguros.
   ========================================================= */
import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import PaginaSobre, { metadata } from "@/app/sobre/page";
import { FOTO, TECNOLOGIAS_DO_APP } from "@/data/sobre";

describe("Página Sobre", () => {
  it("tem um único h1: Sobre mim", () => {
    render(<PaginaSobre />);
    const titulos = screen.getAllByRole("heading", { level: 1 });
    expect(titulos).toHaveLength(1);
    expect(titulos[0]).toHaveAccessibleName("Sobre mim");
  });

  it("mostra a foto com texto alternativo", () => {
    render(<PaginaSobre />);
    expect(screen.getByRole("img", { name: FOTO.alt })).toBeInTheDocument();
  });

  it("tem as 4 seções nomeadas, incluindo a de tecnologias (obrigatória)", () => {
    render(<PaginaSobre />);
    for (const nome of [
      "Sobre mim",
      "O que eu uso",
      "Tecnologias e módulos usados neste app",
      "Como este site foi feito",
    ]) {
      expect(screen.getByRole("region", { name: nome })).toBeInTheDocument();
    }
  });

  it("a seção de tecnologias mostra todos os grupos do data/sobre.js", () => {
    render(<PaginaSobre />);
    const secao = screen.getByRole("region", { name: "Tecnologias e módulos usados neste app" });
    for (const { grupo } of TECNOLOGIAS_DO_APP) {
      expect(within(secao).getByRole("heading", { level: 3, name: grupo })).toBeInTheDocument();
    }
  });

  it("os passos de Como foi feito estão numa lista numerada", () => {
    render(<PaginaSobre />);
    const secao = screen.getByRole("region", { name: "Como este site foi feito" });
    expect(secao.querySelector("ol")).not.toBeNull();
  });

  it("links externos abrem em nova aba com rel=noopener noreferrer (segurança)", () => {
    const { container } = render(<PaginaSobre />);
    const externos = container.querySelectorAll('a[target="_blank"]');
    expect(externos.length).toBeGreaterThanOrEqual(4); // LinkedIn, GitHub, repositório, decisões
    for (const link of externos) {
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
    }
  });

  it("tem JSON-LD do tipo ProfilePage", () => {
    const { container } = render(<PaginaSobre />);
    const script = container.querySelector('script[type="application/ld+json"]');
    expect(JSON.parse(script.textContent)["@type"]).toBe("ProfilePage");
  });

  it("tem SEO próprio com canonical /sobre", () => {
    expect(metadata.title).toBe("Sobre");
    expect(metadata.alternates.canonical).toBe("/sobre");
  });
});
