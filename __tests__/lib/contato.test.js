/* Testes de lib/contato.js: o link "mailto:" do formulário */
import { describe, expect, it } from "vitest";
import { montarMailto } from "@/lib/contato";

describe("montarMailto", () => {
  const link = montarMailto("eu@exemplo.com", {
    nome: "  Ana Souza ",
    email: "ana@empresa.com",
    assunto: "Estágio front-end",
    mensagem: "Olá! Vi o seu portfólio.",
  });
  const url = new URL(link);

  it("vai para o e-mail de destino", () => {
    expect(url.protocol).toBe("mailto:");
    expect(url.pathname).toBe("eu@exemplo.com");
  });

  it("assunto = assunto escolhido + nome, sem espaços sobrando", () => {
    expect(url.searchParams.get("subject")).toBe("Estágio front-end — Ana Souza");
  });

  it("corpo = mensagem + assinatura com o e-mail de quem escreveu", () => {
    expect(url.searchParams.get("body")).toBe("Olá! Vi o seu portfólio.\n\nAna Souza (ana@empresa.com)");
  });

  it("codifica acentos, espaços e quebras de linha", () => {
    expect(link).not.toMatch(/\s/);
  });
});
