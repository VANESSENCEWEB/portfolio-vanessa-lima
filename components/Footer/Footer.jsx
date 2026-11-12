/* =========================================================
   Footer — rodapé de TODAS as páginas (entra no layout.jsx)
   ---------------------------------------------------------
   Partes:
   1. Chamada de contato ("Vamos conversar.") com o e-mail
   2. Três colunas: páginas, redes, onde estou
   3. Linha final: © ano, "feito com Next.js" e voltar ao topo
   Server Component: não tem clique nem estado, então vai
   como HTML pronto, sem JavaScript no navegador.
   É "async" porque espera o ano atual (ver lib/ano.js).
   Todos os textos vêm de data/perfil.js.
   ========================================================= */
import Link from "next/link";
import { MENU, PESSOA } from "@/data/perfil";
import { anoAtual } from "@/lib/ano";
import Container from "@/components/ui/Container/Container";
import { IconeGithub, IconeLinkedin } from "@/components/Navbar/Icones";
import styles from "./Footer.module.css";

// Redes numa lista: para incluir outra, é só acrescentar aqui
const REDES = [
  { nome: "GitHub", link: PESSOA.redes.github, Icone: IconeGithub },
  { nome: "LinkedIn", link: PESSOA.redes.linkedin, Icone: IconeLinkedin },
];

export default async function Footer() {
  const ano = await anoAtual();

  return (
    <footer className={styles.rodape}>
      <Container>
        {/* 1. Chamada de contato */}
        <div className={styles.chamada}>
          <p className="rotulo rotulo--destaque">Contato</p>
          <h2 className={styles.titulo}>
            Vamos conversar
            <span className={styles.ponto} aria-hidden="true">
              .
            </span>
          </h2>
          <a href={`mailto:${PESSOA.email}`} className={styles.email}>
            {PESSOA.email}
          </a>
        </div>

        {/* 2. Colunas */}
        <div className={styles.colunas}>
          <nav aria-label="Rodapé">
            <p className="rotulo rotulo--suave">Páginas</p>
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
            <p className="rotulo rotulo--suave">Redes</p>
            <ul className={styles.lista}>
              {REDES.map(({ nome, link, Icone }) => (
                <li key={nome}>
                  {/* Nova aba + rel="noopener noreferrer" = segurança */}
                  <a href={link} target="_blank" rel="noopener noreferrer" className={styles.link}>
                    <Icone />
                    {nome}
                    <span className="so-leitor"> (abre em nova aba)</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="rotulo rotulo--suave">Onde estou</p>
            <p className={styles.texto}>
              {PESSOA.cidade}, {PESSOA.estado}
              <br />
              Sistemas para Internet · UNICAP
            </p>
          </div>
        </div>

        {/* 3. Linha final */}
        <div className={styles.base}>
          <p>
            © {ano} {PESSOA.nome}. Feito com Next.js e muito café.
          </p>
          <a href="#conteudo" className={styles.link}>
            Voltar ao topo <span aria-hidden="true">↑</span>
          </a>
        </div>
      </Container>
    </footer>
  );
}
