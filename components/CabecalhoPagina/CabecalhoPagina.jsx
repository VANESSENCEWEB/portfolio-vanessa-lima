/* =========================================================
   CabecalhoPagina — o topo de uma página interna
   ---------------------------------------------------------
   Rótulo + título h1 (o ÚNICO da página) + descrição e,
   se quiser, uma faixa de números ("87+ certificações").
   Usado nas páginas de experiência; o mesmo visual da Sobre.
   Props:
   - id (obrigatório): base do id do título (aria-labelledby)
   - titulo, rotulo, descricao
   - numeros: [{ valor: "87+", rotulo: "certificações" }] (opcional)
   ========================================================= */
import Container from "@/components/ui/Container/Container";
import TituloSecao from "@/components/ui/TituloSecao/TituloSecao";
import styles from "./CabecalhoPagina.module.css";

export default function CabecalhoPagina({ id, titulo, rotulo, descricao, numeros = [] }) {
  const idTitulo = `${id}-titulo`;

  return (
    <Container as="section" className={styles.cabecalho} aria-labelledby={idTitulo}>
      <TituloSecao id={idTitulo} nivel={1} rotulo={rotulo} descricao={descricao}>
        {titulo}
      </TituloSecao>

      {/* <dl>: pares "termo → valor". O leitor de tela lê "certificações, 87+";
          na tela o CSS mostra o número grande em cima. */}
      {numeros.length > 0 && (
        <dl className={styles.numeros}>
          {numeros.map(({ valor, rotulo: legenda }) => (
            <div key={legenda} className={styles.numero}>
              <dt className="rotulo rotulo--suave">{legenda}</dt>
              <dd className={styles.valor}>{valor}</dd>
            </div>
          ))}
        </dl>
      )}
    </Container>
  );
}
