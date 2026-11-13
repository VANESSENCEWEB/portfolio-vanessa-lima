/* Testes do componente Timeline */
import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Timeline from "@/components/Timeline/Timeline";
import { PREENCHER } from "@/lib/experiencias";

// Dados pequenos de exemplo (não dependem do data/experiencias.js)
const ITENS = [
  {
    id: "estudio",
    titulo: "Estúdio Exemplo",
    cargo: PREENCHER,
    organizacao: "Empresa própria",
    inicio: PREENCHER,
    emAndamento: true,
    descricao: "Sites para clientes.",
    destaques: ["Site A no ar", PREENCHER],
    tags: ["HTML", "CSS"],
    links: [{ texto: "Ver protótipo", href: "https://exemplo.com" }],
  },
  {
    id: "curso",
    titulo: "Curso Exemplo",
    cargo: "Coordenação",
    organizacao: "Escola",
    tipo: "Graduação",
    local: "Recife, PE",
    inicio: "2024",
    fim: "2025",
    emAndamento: false,
    destaques: [],
    tags: [],
    links: [],
  },
];

describe("Timeline", () => {
  it("é uma lista numerada (<ol>) com um item por experiência", () => {
    render(<Timeline itens={ITENS} rotulo="Exemplo" />);
    const lista = screen.getByRole("list", { name: "Exemplo" });
    expect(lista.tagName).toBe("OL");
    expect(within(lista).getAllByRole("article")).toHaveLength(2);
  });

  it("cada item é um article nomeado pelo título (h3 por padrão)", () => {
    render(<Timeline itens={ITENS} />);
    expect(screen.getByRole("heading", { level: 3, name: "Curso Exemplo" })).toBeInTheDocument();
    expect(screen.getByRole("article", { name: "Curso Exemplo" })).toBeInTheDocument();
  });

  it("nivelTitulo muda o nível dos títulos", () => {
    render(<Timeline itens={ITENS} nivelTitulo={2} />);
    expect(screen.getAllByRole("heading", { level: 2 })).toHaveLength(2);
  });

  it("mostra período, cargo, organização e informações extras", () => {
    render(<Timeline itens={ITENS} />);
    const item = screen.getByRole("article", { name: "Curso Exemplo" });
    expect(within(item).getByText("2024 — 2025")).toBeInTheDocument();
    expect(within(item).getByText("Coordenação · Escola")).toBeInTheDocument();
    expect(within(item).getByText("Graduação · Recife, PE")).toBeInTheDocument();
  });

  it("item em andamento ganha a etiqueta e campos PREENCHER não aparecem", () => {
    render(<Timeline itens={ITENS} mostrarPendentes={false} />);
    const item = screen.getByRole("article", { name: "Estúdio Exemplo" });
    expect(within(item).getByText("Em andamento")).toBeInTheDocument();
    expect(within(item).getByText("Empresa própria")).toBeInTheDocument(); // sem " · " sobrando
    expect(within(item).queryByText(/atual/)).not.toBeInTheDocument(); // sem início, sem período
    expect(within(item).queryByText(/preencher/i)).not.toBeInTheDocument();
  });

  it("destaques e tags viram listas (o PREENCHER é ignorado)", () => {
    render(<Timeline itens={ITENS} />);
    const item = screen.getByRole("article", { name: "Estúdio Exemplo" });
    expect(within(item).getByText("Site A no ar")).toBeInTheDocument();
    const tags = within(item).getByRole("list", { name: "Ferramentas e habilidades" });
    expect(within(tags).getAllByRole("listitem")).toHaveLength(2);
  });

  it("links externos abrem em nova aba com rel=noopener noreferrer (segurança)", () => {
    render(<Timeline itens={ITENS} />);
    const link = screen.getByRole("link", { name: /Ver protótipo/ });
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("com mostrarPendentes, avisa o que falta preencher", () => {
    render(<Timeline itens={ITENS} mostrarPendentes />);
    const item = screen.getByRole("article", { name: "Estúdio Exemplo" });
    expect(within(item).getByText(/Falta preencher.*cargo, início/)).toBeInTheDocument();
    // O item completo não tem aviso
    const completo = screen.getByRole("article", { name: "Curso Exemplo" });
    expect(within(completo).queryByText(/Falta preencher/)).not.toBeInTheDocument();
  });

  it("sem itens não desenha nada", () => {
    const { container } = render(<Timeline itens={[]} />);
    expect(container).toBeEmptyDOMElement();
  });
});
