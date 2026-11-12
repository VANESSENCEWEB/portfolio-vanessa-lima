/* =========================================================
   ListaTecnologias — tecnologias agrupadas, com o papel de cada uma
   ---------------------------------------------------------
   Usada na página Sobre ("Tecnologias e módulos usados neste
   app"), mas serve para qualquer lista no mesmo formato:
   [{ grupo, descricao, itens: [{ nome, papel, pacote? }] }]
   Cada grupo vira um bloco com título (h3) e uma lista.
   Se o item tiver "pacote", a versão vem do package.json.
   Server Component: só HTML, nenhum JavaScript no navegador.
   ========================================================= */
import Tag from "@/components/ui/Tag/Tag";
import { versaoDe } from "@/data/sobre";
import styles from "./ListaTecnologias.module.css";

/* Transforma o nome do grupo num id seguro para o HTML.
   Ex.: "Módulos do Next.js" → "grupo-modulos-do-next-js" */
export function idDoGrupo(grupo) {
  const limpo = grupo
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "") // tira os acentos
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return `grupo-${limpo}`;
}

/* Um item da lista: nome, versão (se houver) e papel */
function Item({ nome, papel, pacote }) {
  const versao = pacote ? versaoDe(pacote) : null;
  return (
    <li className={styles.item}>
      <div className={styles.topo}>
        <span className={styles.nome}>{nome}</span>
        {versao && (
          <Tag className={styles.versao}>
            <span className="so-leitor">versão </span>
            {versao}
          </Tag>
        )}
      </div>
      <p className={styles.papel}>{papel}</p>
    </li>
  );
}

export default function ListaTecnologias({ grupos }) {
  return (
    <div className={styles.grade}>
      {grupos.map(({ grupo, descricao, itens }) => {
        const id = idDoGrupo(grupo);
        return (
          // aria-labelledby: o leitor de tela anuncia o nome do grupo
          <section key={grupo} className={styles.grupo} aria-labelledby={id}>
            <h3 id={id} className={styles.titulo}>
              {grupo}
              {/* Quantidade de itens: só visual (o leitor de tela já conta os itens da lista) */}
              <span className={styles.contador} aria-hidden="true">
                {String(itens.length).padStart(2, "0")}
              </span>
            </h3>
            {descricao && <p className={styles.descricao}>{descricao}</p>}
            <ul className={styles.lista}>
              {itens.map((item) => (
                <Item key={item.nome} {...item} />
              ))}
            </ul>
          </section>
        );
      })}
    </div>
  );
}
