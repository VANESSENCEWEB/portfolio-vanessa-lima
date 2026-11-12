/* =========================================================
   Botao — botão OU link com cara de botão
   ---------------------------------------------------------
   Um componente, três comportamentos (decididos pelas props):
   1. Sem href            → <button> (ação na mesma página)
   2. href interno "/..." → <Link> do Next (troca de página sem recarregar)
   3. href externo/mailto → <a> comum; externo abre em nova aba
      com rel="noopener noreferrer" (SEGURANÇA, sempre)
   Por que não usar <button> para tudo? Quem LEVA a outro lugar
   é link; quem FAZ algo é botão. O leitor de tela anuncia cada
   um de um jeito e o teclado também funciona diferente.
   Props:
   - variante: "primario" (vermelho) | "secundario" (contorno) | "fantasma" (só texto)
   - tamanho: "medio" (padrão) | "grande"
   - seta: true mostra "↗" (externo) ou "→" (interno)
   - type: "button" (padrão) | "submit" — só para <button>
   ========================================================= */
import Link from "next/link";
import { juntarClasses } from "@/lib/classes";
import styles from "./Botao.module.css";

// Link externo = começa com http:// ou https://
export function ehExterno(href = "") {
  return /^https?:\/\//i.test(href);
}

export default function Botao({
  href,
  children,
  variante = "primario",
  tamanho = "medio",
  seta = false,
  type = "button",
  className,
  ...resto
}) {
  const classes = juntarClasses(styles.botao, styles[variante], styles[tamanho], className);
  const externo = ehExterno(href);

  // Conteúdo igual nos três casos: texto + seta (decorativa)
  const conteudo = (
    <>
      <span className={styles.texto}>{children}</span>
      {seta && (
        <span className={styles.seta} aria-hidden="true">
          {externo ? "↗" : "→"}
        </span>
      )}
    </>
  );

  // 1. Botão de ação
  if (!href) {
    return (
      // o type vem da prop (padrão "button": não envia formulário sem querer)
      <button type={type} className={classes} {...resto}>
        {conteudo}
      </button>
    );
  }

  // 3. Link externo: nova aba + segurança + aviso para leitor de tela
  if (externo) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes} {...resto}>
        {conteudo}
        <span className="so-leitor"> (abre em nova aba)</span>
      </a>
    );
  }

  // mailto:, tel: e âncoras (#) também são <a> comuns, sem nova aba
  if (!href.startsWith("/")) {
    return (
      <a href={href} className={classes} {...resto}>
        {conteudo}
      </a>
    );
  }

  // 2. Link interno do site
  return (
    <Link href={href} className={classes} {...resto}>
      {conteudo}
    </Link>
  );
}
