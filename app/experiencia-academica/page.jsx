/* =========================================================
   app/experiencia-academica/page.jsx — página EXPERIÊNCIA ACADÊMICA
   (endereço /experiencia-academica)
   ---------------------------------------------------------
   Seções, de cima para baixo:
   1. Cabeçalho: título (h1), descrição e números (3º, 2026.1, 87+)
   2. Trajetória: linha do tempo (UNICAP e residência)
   3. Certificações: destaques em cartões + link para todas
   Server Component: a página inteira chega pronta em HTML.
   Todos os textos vêm de data/experiencias.js.
   ========================================================= */
import { CERTIFICACOES, FORMACAO, RESUMO_ACADEMICO } from "@/data/experiencias";
import { temValor } from "@/lib/experiencias";
import CabecalhoPagina from "@/components/CabecalhoPagina/CabecalhoPagina";
import Timeline from "@/components/Timeline/Timeline";
import Botao from "@/components/ui/Botao/Botao";
import Card from "@/components/ui/Card/Card";
import Secao from "@/components/ui/Secao/Secao";
import styles from "./page.module.css";

/* SEO da página (o layout completa o título → "Experiência Acadêmica — Vanessa Lima") */
export const metadata = {
  title: "Experiência Acadêmica",
  description:
    "Formação de Vanessa Lima: Sistemas para Internet na UNICAP, Residência Tecnológica no Porto Digital e 87+ certificações.",
  alternates: { canonical: "/experiencia-academica" },
  openGraph: { title: "Experiência Acadêmica — Vanessa Lima", url: "/experiencia-academica" },
};

/* ---------- 3. Certificações ---------- */
function Certificacoes() {
  const { total, destaques, linkTodas } = CERTIFICACOES;
  return (
    <Secao
      id="certificacoes"
      rotulo="Estudo contínuo"
      titulo="Certificações"
      descricao={`São ${total} certificações em cursos de tecnologia e design. Estas são as formações em destaque; a lista completa está no LinkedIn.`}
    >
      <ul className={styles.grade}>
        {destaques.map(({ id, instituicao, titulo, ano }) => (
          <li key={id}>
            {/* O ano só aparece quando estiver preenchido */}
            <Card
              rotulo={temValor(ano) ? `${instituicao} · ${ano}` : instituicao}
              titulo={titulo}
              descricao="Formação concluída"
            />
          </li>
        ))}
      </ul>

      <div className={styles.acoes}>
        <Botao href={linkTodas} seta>
          Ver todas no LinkedIn
        </Botao>
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
        descricao="Minha formação em tecnologia: graduação na UNICAP, residência no Porto Digital e estudo contínuo em cursos e certificações."
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
