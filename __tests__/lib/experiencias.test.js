/* Testes das funções de lib/experiencias.js */
import { describe, expect, it } from "vitest";
import {
  camposPendentes,
  camposPendentesDoItem,
  formatarPeriodo,
  PREENCHER,
  temValor,
} from "@/lib/experiencias";

describe("temValor", () => {
  it.each([
    ["2026.1", true],
    [0, true],
    ["", false],
    ["   ", false],
    [null, false],
    [undefined, false],
    [PREENCHER, false],
  ])("temValor(%s) → %s", (valor, esperado) => {
    expect(temValor(valor)).toBe(esperado);
  });
});

describe("formatarPeriodo", () => {
  it("em andamento mostra 'atual'", () => {
    expect(formatarPeriodo({ inicio: "2025.1", emAndamento: true })).toBe("2025.1 — atual");
  });

  it("com início e fim diferentes mostra os dois", () => {
    expect(formatarPeriodo({ inicio: "2024", fim: "2025" })).toBe("2024 — 2025");
  });

  it("início igual ao fim (ou sem fim) mostra só um", () => {
    expect(formatarPeriodo({ inicio: "2026.1", fim: "2026.1" })).toBe("2026.1");
    expect(formatarPeriodo({ inicio: "2026.1", fim: null })).toBe("2026.1");
  });

  it("sem início (ou PREENCHER) não inventa período", () => {
    expect(formatarPeriodo({ inicio: PREENCHER, emAndamento: true })).toBeNull();
    expect(formatarPeriodo({ fim: "2025" })).toBeNull();
    expect(formatarPeriodo()).toBeNull();
  });

  it("fim PREENCHER é ignorado", () => {
    expect(formatarPeriodo({ inicio: "2024", fim: PREENCHER })).toBe("2024");
  });
});

describe("camposPendentes", () => {
  const itens = [
    { id: "a", cargo: PREENCHER, inicio: "2025", fim: null },
    { id: "b", inicio: PREENCHER, ano: PREENCHER },
    { id: "c", inicio: "2026" },
  ];

  it("lista só os campos com PREENCHER (null não conta)", () => {
    expect(camposPendentesDoItem(itens[0])).toEqual(["cargo"]);
    expect(camposPendentesDoItem(itens[2])).toEqual([]);
  });

  it("junta o id do item com o campo", () => {
    expect(camposPendentes(itens)).toEqual(["a.cargo", "b.inicio", "b.ano"]);
  });

  it("o marcador não pode ser alterado sem querer", () => {
    expect(Object.isFrozen(PREENCHER)).toBe(true);
  });
});
