/* Testes do Footer (rodapé) */
import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Footer from "@/components/Footer/Footer";
import { MENU, PESSOA } from "@/data/perfil";

/* O Footer é um Server Component "async" (espera o ano).
   A Testing Library não desenha componente async direto,
   então primeiro esperamos ele montar o JSX e depois desenhamos. */
async function renderFooter() {
  return render(await Footer());
}

describe("Footer", () => {
  it("é o rodapé da página (landmark contentinfo)", async () => {
    await renderFooter();
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  });

  it("tem o e-mail público com mailto", async () => {
    await renderFooter();
    expect(screen.getByRole("link", { name: PESSOA.email })).toHaveAttribute(
      "href",
      `mailto:${PESSOA.email}`,
    );
  });

  it("repete todos os links do MENU", async () => {
    await renderFooter();
    const nav = screen.getByRole("navigation", { name: "Rodapé" });
    for (const item of MENU) {
      expect(within(nav).getByRole("link", { name: item.texto })).toHaveAttribute("href", item.link);
    }
  });

  it("links externos abrem em nova aba com rel=noopener noreferrer (segurança)", async () => {
    const { container } = await renderFooter();
    const externos = container.querySelectorAll('a[target="_blank"]');
    expect(externos).toHaveLength(2); // GitHub e LinkedIn
    for (const link of externos) {
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
    }
  });

  it("mostra o ano atual", async () => {
    await renderFooter();
    expect(screen.getByText(new RegExp(`© ${new Date().getFullYear()}`))).toBeInTheDocument();
  });
});
