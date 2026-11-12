/* =========================================================
   Card — cartão de projeto, experiência ou certificação
   ---------------------------------------------------------
   Estrutura: rótulo (opcional) → título → descrição → tags.
   Com href, o cartão INTEIRO fica clicável, mas só existe
   UM link (no título). Truque: o ::after do link se estica
   por cima do cartão todo (ver Card.module.css). Assim o
   leitor de tela ouve um link só, com o nome do projeto,
   em vez de "link, link, link".
   Props:
   - titulo (obrigatório), descricao, rotulo
   - tags: lista de textos → viram <Tag>
   - href: para onde o cartão leva (interno "/..." ou externo "https://...")
   - nivelTitulo: 2 a 6 (padrão 3, porque o card fica dentro de uma seção com h2)
   - children: conteúdo extra no fim (ex.: botões)
   ========================================================= */
import Link from "next/link";
import { juntarClasses } from "@/lib/classes";
import Tag from "@/components/ui/Tag/Tag";
import { ehExterno } from "@/components/ui/Botao/Botao";
import styles from "./Card.module.css";

/* O link do título (interno ou externo) */
function LinkDoTitulo({ href, children }) {
  if (ehExterno(href)) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={styles.link}>
        {children}
        <span className="so-leitor"> (abre em nova aba)</span>
      </a>
    );
  }
  return (
    <Link href={href} className={styles.link}>
      {children}
    </Link>
  );
}

export default function Card({
  titulo,
  descricao,
  rotulo,
  tags = [],
  href,
  nivelTitulo = 3,
  className,
  children,
}) {
  const Titulo = `h${Math.min(Math.max(nivelTitulo, 2), 6)}`;

  return (
    <article className={juntarClasses(styles.card, href && styles.clicavel, className)}>
      {rotulo && <p className="rotulo rotulo--suave">{rotulo}</p>}

      <Titulo className={styles.titulo}>
        {href ? <LinkDoTitulo href={href}>{titulo}</LinkDoTitulo> : titulo}
      </Titulo>

      {descricao && <p className={styles.descricao}>{descricao}</p>}

      {tags.length > 0 && (
        <ul className={styles.tags} aria-label="Tecnologias">
          {tags.map((tag) => (
            <li key={tag}>
              <Tag>{tag}</Tag>
            </li>
          ))}
        </ul>
      )}

      {children && <div className={styles.extra}>{children}</div>}

      {href && (
        <span className={styles.seta} aria-hidden="true">
          {ehExterno(href) ? "↗" : "→"}
        </span>
      )}
    </article>
  );
}
