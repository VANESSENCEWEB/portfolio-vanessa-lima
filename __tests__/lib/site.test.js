/* Testes de lib/site.js, lib/jsonLd.js e lib/classes.js */
import { describe, expect, it } from "vitest";
import { normalizarUrl, urlCompleta, URL_SITE } from "@/lib/site";
import { criarJsonLdPaginaSobre, criarJsonLdPessoa, serializarJsonLd } from "@/lib/jsonLd";
import { juntarClasses } from "@/lib/classes";
import { PESSOA } from "@/data/perfil";

describe("normalizarUrl", () => {
  it("tira espaços e barras do final", () => {
    expect(normalizarUrl(" https://meusite.com/ ")).toBe("https://meusite.com");
  });

  it("usa o endereço padrão se vier vazio ou inválido", () => {
    const padrao = "https://portfolio-vanessa-lima.vercel.app";
    expect(normalizarUrl(undefined)).toBe(padrao);
    expect(normalizarUrl("")).toBe(padrao);
    expect(normalizarUrl("meusite.com")).toBe(padrao); // sem https://
  });
});

describe("urlCompleta", () => {
  it("monta o endereço completo", () => {
    expect(urlCompleta("/")).toBe(URL_SITE);
    expect(urlCompleta("/sobre")).toBe(`${URL_SITE}/sobre`);
  });
});

describe("JSON-LD", () => {
  it("descreve uma Person com as redes em sameAs", () => {
    const ficha = criarJsonLdPessoa();
    expect(ficha["@context"]).toBe("https://schema.org");
    expect(ficha["@type"]).toBe("Person");
    expect(ficha.name).toBe(PESSOA.nome);
    expect(ficha.sameAs).toEqual([PESSOA.redes.github, PESSOA.redes.linkedin]);
  });

  it("a página Sobre é uma ProfilePage que aponta para a Person", () => {
    const ficha = criarJsonLdPaginaSobre();
    expect(ficha["@type"]).toBe("ProfilePage");
    expect(ficha.url).toBe(`${URL_SITE}/sobre`);
    expect(ficha.mainEntity["@type"]).toBe("Person");
    expect(ficha.mainEntity).not.toHaveProperty("@context"); // só um @context, no topo
  });

  it("serializarJsonLd impede fechar a tag </script> (segurança)", () => {
    const texto = serializarJsonLd({ nome: "</script><script>alert(1)</script>" });
    expect(texto).not.toContain("<");
    expect(JSON.parse(texto).nome).toBe("</script><script>alert(1)</script>"); // o valor continua igual
  });
});

describe("juntarClasses", () => {
  it("ignora valores vazios", () => {
    expect(juntarClasses("a", false, undefined, null, "", "b")).toBe("a b");
  });
});
