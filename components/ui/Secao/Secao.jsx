/* =========================================================
   Secao — bloco de conteúdo de uma página
   ---------------------------------------------------------
   Junta as três peças que toda seção do site usa:
   <section> + <Container> + <TituloSecao>.
   Acessibilidade: com id e titulo, a <section> ganha
   aria-labelledby apontando para o título. Assim o leitor de
   tela anuncia "região: Projetos em destaque", por exemplo.
   Props:
   - id: âncora da seção (ex.: "projetos" → /#projetos)
   - titulo, rotulo, descricao, nivel: repassados ao TituloSecao
   - largura: repassada ao Container
   - linha: true (padrão) desenha a linha fina no topo
   ========================================================= */
import { juntarClasses } from "@/lib/classes";
import Container from "@/components/ui/Container/Container";
import TituloSecao from "@/components/ui/TituloSecao/TituloSecao";
import styles from "./Secao.module.css";

export default function Secao({
  id,
  titulo,
  rotulo,
  descricao,
  nivel = 2,
  largura = "normal",
  linha = true,
  className,
  children,
}) {
  // Só dá para ligar a seção ao título se os dois existirem
  const idTitulo = id && titulo ? `${id}-titulo` : undefined;

  return (
    <section
      id={id}
      aria-labelledby={idTitulo}
      className={juntarClasses(styles.secao, linha && styles.comLinha, className)}
    >
      <Container largura={largura}>
        {titulo && (
          <TituloSecao id={idTitulo} rotulo={rotulo} descricao={descricao} nivel={nivel}>
            {titulo}
          </TituloSecao>
        )}
        {children}
      </Container>
    </section>
  );
}
