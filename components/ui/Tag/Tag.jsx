/* =========================================================
   Tag — etiqueta pequena (tecnologia, categoria, status)
   ---------------------------------------------------------
   Ex.: <Tag>React</Tag>  ·  <Tag variante="destaque">Novo</Tag>
   É só texto (não é clicável). Para uma lista de tags, use
   dentro de <ul>/<li> (o Card já faz isso).
   ========================================================= */
import { juntarClasses } from "@/lib/classes";
import styles from "./Tag.module.css";

export default function Tag({ children, variante = "padrao", className }) {
  return <span className={juntarClasses(styles.tag, styles[variante], className)}>{children}</span>;
}
