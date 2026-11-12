/* =========================================================
   app/not-found.jsx — página 404 ("página não encontrada")
   ---------------------------------------------------------
   O Next mostra esta página sozinho quando alguém digita um
   endereço que não existe (ex.: /blog). Ela usa o mesmo
   layout (Navbar + Footer), então a pessoa não fica perdida.
   O Next já responde com o código 404 e avisa o Google para
   não indexar (meta robots noindex).
   ========================================================= */
import Botao from "@/components/ui/Botao/Botao";
import Container from "@/components/ui/Container/Container";
import styles from "./not-found.module.css";

export const metadata = {
  title: "Página não encontrada",
  description: "O endereço acessado não existe neste portfólio.",
};

export default function NaoEncontrada() {
  return (
    <Container as="section" className={styles.secao} aria-labelledby="titulo-404">
      {/* Número gigante decorativo (o título de verdade é o h1) */}
      <p className={styles.numero} aria-hidden="true">
        404
      </p>

      <p className="rotulo rotulo--destaque">Erro 404</p>
      <h1 id="titulo-404" className={styles.titulo}>
        Página não encontrada<span className={styles.ponto}>.</span>
      </h1>
      <p className={styles.texto}>
        O endereço que você abriu não existe ou mudou de lugar. Que tal voltar para o início ou ver meus
        projetos?
      </p>

      <div className={styles.acoes}>
        <Botao href="/" seta>
          Voltar para o início
        </Botao>
        <Botao href="/projetos" variante="secundario">
          Ver projetos
        </Botao>
      </div>
    </Container>
  );
}
