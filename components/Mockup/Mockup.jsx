/* =========================================================
   Mockup — prints de um projeto numa janela de navegador
   (computador) com um celular por cima, no canto direito
   ---------------------------------------------------------
   A moldura é CSS, não imagem: se adapta ao tamanho do
   cartão e às cores do tema. Os prints vêm do script
   scripts/prints-projetos.mjs (npm run prints), listados
   em data/prints.json.
   Sem prints (projeto privado ou sem site), mostra a mesma
   moldura com o nome do projeto, para a grade ficar igual.
   Props:
   - titulo (obrigatório): nome do projeto (vai no alt)
   - prints: { computador, celular } ou nada
   - prioridade: true nos primeiros cartões (carrega antes)
   next/image: entrega AVIF/WebP no tamanho certo para cada
   tela, a partir do .jpg original.
   ========================================================= */
import Image from "next/image";
import styles from "./Mockup.module.css";

export default function Mockup({ titulo, prints, prioridade = false }) {
  const temPrints = Boolean(prints?.computador && prints?.celular);

  return (
    <div className={styles.cena}>
      <div className={styles.janela}>
        {/* As 3 bolinhas da janela: só enfeite */}
        <div className={styles.barra} aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <div className={styles.telaComputador}>
          {temPrints ? (
            <Image
              src={prints.computador}
              alt={`Tela de ${titulo} no computador`}
              fill
              sizes="(max-width: 760px) 90vw, 400px"
              priority={prioridade}
              className={styles.imagem}
            />
          ) : (
            <p className={styles.semPrint} aria-hidden="true">
              {titulo}
            </p>
          )}
        </div>
      </div>

      {temPrints && (
        <div className={styles.celular}>
          <div className={styles.telaCelular}>
            <Image
              src={prints.celular}
              alt={`Tela de ${titulo} no celular`}
              fill
              sizes="120px"
              priority={prioridade}
              className={styles.imagem}
            />
          </div>
        </div>
      )}
    </div>
  );
}
