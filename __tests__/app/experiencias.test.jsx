/* =========================================================
   Testes das páginas Experiência Acadêmica e Profissional
   Conferem a estrutura que o Google e o leitor de tela usam:
   um só h1, seções nomeadas, linha do tempo e links seguros.
   ========================================================= */
import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import PaginaAcademica, { metadata as metaAcademica } from "@/app/experiencia-academica/page";
import PaginaProfissional, { metadata as metaProfissional } from "@/app/experiencia-profissional/page";
import { CERTIFICACOES, EXPERIENCIA_PROFISSIONAL, FORMACAO, PROJETOS_CLIENTES } from "@/data/experiencias";

/* Regras que valem para as duas páginas */
describe.each([
  ["Experiência Acadêmica", PaginaAcademica, metaAcademica, "/experiencia-academica"],
  ["Experiência Profissional", PaginaProfissional, metaProfissional, "/experiencia-profissional"],
])("Página %s", (titulo, Pagina, metadata, caminho) => {
  it("tem um único h1 com o nome da página", () => {
    render(<Pagina />);
    const titulos = screen.getAllByRole("heading", { level: 1 });
    expect(titulos).toHaveLength(1);
    expect(titulos[0]).toHaveAccessibleName(titulo);
  });

  it("a linha do tempo fica numa seção nomeada, com h3 em cada item", () => {
    render(<Pagina />);
    const secao = screen.getByRole("region", { name: /Trajetória|Onde atuei/ });
    const lista = within(secao).getByRole("list", { name: /Formação acadêmica|Experiência profissional/ });
    expect(lista.tagName).toBe("OL");
    for (const artigo of within(lista).getAllByRole("article")) {
      expect(within(artigo).getByRole("heading", { level: 3 })).toBeInTheDocument();
    }
  });

  it("não mostra nenhum aviso de PREENCHER fora do npm run dev", () => {
    render(<Pagina />);
    expect(screen.queryByText(/Falta preencher/)).not.toBeInTheDocument();
  });

  it("links externos abrem em nova aba com rel=noopener noreferrer (segurança)", () => {
    const { container } = render(<Pagina />);
    for (const link of container.querySelectorAll('a[target="_blank"]')) {
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
    }
  });

  it(`tem SEO próprio com canonical ${caminho}`, () => {
    expect(metadata.title).toBe(titulo);
    expect(metadata.alternates.canonical).toBe(caminho);
    expect(metadata.description.length).toBeLessThanOrEqual(160);
  });
});

describe("Página Experiência Acadêmica", () => {
  it("mostra todos os itens da formação", () => {
    render(<PaginaAcademica />);
    for (const { titulo } of FORMACAO) {
      expect(screen.getByRole("heading", { level: 3, name: titulo })).toBeInTheDocument();
    }
  });

  it("mostra o total de certificações e um cartão por destaque", () => {
    render(<PaginaAcademica />);
    const secao = screen.getByRole("region", { name: "Certificações" });
    expect(within(secao).getByText(new RegExp(CERTIFICACOES.total.replace("+", "\\+")))).toBeInTheDocument();
    for (const { titulo } of CERTIFICACOES.destaques) {
      expect(within(secao).getByRole("heading", { level: 3, name: titulo })).toBeInTheDocument();
    }
    expect(within(secao).getByRole("link", { name: /Ver todas no LinkedIn/ })).toHaveAttribute(
      "href",
      CERTIFICACOES.linkTodas,
    );
  });

  it("os números do topo ficam numa lista de definição (<dl>)", () => {
    const { container } = render(<PaginaAcademica />);
    expect(container.querySelectorAll("dl dt")).toHaveLength(3);
  });
});

describe("Página Experiência Profissional", () => {
  it("mostra todas as experiências da linha do tempo", () => {
    render(<PaginaProfissional />);
    for (const { titulo } of EXPERIENCIA_PROFISSIONAL) {
      expect(screen.getByRole("heading", { level: 3, name: titulo })).toBeInTheDocument();
    }
  });

  it("cada site de cliente tem o link do site e o do código", () => {
    render(<PaginaProfissional />);
    const secao = screen.getByRole("region", { name: "Sites para clientes" });
    for (const { titulo, site, codigo } of PROJETOS_CLIENTES) {
      expect(within(secao).getByRole("link", { name: new RegExp(`^${titulo}`) })).toHaveAttribute(
        "href",
        site,
      );
      expect(within(secao).getByRole("link", { name: new RegExp(`código de ${titulo}`) })).toHaveAttribute(
        "href",
        codigo,
      );
    }
  });

  it("leva para a página de projetos", () => {
    render(<PaginaProfissional />);
    expect(screen.getByRole("link", { name: "Ver todos os projetos" })).toHaveAttribute("href", "/projetos");
  });
});
