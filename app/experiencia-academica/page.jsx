/* =========================================================
   app/experiencia-academica/page.jsx — página EXPERIÊNCIA ACADÊMICA
   (endereço /experiencia-academica)
   ---------------------------------------------------------
   Seções, de cima para baixo:
   1. Cabeçalho: título (h1), descrição e números (3º, 2 residências, 90+)
   2. Trajetória: linha do tempo (UNICAP e residência)
   3. Certificações: galeria com os certificados (ampliar e
      verificar) + link para todos no LinkedIn
   Server Component: a página inteira chega pronta em HTML.
   Todos os textos vêm de data/experiencias.js.
   ========================================================= */
import { CERTIFICACOES, FORMACAO, RESUMO_ACADEMICO } from "@/data/experiencias";
import Certificados from "@/components/Certificados/Certificados";
import CabecalhoPagina from "@/components/CabecalhoPagina/CabecalhoPagina";
import Timeline from "@/components/Timeline/Timeline";
import Botao from "@/components/ui/Botao/Botao";
import Secao from "@/components/ui/Secao/Secao";
import styles from "./page.module.css";
import { metadadosDaPagina } from "@/lib/metadados";

/* SEO da página: metadados completos (lib/metadados.js). O layout completa o título → "Experiência Acadêmica — Vanessa Lima") */
export const metadata = metadadosDaPagina({
  titulo: "Experiência Acadêmica",
  descricao:
    "Formação de Vanessa Lima: Sistemas para Internet na UNICAP, duas residências no Porto Digital e 90+ certificações.",
  caminho: "/experiencia-academica",
});

/* ---------- 3. Certificações ---------- */
function Certificacoes() {
  const { total, destaques, linkTodas } = CERTIFICACOES;
  return (
    <Secao
      id="certificacoes"
      rotulo="Estudo contínuo"
      titulo="Certificações"
      descricao={`São ${total} certificações em cursos de tecnologia e design. Estas são as que eu destaco: clique para ampliar ou em Verificar para conferir na página oficial. A lista completa está no LinkedIn.`}
    >
      {/* Miniaturas que ampliam ao clicar + link oficial de validação.
          O LinkedIn fica na barra de cima, junto do Pausar. */}
      <Certificados
        itens={destaques}
        acoes={
          <Botao href={linkTodas} seta>
            Ver todas no LinkedIn
          </Botao>
        }
      />

      <div className={styles.acoes}>
        <Botao href="/experiencia-profissional" variante="secundario" seta>
          Experiência profissional
        </Botao>
      </div>
    </Secao>
  );
}

export default function PaginaExperienciaAcademica() {
  return (
    <>
      <CabecalhoPagina
        id="academica"
        rotulo="Formação"
        titulo="Experiência Acadêmica"
        descricao="Minha formação em tecnologia: graduação na UNICAP, duas residências no Porto Digital e estudo contínuo em cursos e certificações."
        numeros={RESUMO_ACADEMICO}
      />

      <Secao
        id="trajetoria"
        rotulo="Linha do tempo"
        titulo="Trajetória"
        descricao="Do mais recente para o mais antigo."
      >
        <Timeline itens={FORMACAO} rotulo="Formação acadêmica" />
      </Secao>

      <Certificacoes />
    </>
  );
}
