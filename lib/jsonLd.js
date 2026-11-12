/* =========================================================
   lib/jsonLd.js — "ficha" da Vanessa para o Google (JSON-LD)
   ---------------------------------------------------------
   JSON-LD é um texto em formato JSON, escondido na página,
   que diz ao Google quem é a pessoa do site (nome, profissão,
   cidade, redes). Ajuda o Google a ligar o portfólio ao
   GitHub e ao LinkedIn. Vocabulário: https://schema.org/Person
   ========================================================= */
import { PESSOA } from "@/data/perfil";
import { URL_SITE, urlCompleta } from "@/lib/site";

/** Monta o objeto Person (só dados PÚBLICOS que já aparecem no site) */
export function criarJsonLdPessoa() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: PESSOA.nome,
    url: URL_SITE,
    email: `mailto:${PESSOA.email}`,
    jobTitle: PESSOA.cargo,
    description: PESSOA.resumo,
    address: {
      "@type": "PostalAddress",
      addressLocality: PESSOA.cidade,
      addressRegion: PESSOA.estado,
      addressCountry: "BR",
    },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: PESSOA.universidade,
    },
    knowsAbout: PESSOA.conhecimentos,
    // sameAs = "esta pessoa também é estes perfis"
    sameAs: [PESSOA.redes.github, PESSOA.redes.linkedin],
  };
}

/**
 * Transforma o objeto em texto seguro para ir dentro de <script>.
 * SEGURANÇA: troca "<" por <. Assim nenhum texto consegue
 * "fechar" a tag </script> e injetar código na página.
 */
export function serializarJsonLd(objeto) {
  return JSON.stringify(objeto).replace(/</g, "\\u003c");
}

/**
 * Dia 3 — JSON-LD da página Sobre (tipo ProfilePage).
 * Diz ao Google: "esta página é o perfil desta pessoa".
 * Reaproveita a mesma ficha Person do layout em mainEntity.
 */
export function criarJsonLdPaginaSobre() {
  const { "@context": contexto, ...pessoa } = criarJsonLdPessoa();
  return {
    "@context": contexto,
    "@type": "ProfilePage",
    url: urlCompleta("/sobre"),
    name: `Sobre — ${PESSOA.nome}`,
    inLanguage: "pt-BR",
    mainEntity: pessoa,
  };
}
