/* =========================================================
   app/page.jsx — página INÍCIO (endereço "/")
   ---------------------------------------------------------
   Seções, de cima para baixo:
   1. Hero: a primeira tela, com o vídeo (components/Hero)
   2. Projetos em destaque: os 3 primeiros de data/projetos.js,
      com os prints (o mesmo cartão da página Projetos)
   3. Navegue pelo portfólio: um cartão para cada página
   As seções 2 e 3 sobem e aparecem ao rolar (<Revelar>).
   Server Component: só o vídeo, o contador e o Revelar rodam
   no navegador.
   ========================================================= */
import { ATALHOS } from "@/data/home";
import { DESTAQUES } from "@/data/projetos";
import PRINTS from "@/data/prints.json";
import Hero from "@/components/Hero/Hero";
import Mockup from "@/components/Mockup/Mockup";
import Revelar from "@/components/Revelar/Revelar";
import Botao from "@/components/ui/Botao/Botao";
import Card from "@/components/ui/Card/Card";
import Secao from "@/components/ui/Secao/Secao";
import styles from "./page.module.css";

/* Quantos destaques mostrar na Início (o resto fica em /projetos) */
const DESTAQUES_NA_HOME = 3;

export default function Inicio() {
  return (
    <>
      <Hero />

      <Revelar>
        <Secao
          id="destaques"
          rotulo="Portfólio"
          titulo="Projetos em destaque"
          descricao="Uma amostra do que eu construo. Os outros estão na página Projetos."
        >
          <ul className={styles.grade}>
            {DESTAQUES.slice(0, DESTAQUES_NA_HOME).map((p) => (
              <li key={p.id}>
                <Card
                  titulo={p.titulo}
                  rotulo={p.contexto}
                  descricao={p.descricao}
                  tags={p.tags}
                  href={p.site || p.codigo || undefined}
                  midia={<Mockup titulo={p.titulo} prints={PRINTS[p.id]} />}
                >
                  {p.nota && <p className={styles.nota}>{p.nota}</p>}
                </Card>
              </li>
            ))}
          </ul>
          <Botao href="/projetos" seta>
            Ver todos os projetos
          </Botao>
        </Secao>
      </Revelar>

      <Revelar>
        <Secao
          id="navegue"
          rotulo="Mapa do site"
          titulo="Navegue pelo portfólio"
          descricao="Cada página conta uma parte da minha trajetória."
        >
          <ul className={styles.grade}>
            {ATALHOS.map(({ href, titulo, descricao }) => (
              <li key={href}>
                <Card titulo={titulo} descricao={descricao} href={href} />
              </li>
            ))}
          </ul>
        </Secao>
      </Revelar>
    </>
  );
}
