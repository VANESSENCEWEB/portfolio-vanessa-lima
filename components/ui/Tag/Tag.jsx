/* =========================================================
   Tag — etiqueta pequena (tecnologia, categoria, status)
   ---------------------------------------------------------
   Ex.: <Tag>React</Tag>  ·  <Tag variante="destaque">Novo</Tag>
   É só texto (não é clicável). Para uma lista de tags, use
   dentro de <ul>/<li> (o Card já faz isso).
   Cor por área: se o texto for uma tecnologia conhecida
   (lib/tecnologias.js), a Tag ganha uma bolinha e a borda na
   cor da família, sozinha. "React" → azul, "Node.js" → verde.
   A cor é só enfeite: o texto continua na cor de sempre (boa
   leitura) e o nome da tecnologia já diz tudo.
   Props:
   - variante: "padrao" | "destaque" (destaque não ganha cor de família)
   - familia: 1 a 5 para forçar uma cor; false para desligar
   ========================================================= */
import { juntarClasses } from "@/lib/classes";
import { familiaDe } from "@/lib/tecnologias";
import styles from "./Tag.module.css";

export default function Tag({ children, variante = "padrao", familia, className }) {
  const familiaFinal =
    familia === false || variante !== "padrao"
      ? null
      : (familia ?? (typeof children === "string" ? familiaDe(children) : null));

  return (
    <span
      className={juntarClasses(styles.tag, styles[variante], className)}
      data-familia={familiaFinal ?? undefined}
    >
      {children}
    </span>
  );
}
