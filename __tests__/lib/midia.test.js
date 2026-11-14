/* Testes de lib/midia.js (qual versão da animação da Hero mostrar) */
import { describe, expect, it } from "vitest";
import { ehWebKitSemAlfa, escolherModo } from "@/lib/midia";

const AGENTES = {
  chrome:
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0 Safari/537.36",
  edge: "Mozilla/5.0 (Windows NT 10.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0 Safari/537.36 Edg/131.0",
  firefox: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:133.0) Gecko/20100101 Firefox/133.0",
  safari:
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.1 Safari/605.1.15",
  chromeIphone:
    "Mozilla/5.0 (iPhone; CPU iPhone OS 18_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/131.0 Mobile/15E148 Safari/604.1",
};

describe("ehWebKitSemAlfa", () => {
  it.each([
    ["chrome", false],
    ["edge", false],
    ["firefox", false],
    ["safari", true],
    ["chromeIphone", true], // no iPhone, o Chrome usa o motor do Safari
  ])("%s → %s", (nome, esperado) => {
    expect(ehWebKitSemAlfa(AGENTES[nome])).toBe(esperado);
  });
});

describe("escolherModo", () => {
  it("Chrome e Firefox recebem o vídeo", () => {
    expect(escolherModo({ agente: AGENTES.chrome })).toBe("video");
    expect(escolherModo({ agente: AGENTES.firefox })).toBe("video");
  });

  it("Safari recebe o WebP animado (o vídeo ficaria com fundo preto)", () => {
    expect(escolherModo({ agente: AGENTES.safari })).toBe("animada");
  });

  it("menos movimento ou pausado → imagem parada, em qualquer navegador", () => {
    expect(escolherModo({ agente: AGENTES.chrome, reduzirMovimento: true })).toBe("parada");
    expect(escolherModo({ agente: AGENTES.safari, pausado: true })).toBe("parada");
  });

  it("sem informação nenhuma não quebra", () => {
    expect(escolherModo()).toBe("video");
  });
});
