/* =========================================================
   Hero — a primeira tela da página Início
   ---------------------------------------------------------
   Trazida do portfólio anterior (React + Vite) para o Next.
   Grade de 3 colunas no computador:
     [texto e botão]  [você + PORTFÓLIO atrás]  [frase e números]
   No celular tudo empilha: rótulos → você → texto → números.
   Server Component: chega pronta em HTML. Só duas partes
   rodam no navegador: HeroMidia (vídeo + pausar) e Contador.
   Animações de entrada: classe .anima + --atraso (CSS puro).
   A palavra gigante aparece letra por letra também só com
   CSS: cada letra recebe o seu número (--i) e espera a sua vez.
   Todos os textos vêm de data/home.js.
   ========================================================= */
import Link from "next/link";
import { HERO } from "@/data/home";
import Contador from "./Contador";
import HeroMidia from "./HeroMidia";
import styles from "./Hero.module.css";

/* Atraso da animação de entrada, em segundos */
const atraso = (segundos) => ({ "--atraso": `${segundos}s` });

/* "PORTFÓLIO" gigante atrás da foto (só enfeite: aria-hidden) */
function PalavraGigante() {
  const letras = Array.from(HERO.palavraGigante);
  return (
    <p className={styles.palavra} aria-hidden="true">
      {letras.map((letra, i) => (
        <span key={i} className={styles.letra} style={{ "--i": i }}>
          {letra}
        </span>
      ))}
    </p>
  );
}

function Esquerda() {
  return (
    <div className={styles.esquerda}>
      <h1 className={`${styles.nome} ${styles.anima}`} style={atraso(0.5)}>
        <span className={styles.ola}>
          {HERO.saudacao}{" "}
          <span className={styles.aceno} role="img" aria-label="mão acenando">
            👋
          </span>
        </span>
        <span className={styles.nomeBrilho}>{HERO.nome}</span>
        <span className={styles.ponto}>.</span>
      </h1>

      <p className={`${styles.cargo} ${styles.anima}`} style={atraso(0.65)}>
        <span className="online" aria-hidden="true" />
        {HERO.cargo[0]}
        <br />
        {HERO.cargo[1]}
      </p>

      <p className={`${styles.descricao} ${styles.anima}`} style={atraso(0.75)}>
        {HERO.descricao}
      </p>

      <div className={styles.anima} style={atraso(0.85)}>
        <Link href={HERO.botao.href} className={styles.botao}>
          {HERO.botao.texto}
          <span className={styles.botaoSeta} aria-hidden="true">
            ↓
          </span>
        </Link>
      </div>

      <p className={`rotulo rotulo--suave ${styles.local} ${styles.anima}`} style={atraso(0.95)}>
        <span aria-hidden="true" className={styles.alvo}>
          ⌖
        </span>
        {HERO.local}
      </p>
    </div>
  );
}

function Direita() {
  return (
    <div className={styles.direita}>
      <p className={`${styles.frase} ${styles.anima}`} style={atraso(0.7)}>
        <span className={styles.fraseIcone} aria-hidden="true">
          ✳
        </span>
        <span>
          {HERO.frase[0]}
          <br />
          {HERO.frase[1]}
        </span>
      </p>

      <ul className={`${styles.numeros} ${styles.anima}`} style={atraso(0.85)}>
        {HERO.numeros.map(({ valor, legenda }) => (
          <li key={legenda} className={styles.numero}>
            <strong>
              <Contador valor={valor} />
              <sup>+</sup>
            </strong>
            <span className="rotulo rotulo--suave">{legenda}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Hero() {
  return (
    <section className={styles.hero} aria-label="Apresentação">
      <div className={styles.palco}>
        <PalavraGigante />

        <div className={`${styles.topoEsq} ${styles.anima}`} style={atraso(0.2)}>
          <p className="rotulo rotulo--destaque">{HERO.topoEsquerda[0]}</p>
          <p className="rotulo rotulo--suave">{HERO.topoEsquerda[1]}</p>
        </div>
        <div className={`${styles.topoDir} ${styles.anima}`} style={atraso(0.2)}>
          <span className="online" aria-hidden="true" />
          <p className="rotulo rotulo--suave">{HERO.topoDireita}</p>
        </div>

        <Esquerda />
        <HeroMidia />
        <Direita />
      </div>

      <div className={`${styles.rodape} ${styles.anima}`} style={atraso(1.1)}>
        <Link href={HERO.rodape.caso.href} className={styles.caso}>
          <span className={styles.play} aria-hidden="true">
            ▶
          </span>
          <span className="rotulo">{HERO.rodape.caso.texto}</span>
        </Link>
        <p className={`rotulo rotulo--suave ${styles.rodapeExtra}`}>{HERO.rodape.extra}</p>
        <p className="rotulo rotulo--suave">{HERO.rodape.direita}</p>
      </div>
    </section>
  );
}
