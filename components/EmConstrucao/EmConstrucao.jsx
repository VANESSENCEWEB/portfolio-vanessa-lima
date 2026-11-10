/* =========================================================
   EmConstrucao — página provisória
   ---------------------------------------------------------
   Usada pelas páginas que ainda vamos construir, para que os
   links do menu nunca levem a um erro 404 ("página não existe").
   Quando fizermos a página de verdade, é só trocar o conteúdo
   do page.jsx dela.
   Recebe uma "prop" (informação de fora): o título da página.
   ========================================================= */
import Link from "next/link";
import styles from "./EmConstrucao.module.css";

export default function EmConstrucao({ titulo }) {
  return (
    <section className={styles.secao}>
      <p className="rotulo rotulo--destaque">Em construção</p>
      <h1 className={styles.titulo}>
        {titulo}
        <span className={styles.ponto}>.</span>
      </h1>
      <p className={styles.texto}>Esta página está sendo desenvolvida. Volte em breve!</p>
      <Link href="/" className={styles.voltar}>
        ← Voltar para o início
      </Link>
    </section>
  );
}
