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
import Botao from "@/components/ui/Botao/Botao";
import Card from "@/components/ui/Card/Card";
import Secao from "@/components/ui/Secao/Secao";
import styles from "./page.module.css";

/* SEO da página (o layout completa o título → "Projetos — Vanessa Lima") */
export const metadata = {
  title: "Projetos",
  description:
    "Projetos de Vanessa Lima: ISAC Conecta, Sistema Recife Flats, API REST, NASA Explorer e os repositórios públicos do GitHub.",
  alternates: { canonical: "/projetos" },
  openGraph: { title: "Projetos — Vanessa Lima", url: "/projetos" },
};

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
            {/* O cartão leva ao site; sem site, leva ao código; sem os dois, não é link */}
            <Card
              titulo={titulo}
              rotulo={contexto}
              descricao={descricao}
              tags={tags}
              href={site || codigo || undefined}
              midia={<Mockup titulo={titulo} prints={PRINTS[id]} prioridade={i < 2} />}
            >
              {site && codigo && (
                <Botao href={codigo} variante="fantasma" seta>
                  Ver o código de {titulo}
                </Botao>
              )}
              {nota && <p className={styles.nota}>{nota}</p>}
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
                href={codigo}
                midia={<Mockup titulo={nome} prints={PRINTS[chave]} />}
              >
                {site && (
                  <Botao href={site} variante="fantasma" seta>
                    Ver {nome} no ar
                  </Botao>
                )}
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
          { valor: "100+", rotulo: "testes no ISAC Conecta" },
          { valor: "40", rotulo: "telas no Sistema Recife Flats" },
        ]}
      />

      <Destaques />
      <RepositoriosDoGitHub />
    </>
  );
}
