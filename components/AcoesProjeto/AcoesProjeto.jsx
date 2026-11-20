/* =========================================================
   AcoesProjeto — botões no fim do cartão de cada projeto
   ---------------------------------------------------------
   "Ver online" (vermelho) leva ao site no ar; "Ver código" leva
   ao repositório (o Botao já o pinta na cor do GitHub, com o ícone).
   Aparece só o que o projeto tem; sem os dois, mostra só a nota.
   Responsivo sem media query: os botões dividem a largura do
   cartão (flex: 1) e, quando o cartão fica estreito, um desce
   para baixo do outro (flex-wrap). Altura mínima de 44px para o
   toque no celular.
   Acessibilidade: o texto visível é igual em todos os cartões,
   então um trecho escondido completa com o nome do projeto
   ("Ver online: NASA Explorer"). Assim a lista de links do
   leitor de tela não fica com vários "Ver online" iguais.
   ========================================================= */
import Botao from "@/components/ui/Botao/Botao";
import styles from "./AcoesProjeto.module.css";

export default function AcoesProjeto({ titulo, site, codigo, nota }) {
  if (!site && !codigo && !nota) return null;

  return (
    <div className={styles.acoes}>
      {(site || codigo) && (
        <div className={styles.botoes}>
          {site && (
            <Botao href={site} seta className={styles.botao}>
              Ver online<span className="so-leitor">: {titulo}</span>
            </Botao>
          )}
          {codigo && (
            <Botao href={codigo} variante="secundario" className={styles.botao}>
              Ver código<span className="so-leitor">: {titulo} no GitHub</span>
            </Botao>
          )}
        </div>
      )}
      {nota && <p className={styles.nota}>{nota}</p>}
    </div>
  );
}
