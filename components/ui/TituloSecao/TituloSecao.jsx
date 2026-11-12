/* =========================================================
   TituloSecao — título no estilo editorial do site
   ---------------------------------------------------------
   Rótulo pequeno em caixa alta + título grande em Anton
   maiúsculo com o PONTO FINAL vermelho + descrição opcional.
   Props:
   - children: o texto do título
   - rotulo: texto pequeno acima (opcional)
   - descricao: parágrafo abaixo (opcional)
   - nivel: 1 a 6 → vira <h1>...<h6> (padrão 2)
     Regra de acessibilidade/SEO: UM <h1> por página e os
     níveis em ordem (h1 → h2 → h3), sem pular.
   - tamanho: "grande" (padrão) | "medio"
   - id: usado pela <Secao> para ligar a seção ao título
   ========================================================= */
import { juntarClasses } from "@/lib/classes";
import styles from "./TituloSecao.module.css";

// Garante um nível válido (1 a 6), mesmo se vier algo estranho
function nivelValido(nivel) {
  const numero = Math.round(Number(nivel));
  return Math.min(Math.max(Number.isFinite(numero) ? numero : 2, 1), 6);
}

export default function TituloSecao({
  children,
  rotulo,
  descricao,
  nivel = 2,
  tamanho = "grande",
  id,
  className,
}) {
  const Titulo = `h${nivelValido(nivel)}`; // ex.: "h2"

  return (
    <div className={juntarClasses(styles.cabecalho, className)}>
      {rotulo && <p className="rotulo rotulo--destaque">{rotulo}</p>}
      <Titulo id={id} className={juntarClasses(styles.titulo, styles[tamanho])}>
        {children}
        {/* O ponto é só enfeite: aria-hidden para o leitor de tela não ler "ponto" */}
        <span className={styles.ponto} aria-hidden="true">
          .
        </span>
      </Titulo>
      {descricao && <p className={styles.descricao}>{descricao}</p>}
    </div>
  );
}
