"use client";
/* =========================================================
   Certificados — galeria dos certificados em destaque
   ---------------------------------------------------------
   Cada cartão: miniatura do certificado + instituição, ano,
   carga horária, título e o botão "Verificar" (link oficial).
   - Uma faixa que passa devagar, sozinha, e PARA quando o mouse
     está em cima, quando um cartão recebe o foco do teclado ou no
     botão "Pausar". Com "reduzir movimento" ligado no sistema, ela
     fica parada e vira uma fileira que se arrasta para o lado.
   - Clicar na miniatura abre o certificado grande num <dialog>.
     O <dialog> nativo já resolve a acessibilidade: prende o foco
     dentro dele, fecha com Esc e devolve o foco ao botão.
   "use client": abrir e fechar o dialog precisa do navegador.
   As imagens usam next/image (tamanho certo para cada tela).
   ========================================================= */
import { useRef, useState } from "react";
import Image from "next/image";
import { juntarClasses } from "@/lib/classes";
import styles from "./Certificados.module.css";

const LARGURA = 1600;
const ALTURA = 1132;

function textoDoAlt({ instituicao, titulo }) {
  return `Certificado da ${instituicao}: ${titulo}`;
}

/* Botão "Verificar ↗" (só quando a instituição tem página de validação) */
function Verificar({ href, titulo }) {
  if (!href) return null;
  // aria-label: o texto visível ("Verificar") + o nome do certificado
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.verificar}
      aria-label={`Verificar o certificado ${titulo} (abre em nova aba)`}
    >
      Verificar
      <span aria-hidden="true">↗</span>
    </a>
  );
}

/* Uma volta da faixa: os cartões, um por certificado */
function Lista({ itens, onAbrir, copia = false }) {
  return (
    <ul
      className={styles.lista}
      aria-label={copia ? undefined : "Certificados em destaque"}
      aria-hidden={copia || undefined}
      inert={copia || undefined}
    >
      {itens.map((item, i) => {
        const { id, instituicao, titulo, ano, carga, imagem, verificar } = item;
        return (
          <li key={id} className={styles.cartao}>
            <button type="button" className={styles.miniatura} onClick={() => onAbrir(item)}>
              <Image
                src={imagem}
                alt=""
                width={LARGURA}
                height={ALTURA}
                sizes="340px"
                priority={!copia && i < 3}
              />
              <span className={styles.ampliar} aria-hidden="true">
                ⤢
              </span>
              <span className="so-leitor">Ampliar o certificado {titulo}</span>
            </button>

            <div className={styles.texto}>
              <p className="rotulo rotulo--suave">{[instituicao, ano, carga].filter(Boolean).join(" · ")}</p>
              <h3 className={styles.titulo}>{titulo}</h3>
              <Verificar href={verificar} titulo={titulo} />
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export default function Certificados({ itens }) {
  const dialogo = useRef(null);
  const [aberto, setAberto] = useState(null); // certificado mostrado no dialog
  const [pausado, setPausado] = useState(false);

  function abrir(item) {
    setAberto(item);
    // jsdom (testes) não tem showModal: aí só marca como aberto
    const d = dialogo.current;
    if (d?.showModal) d.showModal();
    else d?.setAttribute("open", "");
  }

  function fechar() {
    dialogo.current?.close?.();
  }

  return (
    <>
      {/* Faixa que passa sozinha (para no hover/foco e no botão Pausar).
          A lista aparece DUAS vezes em sequência: quando a primeira sai
          inteira da tela, a animação volta ao início sem "pulo".
          A cópia é só visual: aria-hidden + inert (fora do Tab e do
          leitor de tela). Com "reduzir movimento", nada passa sozinho. */}
      <div
        className={juntarClasses(styles.faixa, pausado && styles.pausado)}
        style={{ "--duracao": `${itens.length * 7}s` }}
      >
        <div className={styles.trilho}>
          <Lista itens={itens} onAbrir={abrir} />
          <Lista itens={itens} onAbrir={abrir} copia />
        </div>
      </div>

      {/* WCAG 2.2.2: o que se move sozinho por mais de 5 s precisa de um jeito de parar */}
      <button
        type="button"
        className={styles.pausar}
        onClick={() => setPausado((p) => !p)}
        aria-label={`${pausado ? "Continuar" : "Pausar"} a passagem dos certificados`}
      >
        <span aria-hidden="true">{pausado ? "▶" : "❚❚"}</span>
        {pausado ? "Continuar" : "Pausar"}
      </button>

      {/* Visualização grande. Clicar fora da imagem (no fundo) também fecha. */}
      <dialog
        ref={dialogo}
        className={styles.dialogo}
        aria-label={aberto ? `Certificado: ${aberto.titulo}` : "Certificado"}
        onClick={(e) => e.target === e.currentTarget && fechar()}
        onClose={() => setAberto(null)}
      >
        {aberto && (
          <figure className={styles.ampliado}>
            <Image
              src={aberto.imagem}
              alt={textoDoAlt(aberto)}
              width={LARGURA}
              height={ALTURA}
              sizes="(max-width: 1100px) 94vw, 1000px"
            />
            <figcaption className={styles.legenda}>
              <span>
                <strong>{aberto.titulo}</strong>
                <br />
                {[aberto.instituicao, aberto.ano, aberto.carga].filter(Boolean).join(" · ")}
              </span>
              <span className={styles.legendaAcoes}>
                <Verificar href={aberto.verificar} titulo={aberto.titulo} />
                <button type="button" className={styles.fechar} onClick={fechar}>
                  Fechar <span aria-hidden="true">✕</span>
                </button>
              </span>
            </figcaption>
          </figure>
        )}
      </dialog>
    </>
  );
}
