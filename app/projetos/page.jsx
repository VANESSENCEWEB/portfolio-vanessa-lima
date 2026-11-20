/* =========================================================
   app/projetos/page.jsx — página PROJETOS (endereço /projetos)
   ---------------------------------------------------------
   Seções, de cima para baixo:
   1. Cabeçalho: título (h1) e descrição
   2. Em destaque: projetos escolhidos à mão (data/projetos.js)
   3. No GitHub: repositórios públicos buscados na API do
      GitHub (lib/github.js), do mais recente para o mais antigo
   Cada cartão mostra os prints do projeto (computador +
   celular) com o componente Mockup. Os prints são gerados
   com npm run prints e listados em data/prints.json.
   Server Component: a busca acontece no SERVIDOR, com cache.
   O navegador recebe o HTML pronto, sem esperar a API.
   ========================================================= */
import { DESTAQUES, GITHUB } from "@/data/projetos";
import PRINTS from "@/data/prints.json";
import { buscarRepositorios } from "@/lib/github";
import CabecalhoPagina from "@/components/CabecalhoPagina/CabecalhoPagina";
import Mockup from "@/components/Mockup/Mockup";
import AcoesProjeto from "@/components/AcoesProjeto/AcoesProjeto";
import Botao from "@/components/ui/Botao/Botao";
import Card from "@/components/ui/Card/Card";
import Secao from "@/components/ui/Secao/Secao";
import styles from "./page.module.css";
import { metadadosDaPagina } from "@/lib/metadados";

/* SEO da página: metadados completos (lib/metadados.js). O layout completa o título → "Projetos — Vanessa Lima") */
export const metadata = metadadosDaPagina({
  titulo: "Projetos",
  descricao:
    "Projetos de Vanessa Lima: ISAC Conecta, Sistema Recife Flats, API REST, NASA Explorer e os repositórios públicos do GitHub.",
  caminho: "/projetos",
});

/* ---------- 2. Em destaque ---------- */
function Destaques() {
  return (
    <Secao
      id="destaques"
      rotulo="Escolhidos"
      titulo="Em destaque"
      descricao="Os projetos que mais mostram o que eu sei fazer, com o contexto de cada um."
    >
      <ul className={styles.grade}>
        {DESTAQUES.map(({ id, titulo, contexto, descricao, tags, site, codigo, nota }, i) => (
          <li key={id}>
            {/* Os links ficam nos botões do fim do cartão (AcoesProjeto) */}
            <Card
              titulo={titulo}
              rotulo={contexto}
              descricao={descricao}
              tags={tags}
              midia={<Mockup titulo={titulo} prints={PRINTS[id]} prioridade={i < 2} />}
            >
              <AcoesProjeto titulo={titulo} site={site} codigo={codigo} nota={nota} />
            </Card>
          </li>
        ))}
      </ul>
    </Secao>
  );
}

/* ---------- 3. No GitHub (API) ----------
   async: espera a busca (que vem do cache na maioria das vezes). */
async function RepositoriosDoGitHub() {
  const { repositorios, erro } = await buscarRepositorios(GITHUB.usuario, {
    excluir: GITHUB.excluir,
    limite: GITHUB.limite,
    exigirDescricao: GITHUB.exigirDescricao,
  });

  return (
    <Secao
      id="github"
      rotulo="API do GitHub"
      titulo="Outros repositórios"
      descricao="Lista automática dos meus repositórios públicos, do mais recente para o mais antigo."
    >
      {erro || repositorios.length === 0 ? (
        <p className={styles.aviso}>
          Não consegui carregar a lista agora. Os projetos estão todos no meu perfil do GitHub.
        </p>
      ) : (
        <ul className={styles.grade}>
          {repositorios.map(({ id, chave, nome, descricao, linguagem, codigo, site, atualizadoEm }) => (
            <li key={id}>
              <Card
                titulo={nome}
                rotulo={atualizadoEm ? `Atualizado em ${atualizadoEm}` : undefined}
                descricao={descricao || "Sem descrição no GitHub."}
                tags={linguagem ? [linguagem] : []}
                midia={<Mockup titulo={nome} prints={PRINTS[chave]} />}
              >
                <AcoesProjeto titulo={nome} site={site} codigo={codigo} />
              </Card>
            </li>
          ))}
        </ul>
      )}

      <div className={styles.acoes}>
        <Botao href={GITHUB.perfil} seta>
          Ver todos no GitHub
        </Botao>
        <Botao href="/experiencia-profissional" variante="secundario" seta>
          Experiência profissional
        </Botao>
      </div>
    </Secao>
  );
}

export default function PaginaProjetos() {
  return (
    <>
      <CabecalhoPagina
        id="projetos"
        rotulo="Portfólio"
        titulo="Projetos"
        descricao="Do sistema interno de uma empresa de hospedagem aos trabalhos da faculdade e da residência: o problema, o que eu fiz e as tecnologias de cada um."
        numeros={[
          { valor: String(DESTAQUES.length), rotulo: "projetos em destaque" },
          { valor: "250+", rotulo: "testes no ISAC Conecta" },
          { valor: "40", rotulo: "telas no Sistema Recife Flats" },
        ]}
      />

      <Destaques />
      <RepositoriosDoGitHub />
    </>
  );
}
