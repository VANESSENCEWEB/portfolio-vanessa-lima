/* =========================================================
   app/experiencia-profissional/page.jsx — página EXPERIÊNCIA
   PROFISSIONAL (endereço /experiencia-profissional)
   ---------------------------------------------------------
   Seções, de cima para baixo:
   1. Cabeçalho: título (h1) e descrição
   2. Onde atuei: linha do tempo (Vanessenceweb e Recife Flats)
   3. Sites para clientes: cartões com mockup (prints) e botões
   Server Component: a página inteira chega pronta em HTML.
   Todos os textos vêm de data/experiencias.js.
   ========================================================= */
import { EXPERIENCIA_PROFISSIONAL, PROJETOS_CLIENTES } from "@/data/experiencias";
import CabecalhoPagina from "@/components/CabecalhoPagina/CabecalhoPagina";
import Timeline from "@/components/Timeline/Timeline";
import PRINTS from "@/data/prints.json";
import Mockup from "@/components/Mockup/Mockup";
import AcoesProjeto from "@/components/AcoesProjeto/AcoesProjeto";
import Botao from "@/components/ui/Botao/Botao";
import Card from "@/components/ui/Card/Card";
import Secao from "@/components/ui/Secao/Secao";
import styles from "./page.module.css";
import { metadadosDaPagina } from "@/lib/metadados";

/* SEO da página: metadados completos (lib/metadados.js). O layout completa o título → "Experiência Profissional — Vanessa Lima") */
export const metadata = metadadosDaPagina({
  titulo: "Experiência Profissional",
  descricao:
    "Experiência de Vanessa Lima: Vanessenceweb, estúdio de desenvolvimento web com sites para clientes, e o sistema interno do Recife Flats Temporada.",
  caminho: "/experiencia-profissional",
});

/* ---------- 3. Sites para clientes ---------- */
function SitesParaClientes() {
  return (
    <Secao
      id="clientes"
      rotulo="Trabalhos reais"
      titulo="Sites para clientes"
      descricao="Sites institucionais e sistemas em uso. Os links ficam nos botões de cada cartão."
    >
      <ul className={styles.grade}>
        {PROJETOS_CLIENTES.map(({ id, titulo, cliente, descricao, tags, site, codigo, nota, prints }) => (
          <li key={id}>
            {/* Mesmo cartão da página Projetos: mockup no topo, botões no fim */}
            <Card
              titulo={titulo}
              rotulo={cliente}
              descricao={descricao}
              tags={tags}
              midia={<Mockup titulo={titulo} prints={PRINTS[prints]} />}
            >
              <AcoesProjeto titulo={titulo} site={site} codigo={codigo} nota={nota} />
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
        descricao="Sites para clientes reais pela Vanessenceweb, meu estúdio de desenvolvimento web, e o sistema interno que construí para uma empresa de hospedagem em Recife."
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
