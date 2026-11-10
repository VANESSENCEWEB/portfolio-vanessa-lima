"use client";
/* =========================================================
   Navbar.jsx — barra de navegação (aparece em TODAS as páginas)
   ---------------------------------------------------------
   Partes:
   1. Logo "Vanessa Lima."
   2. Links do menu (computador) com sublinhado no hover
   3. Ações: GitHub, LinkedIn, tema e "Vamos conversar"
   4. Menu hambúrguer (celular e tablet)
   "use client": precisa rodar no navegador (tem cliques e estado).
   ========================================================= */
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTema } from "@/components/TemaProvider";
import { MENU, PESSOA } from "@/data/perfil";
import { IconeGithub, IconeLinkedin, IconeLua, IconeSol } from "./Icones";
import styles from "./Navbar.module.css";

/* ---------- Links das redes (reaproveitado no computador e no celular) ----------
   target="_blank" abre em nova aba.
   rel="noopener noreferrer" é SEGURANÇA: impede que o site aberto
   consiga controlar a aba do seu portfólio. */
function LinksRedes() {
  return (
    <>
      <a
        href={PESSOA.redes.github}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.icone}
        aria-label="GitHub de Vanessa Lima (abre em nova aba)"
      >
        <IconeGithub />
      </a>
      <a
        href={PESSOA.redes.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.icone}
        aria-label="LinkedIn de Vanessa Lima (abre em nova aba)"
      >
        <IconeLinkedin />
      </a>
    </>
  );
}

/* ---------- Botão de tema ----------
   Os dois ícones (sol e lua) estão sempre no HTML; o CSS mostra
   só o certo, pelo data-tema do <html>. Assim o servidor e o
   navegador desenham a mesma coisa (sem erro de "hidratação"). */
function BotaoTema() {
  const { alternarTema } = useTema();
  return (
    <button
      type="button"
      className={`${styles.icone} ${styles.tema}`}
      onClick={alternarTema}
      aria-label="Alternar entre tema claro e escuro"
    >
      <IconeSol className={styles.sol} />
      <IconeLua className={styles.lua} />
    </button>
  );
}

/* ---------- Botão "Vamos conversar" ----------
   Abre o e-mail da pessoa já com o seu endereço preenchido.
   O <span> de fundo "enche" o botão de vermelho no hover. */
function BotaoConversar({ className = "" }) {
  return (
    <a href={`mailto:${PESSOA.email}`} className={`${styles.cta} ${className}`}>
      <span className={styles.ctaFundo} aria-hidden="true" />
      <span className={styles.ctaTexto}>Vamos conversar</span>
      <span className={styles.ctaSeta} aria-hidden="true">
        ↗
      </span>
    </a>
  );
}

/* =========================================================
   Navbar (junta tudo)
   ========================================================= */
export default function Navbar() {
  const caminho = usePathname(); // endereço atual, ex.: "/" ou "/sobre"

  // Guardamos EM QUAL PÁGINA o menu foi aberto (null = fechado).
  // O menu só conta como aberto se ainda estivermos nessa página.
  // Resultado: trocou de página → o menu fecha sozinho.
  const [abertoEm, setAbertoEm] = useState(null);
  const menuAberto = abertoEm === caminho;

  const fecharMenu = () => setAbertoEm(null);
  const alternarMenu = () => setAbertoEm(menuAberto ? null : caminho);

  // Com o menu aberto: trava a rolagem da página e fecha com a tecla Esc
  useEffect(() => {
    if (!menuAberto) return;
    document.body.style.overflow = "hidden";
    const aoApertarTecla = (e) => e.key === "Escape" && setAbertoEm(null);
    window.addEventListener("keydown", aoApertarTecla);

    // Limpeza: destrava a rolagem e para de "escutar" o teclado
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", aoApertarTecla);
    };
  }, [menuAberto]);

  return (
    <header className={styles.barra}>
      <nav className={styles.nav} aria-label="Navegação principal">
        {/* 1. Logo */}
        <Link href="/" className={styles.logo} aria-label="Vanessa Lima — página inicial">
          {PESSOA.nome}
          <span className={styles.logoPonto}>.</span>
        </Link>

        {/* 2. Links (computador) — um <li> para cada item do MENU */}
        <ul className={styles.links}>
          {MENU.map((item) => {
            const ativo = caminho === item.link;
            return (
              <li key={item.link}>
                <Link
                  href={item.link}
                  className={`${styles.link} ${ativo ? styles.linkAtivo : ""}`}
                  // aria-current avisa o leitor de tela qual é a página atual
                  aria-current={ativo ? "page" : undefined}
                >
                  {item.texto}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* 3. Ações */}
        <div className={styles.acoes}>
          <div className={styles.redesDesktop}>
            <LinksRedes />
          </div>
          <BotaoTema />
          <BotaoConversar className={styles.ctaDesktop} />

          {/* 4. Botão hambúrguer (só aparece em telas menores) */}
          <button
            type="button"
            className={`${styles.hamburguer} ${menuAberto ? styles.hamburguerAberto : ""}`}
            onClick={alternarMenu}
            aria-expanded={menuAberto}
            aria-controls="menu-celular"
            aria-label={menuAberto ? "Fechar menu" : "Abrir menu"}
          >
            <span />
            <span />
          </button>
        </div>
      </nav>

      {/* Painel do menu no celular */}
      <div
        id="menu-celular"
        className={`${styles.painel} ${menuAberto ? styles.painelAberto : ""}`}
        // "inert" tira o painel fechado do Tab e do leitor de tela
        inert={!menuAberto}
      >
        <ul className={styles.painelLinks}>
          {MENU.map((item, i) => (
            <li key={item.link} style={{ "--ordem": i }}>
              <Link
                href={item.link}
                className={caminho === item.link ? styles.linkAtivo : ""}
                aria-current={caminho === item.link ? "page" : undefined}
                onClick={fecharMenu}
              >
                <span className={styles.painelNumero}>0{i + 1}</span>
                {item.texto}
              </Link>
            </li>
          ))}
        </ul>
        <div className={styles.painelRodape}>
          <div className={styles.painelRedes}>
            <LinksRedes />
          </div>
          <BotaoConversar />
        </div>
      </div>
    </header>
  );
}
