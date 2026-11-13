/* =========================================================
   Timeline — linha do tempo reutilizável
   ---------------------------------------------------------
   Usada nas páginas Experiência Acadêmica e Profissional, mas
   serve para qualquer lista de itens no formato descrito em
   data/experiencias.js ({ id, titulo, organizacao, inicio... }).
   HTML: <ol> (lista NUMERADA), porque a ordem importa: o leitor
   de tela anuncia "lista, 2 itens" e lê na sequência.
   Cada item é um <article> com o título em h3 (padrão).
   Campos vazios ou PREENCHER simplesmente não aparecem.
   Server Component: só HTML, nenhum JavaScript no navegador.
   Props:
   - itens (obrigatório): a lista
   - rotulo: nome da lista para o leitor de tela
   - nivelTitulo: 2 a 6 (padrão 3: a Timeline fica dentro de uma seção com h2)
   - mostrarPendentes: mostra os avisos ✏️ (padrão: só no npm run dev)
   ========================================================= */
import Botao from "@/components/ui/Botao/Botao";
import Tag from "@/components/ui/Tag/Tag";
import { juntarClasses } from "@/lib/classes";
import { camposPendentesDoItem, formatarPeriodo, MOSTRAR_PENDENTES, temValor } from "@/lib/experiencias";
import styles from "./Timeline.module.css";

// Nome bonito de cada campo no aviso ✏️ (o que não estiver aqui aparece como está)
const NOMES_DOS_CAMPOS = {
  inicio: "início",
  fim: "fim",
  cargo: "cargo",
  local: "local",
  descricao: "descrição",
};

/* Junta textos que existem com " · ". Ex.: ["Graduação", null, "Recife"] → "Graduação · Recife" */
function juntarComPonto(valores) {
  return valores.filter(temValor).join(" · ");
}

/* Uma lista simples de textos (destaques) ou de tags */
function ListaDeDestaques({ itens }) {
  const validos = itens.filter(temValor);
  if (validos.length === 0) return null;
  return (
    <ul className={styles.destaques}>
      {validos.map((texto) => (
        <li key={texto}>{texto}</li>
      ))}
    </ul>
  );
}

function ListaDeTags({ tags }) {
  const validas = tags.filter(temValor);
  if (validas.length === 0) return null;
  return (
    <ul className={styles.tags} aria-label="Ferramentas e habilidades">
      {validas.map((tag) => (
        <li key={tag}>
          <Tag>{tag}</Tag>
        </li>
      ))}
    </ul>
  );
}

/* Aviso ✏️ só para a Vanessa (no npm run dev): o que falta neste item */
function AvisoPendente({ campos }) {
  if (campos.length === 0) return null;
  const nomes = campos.map((campo) => NOMES_DOS_CAMPOS[campo] ?? campo).join(", ");
  return (
    <p className={styles.pendente}>
      <span aria-hidden="true">✏️ </span>Falta preencher em data/experiencias.js: {nomes}
    </p>
  );
}

/* ---------- Um item da linha do tempo ---------- */
function ItemTimeline({ item, Titulo, mostrarPendentes }) {
  const { id, titulo, cargo, organizacao, tipo, detalhe, local, descricao, emAndamento } = item;
  const { destaques = [], tags = [], links = [] } = item;
  const periodo = formatarPeriodo(item);
  const idTitulo = `${id}-titulo`;
  // Ex.: "Coordenação e design · Residência Tecnológica · Porto Digital"
  const subtitulo = juntarComPonto([cargo, organizacao]);
  // Ex.: "Graduação · 3º período · Recife, PE"
  const informacoes = juntarComPonto([tipo, detalhe, local]);

  return (
    <li className={styles.item}>
      {/* Bolinha na linha vertical: só enfeite */}
      <span className={styles.marcador} aria-hidden="true" />

      <article className={styles.conteudo} aria-labelledby={idTitulo}>
        <div className={styles.quando}>
          {periodo && <p className="rotulo rotulo--destaque">{periodo}</p>}
          {emAndamento && <Tag variante="destaque">Em andamento</Tag>}
        </div>

        <div className={styles.corpo}>
          <Titulo id={idTitulo} className={styles.titulo}>
            {titulo}
          </Titulo>

          {subtitulo && <p className={styles.organizacao}>{subtitulo}</p>}
          {informacoes && <p className="rotulo rotulo--suave">{informacoes}</p>}

          {temValor(descricao) && <p className={styles.descricao}>{descricao}</p>}
          <ListaDeDestaques itens={destaques} />
          <ListaDeTags tags={tags} />

          {links.length > 0 && (
            <div className={styles.links}>
              {links.map((link) => (
                // Botao já cuida da segurança: externo abre em nova aba com rel="noopener noreferrer"
                <Botao key={link.href} href={link.href} variante="fantasma" seta>
                  {link.texto}
                </Botao>
              ))}
            </div>
          )}

          {mostrarPendentes && <AvisoPendente campos={camposPendentesDoItem(item)} />}
        </div>
      </article>
    </li>
  );
}

/* ---------- A linha do tempo inteira ---------- */
export default function Timeline({
  itens = [],
  rotulo,
  nivelTitulo = 3,
  mostrarPendentes = MOSTRAR_PENDENTES,
  className,
}) {
  if (itens.length === 0) return null; // nada para mostrar: não desenha uma lista vazia

  const Titulo = `h${Math.min(Math.max(nivelTitulo, 2), 6)}`;

  return (
    <ol className={juntarClasses(styles.timeline, className)} aria-label={rotulo}>
      {itens.map((item) => (
        <ItemTimeline key={item.id} item={item} Titulo={Titulo} mostrarPendentes={mostrarPendentes} />
      ))}
    </ol>
  );
}
