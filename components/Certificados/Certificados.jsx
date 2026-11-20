"use client";
/* =========================================================
   Certificados — galeria dos certificados em destaque
   ---------------------------------------------------------
   Cada cartão: miniatura do certificado + instituição, ano,
   carga horária, título e o botão "Verificar" (link oficial).
   - Computador: grade. Celular: uma fileira que a pessoa
     arrasta com o dedo (scroll-snap), sem nada passando sozinho.
   - Clicar na miniatura abre o certificado grande num <dialog>.
     O <dialog> nativo já resolve a acessibilidade: prende o foco
     dentro dele, fecha com Esc e devolve o foco ao botão.
   "use client": abrir e fechar o dialog precisa do navegador.
   As imagens usam next/image (tamanho certo para cada tela).
   ========================================================= */
import { useRef, useState } from "react";
import Image from "next/image";
import styles from "./Certificados.module.css";

const LARGURA = 1600;
const ALTURA = 1132;

function textoDoAlt({ instituicao, titulo }) {
  return `Certificado da ${instituicao}: ${titulo}`;
}

/* Botão "Verificar ↗" (só quando a instituição tem página de validação) */
function Verificar({ href, titulo }) {
  if (!href) return null;
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={styles.verificar}>
      Verificar<span className="so-leitor"> o certificado {titulo} (abre em nova aba)</span>
      <span aria-hidden="true">↗</span>
    </a>
  );
}

export default function Certificados({ itens }) {
  const dialogo = useRef(null);
  const [aberto, setAberto] = useState(null); // certificado mostrado no dialog

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
      <ul className={styles.lista} aria-label="Certificados em destaque">
        {itens.map((item, i) => {
          const { id, instituicao, titulo, ano, carga, imagem, verificar } = item;
          return (
            <li key={id} className={styles.cartao}>
              <button type="button" className={styles.miniatura} onClick={() => abrir(item)}>
                <Image
                  src={imagem}
                  alt=""
                  width={LARGURA}
                  height={ALTURA}
                  sizes="(max-width: 700px) 80vw, (max-width: 1100px) 45vw, 380px"
                  priority={i < 3}
                />
                <span className={styles.ampliar} aria-hidden="true">
                  ⤢
                </span>
                <span className="so-leitor">Ampliar o certificado {titulo}</span>
              </button>

              <div className={styles.texto}>
                <p className="rotulo rotulo--suave">
                  {[instituicao, ano, carga].filter(Boolean).join(" · ")}
                </p>
                <h3 className={styles.titulo}>{titulo}</h3>
                <Verificar href={verificar} titulo={titulo} />
              </div>
            </li>
          );
        })}
      </ul>

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
