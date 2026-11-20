/* =========================================================
   Hero — a primeira tela da página Início
   ---------------------------------------------------------
   Três colunas no computador:
     ["Olá, eu sou", NOME, texto e botões]  [você]  [PORTFÓLIO na vertical]
   e, embaixo, uma linha com números, "disponível para estágio" e local.
   Tudo cabe numa tela, alinhado com o menu (mesmo --margem).
   No celular tudo empilha.
   Efeito protagonista: SÓ no nome. As letras sobem uma a uma,
   girando de leve, e o ponto vermelho cai por último e quica.
   É CSS puro: cada letra recebe o seu número (--i) e espera a
   sua vez. A foto/vídeo não tem efeito.
   Transição para a próxima seção: ver .hero e .palco abaixo e
   .folha no app/page.module.css (a hero fica parada e a seção
   seguinte sobe por cima, como uma folha).
   Server Component: só a HeroMidia (vídeo + pausar) roda no
   navegador. Todos os textos vêm de data/home.js.
   ========================================================= */
import Link from "next/link";
import { HERO } from "@/data/home";
import HeroMidia from "./HeroMidia";
import styles from "./Hero.module.css";

/* Atraso da animação de entrada, em segundos */
const atraso = (segundos) => ({ "--atraso": `${segundos}s` });

/* O nome, letra por letra. O leitor de tela lê o texto inteiro
   (span escondido); as letras animadas são só visuais. */
function NomeAnimado() {
  let i = 0;
  return (
    <span className={styles.nome}>
      <span className={styles.soLeitor}>{HERO.nome}</span>
      <span aria-hidden="true">
        {HERO.nome.split(" ").map((palavra, p, todas) => (
          <span key={palavra} className={styles.linha}>
            {Array.from(palavra).map((letra) => (
              <span key={i} className={styles.letra} style={{ "--i": i++ }}>
                {letra}
              </span>
            ))}
            {p === todas.length - 1 && (
              <span className={styles.ponto} style={{ "--i": i }}>
                .
              </span>
            )}
          </span>
        ))}
      </span>
    </span>
  );
}

export default function Hero() {
  return (
    <section className={styles.hero} aria-label="Apresentação">
      <div className={styles.palco}>
        <div className={styles.texto}>
          <h1 className={styles.titulo}>
            <span className={`${styles.ola} ${styles.anima}`} style={atraso(0.1)}>
              {HERO.saudacao} {/* aria-hidden: o leitor de tela lê só "Olá, eu sou Vanessa Lima" */}
              <span className={styles.aceno} aria-hidden="true">
                👋
              </span>
            </span>
            <NomeAnimado />
          </h1>

          <p className={`${styles.cargo} ${styles.anima}`} style={atraso(0.75)}>
            {HERO.cargo[0]}
            <br />
            {HERO.cargo[1]}
          </p>

          <p className={`${styles.descricao} ${styles.anima}`} style={atraso(0.85)}>
            {HERO.descricao}
          </p>

          <div className={`${styles.acoes} ${styles.anima}`} style={atraso(0.95)}>
            <Link href={HERO.botao.href} className={styles.botao}>
              {HERO.botao.texto}
              <span className={styles.botaoSeta} aria-hidden="true">
                ↓
              </span>
            </Link>
            <Link href={HERO.caso.href} className={styles.caso}>
              {HERO.caso.texto}
              <span className={styles.casoSeta} aria-hidden="true">
                →
              </span>
            </Link>
          </div>
        </div>

        <HeroMidia />

        {/* Só enfeite: o leitor de tela não lê */}
        <p className={`${styles.palavra} ${styles.anima}`} style={atraso(0.5)} aria-hidden="true">
          {HERO.palavra}
        </p>

        <ul className={`${styles.numeros} ${styles.anima}`} style={atraso(1.05)}>
          {HERO.numeros.map(({ valor, sufixo, legenda }) => (
            <li key={legenda} className={styles.numero}>
              <strong>
                {valor}
                {sufixo && <sup>{sufixo}</sup>}
              </strong>
              <span className="rotulo rotulo--suave">{legenda}</span>
            </li>
          ))}
          <li className={`rotulo ${styles.extra}`}>
            <span className="online" aria-hidden="true" />
            {HERO.disponivel}
          </li>
          <li className={`rotulo rotulo--suave ${styles.extra}`}>
            <span aria-hidden="true" className={styles.alvo}>
              ⌖
            </span>
            {HERO.local}
          </li>
        </ul>
      </div>
    </section>
  );
}
