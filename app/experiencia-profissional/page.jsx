/* =========================================================
   app/experiencia-profissional/page.jsx — página EXPERIÊNCIA
   PROFISSIONAL (endereço /experiencia-profissional)
   ---------------------------------------------------------
   Seções, de cima para baixo:
   1. Cabeçalho: título (h1) e descrição
   2. Onde atuei: linha do tempo (Vanessenceweb e ISAC Conecta)
   3. Sites para clientes: cartões com link do site e do código
   Server Component: a página inteira chega pronta em HTML.
   Todos os textos vêm de data/experiencias.js.
   ========================================================= */
import { EXPERIENCIA_PROFISSIONAL, PROJETOS_CLIENTES } from "@/data/experiencias";
import CabecalhoPagina from "@/components/CabecalhoPagina/CabecalhoPagina";
import Timeline from "@/components/Timeline/Timeline";
import Botao from "@/components/ui/Botao/Botao";
import Card from "@/components/ui/Card/Card";
import Secao from "@/components/ui/Secao/Secao";
import styles from "./page.module.css";

/* SEO da página (o layout completa o título → "Experiência Profissional — Vanessa Lima") */
export const metadata = {
  title: "Experiência Profissional",
  description:
    "Experiência de Vanessa Lima: Vanessenceweb, estúdio de desenvolvimento web com sites para clientes, e coordenação e design do ISAC Conecta.",
  alternates: { canonical: "/experiencia-profissional" },
  openGraph: { title: "Experiência Profissional — Vanessa Lima", url: "/experiencia-profissional" },
};

/* ---------- 3. Sites para clientes ---------- */
function SitesParaClientes() {
  return (
    <Secao
      id="clientes"
      rotulo="Vanessenceweb"
      titulo="Sites para clientes"
      descricao="Projetos reais, publicados e em uso. Clique no cartão para abrir o site."
    >
      <ul className={styles.grade}>
        {PROJETOS_CLIENTES.map(({ id, titulo, cliente, descricao, tags, site, codigo }) => (
          <li key={id}>
            {/* O cartão inteiro leva ao site; o botão extra leva ao código */}
            <Card titulo={titulo} rotulo={cliente} descricao={descricao} tags={tags} href={site}>
              <Botao href={codigo} variante="fantasma" seta>
                Ver o código de {titulo}
              </Botao>
            </Card>
          </li>
        ))}
      </ul>

      <div className={styles.acoes}>
        <Botao href="/projetos" seta>
          Ver todos os projetos
        </Botao>
        <Botao href="/experiencia-academica" variante="secundario" seta>
          Experiência acadêmica
        </Botao>
      </div>
    </Secao>
  );
}

export default function PaginaExperienciaProfissional() {
  return (
    <>
      <CabecalhoPagina
        id="profissional"
        rotulo="Trabalho"
        titulo="Experiência Profissional"
        descricao="Sites para clientes reais pela Vanessenceweb, meu estúdio de desenvolvimento web, e coordenação de equipe e design na residência do Porto Digital."
      />

      <Secao
        id="trajetoria"
        rotulo="Linha do tempo"
        titulo="Onde atuei"
        descricao="Do mais recente para o mais antigo."
      >
        <Timeline itens={EXPERIENCIA_PROFISSIONAL} rotulo="Experiência profissional" />
      </Secao>

      <SitesParaClientes />
    </>
  );
}
