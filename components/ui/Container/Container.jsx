/* =========================================================
   Container — limita a largura do conteúdo e centraliza
   ---------------------------------------------------------
   Em telas grandes o texto não "espalha" de ponta a ponta;
   no celular ele ocupa a tela toda, com a --margem nas laterais.
   Props:
   - largura: "estreita" (textos) | "normal" (padrão) | "larga"
   - as: a tag HTML usada (padrão "div"). Ex.: as="header"
   - ...resto: qualquer outro atributo (id, aria-label...)
   ========================================================= */
import { juntarClasses } from "@/lib/classes";
import styles from "./Container.module.css";

export default function Container({ as: Tag = "div", largura = "normal", className, children, ...resto }) {
  return (
    <Tag className={juntarClasses(styles.container, styles[largura], className)} {...resto}>
      {children}
    </Tag>
  );
}
