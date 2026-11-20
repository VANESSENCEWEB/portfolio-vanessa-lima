/* =========================================================
   Footer — rodapé de TODAS as páginas (entra no layout.jsx)
   ---------------------------------------------------------
   Partes:
   1. Marca: nome, frase e as redes nas cores das marcas
   2. Três colunas: navegação, foco e contato
   3. "VANESSA LIMA" gigante, só com o contorno (enfeite)
   4. Linha final: © ano e voltar ao topo
   Server Component: não tem clique nem estado, então vai
   como HTML pronto, sem JavaScript no navegador.
   É "async" porque espera o ano atual (ver lib/ano.js).
   Textos em data/perfil.js e data/contato.js.
   ========================================================= */
import Link from "next/link";
import { MENU, PESSOA } from "@/data/perfil";
import { CONTATO, RODAPE } from "@/data/contato";
import { anoAtual } from "@/lib/ano";
import Container from "@/components/ui/Container/Container";
import Redes from "@/components/Redes/Redes";
import styles from "./Footer.module.css";

export default async function Footer() {
  const ano = await anoAtual();

  return (
    <footer className={styles.rodape}>
      <Container>
        <div className={styles.topo}>
          {/* 1. Marca */}
          <div className={styles.marca}>
            <p className={styles.logo}>
              {PESSOA.nome}
              <span className={styles.ponto} aria-hidden="true">
                .
              </span>
            </p>
            <p className={styles.frase}>{RODAPE.frase}</p>
            <Redes />
          </div>

          {/* 2. Colunas */}
          <div className={styles.colunas}>
            <nav aria-label="Rodapé">
              <p className={`rotulo rotulo--destaque ${styles.tituloColuna}`}>Navegação</p>
              <ul className={styles.lista}>
                {MENU.map((item) => (
                  <li key={item.link}>
                    <Link href={item.link} className={styles.link}>
                      {item.texto}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div>
              <p className={`rotulo rotulo--destaque ${styles.tituloColuna}`}>Foco</p>
              <ul className={styles.lista}>
                {RODAPE.foco.map((item) => (
                  <li key={item} className={styles.item}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className={`rotulo rotulo--destaque ${styles.tituloColuna}`}>Contato</p>
              <ul className={styles.lista}>
                {CONTATO.canais.map(({ rede, rotulo, link }) => {
                  const externo = link.startsWith("http");
                  return (
                    <li key={rede}>
                      <a
                        href={link}
                        className={styles.link}
                        {...(externo && { target: "_blank", rel: "noopener noreferrer" })}
                      >
                        {rotulo}
                        {externo && <span className="so-leitor"> (abre em nova aba)</span>}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </Container>

      {/* 3. Nome gigante só com o contorno: enfeite, o leitor de tela não lê */}
      <p className={styles.gigante} aria-hidden="true">
        {PESSOA.nome}
      </p>

      {/* 4. Linha final */}
      <Container>
        <div className={styles.base}>
          <p>
            © {ano} {PESSOA.nome} · Feito com Next.js
          </p>
          <a href="#conteudo" className={styles.link}>
            Voltar ao topo <span aria-hidden="true">↑</span>
          </a>
        </div>
      </Container>
    </footer>
  );
}
