/* =========================================================
   Testes de lib/github.js
   ---------------------------------------------------------
   Só a parte "pura" (filtro e data): nenhum teste acessa a
   internet. Os repositórios abaixo são de mentira, no mesmo
   formato que a API do GitHub devolve.
   ========================================================= */
import { describe, expect, it } from "vitest";
import { chaveDe, filtrarRepositorios, formatarData } from "@/lib/github";

/* Fábrica de repositório falso: só muda o que o teste precisa */
function repo(nome, extra = {}) {
  return {
    id: nome.length + Math.random(),
    name: nome,
    description: `Descrição de ${nome}`,
    language: "JavaScript",
    html_url: `https://github.com/exemplo/${nome}`,
    homepage: "",
    fork: false,
    archived: false,
    size: 100,
    pushed_at: "2026-10-01T12:00:00Z",
    ...extra,
  };
}

describe("formatarData", () => {
  it("mostra a data no formato brasileiro", () => {
    expect(formatarData("2026-11-12T19:57:07Z")).toBe("12/11/2026");
  });

  it("não muda o dia por causa do fuso (23h UTC continua no mesmo dia)", () => {
    expect(formatarData("2026-11-12T23:30:00Z")).toBe("12/11/2026");
  });

  it("valor vazio ou inválido vira null", () => {
    expect(formatarData(null)).toBeNull();
    expect(formatarData("não é data")).toBeNull();
  });
});

describe("filtrarRepositorios", () => {
  it("tira fork, arquivado e repositório vazio", () => {
    const lista = [
      repo("fica"),
      repo("copia", { fork: true }),
      repo("antigo", { archived: true }),
      repo("vazio", { size: 0 }),
    ];
    expect(filtrarRepositorios(lista).map((r) => r.nome)).toEqual(["fica"]);
  });

  it("tira os nomes da lista excluir, sem ligar para maiúsculas", () => {
    const lista = [repo("VanessenceWeb"), repo("portfolio")];
    const resultado = filtrarRepositorios(lista, { excluir: ["vanessenceweb"] });
    expect(resultado.map((r) => r.nome)).toEqual(["portfolio"]);
  });

  it("ordena do atualizado mais recente para o mais antigo", () => {
    const lista = [
      repo("velho", { pushed_at: "2025-01-01T00:00:00Z" }),
      repo("novo", { pushed_at: "2026-11-01T00:00:00Z" }),
      repo("meio", { pushed_at: "2026-03-01T00:00:00Z" }),
    ];
    expect(filtrarRepositorios(lista).map((r) => r.nome)).toEqual(["novo", "meio", "velho"]);
  });

  it("respeita o limite", () => {
    const lista = ["a", "b", "c", "d"].map((nome) => repo(nome));
    expect(filtrarRepositorios(lista, { limite: 2 })).toHaveLength(2);
  });

  it("devolve no formato da página (sem homepage vazia nem descrição vazia)", () => {
    const [resultado] = filtrarRepositorios([repo("site", { description: null, homepage: "" })]);
    expect(resultado).toMatchObject({
      nome: "site",
      descricao: null,
      site: null,
      linguagem: "JavaScript",
      codigo: "https://github.com/exemplo/site",
      atualizadoEm: "01/10/2026",
    });
  });

  it("resposta estranha da API (não é lista) não quebra: vira lista vazia", () => {
    expect(filtrarRepositorios({ message: "API rate limit exceeded" })).toEqual([]);
    expect(filtrarRepositorios(undefined)).toEqual([]);
  });
});

describe("chaveDe", () => {
  it.each([
    ["nasa_explorer", "nasa-explorer"],
    ["Jogo Dados", "jogo-dados"],
    ["--portfolio-2--", "portfolio-2"],
  ])("chaveDe(%s) → %s", (nome, esperado) => {
    expect(chaveDe(nome)).toBe(esperado);
  });
});
