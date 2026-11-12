/* =========================================================
   app/sobre/page.jsx — página SOBRE (endereço /sobre)
   ---------------------------------------------------------
   Seções, de cima para baixo:
   1. Apresentação: título (h1), foto, bio, resumo rápido e contatos
   2. Habilidades: o que eu uso nos meus projetos
   3. Tecnologias e módulos usados NESTE app (com o papel de cada um)
   4. Como este site foi feito (passo a passo + links)
   Server Component: a página inteira chega pronta em HTML.
   Todos os textos vêm de data/sobre.js e data/perfil.js.
   ========================================================= */
import Image from "next/image";
import { PESSOA } from "@/data/perfil";
import {
  BIO,
  COMO_FOI_FEITO,
  FATOS,
  FOTO,
  HABILIDADES,
  LINKS_DO_PROJETO,
  TECNOLOGIAS_DO_APP,
} from "@/data/sobre";
import { criarJsonLdPaginaSobre, serializarJsonLd } from "@/lib/jsonLd";
import Botao from "@/components/ui/Botao/Botao";
import Container from "@/components/ui/Container/Container";
import Secao from "@/components/ui/Secao/Secao";
import Tag from "@/components/ui/Tag/Tag";
import TituloSecao from "@/components/ui/TituloSecao/TituloSecao";
import ListaTecnologias from "@/components/ListaTecnologias/ListaTecnologias";
import styles from "./page.module.css";

/* SEO da página (o layout completa o título → "Sobre — Vanessa Lima") */
export const metadata = {
  title: "Sobre",
  description:
    "Quem é Vanessa Lima: trajetória, formação, habilidades e todas as tecnologias usadas neste portfólio.",
  alternates: { canonical: "/sobre" },
  openGraph: { title: "Sobre — Vanessa Lima", url: "/sobre" },
};

/* "sizes" diz ao navegador a largura da foto em cada tela,
   para ele baixar o tamanho certo (nem maior, nem menor) */
const TAMANHOS_FOTO = "(max-width: 899px) min(90vw, 420px), 420px";

/* ---------- 1. Apresentação ---------- */
function Apresentacao() {
  return (
    <Container as="section" className={styles.apresentacao} aria-labelledby="sobre-titulo">
      <TituloSecao id="sobre-titulo" nivel={1} rotulo="Sobre">
        Sobre mim
      </TituloSecao>

      <div className={styles.grade}>
        <figure className={styles.foto}>
          <Image
            src={FOTO.src}
            alt={FOTO.alt}
            width={FOTO.largura}
            height={FOTO.altura}
            sizes={TAMANHOS_FOTO}
            priority /* é a maior imagem da tela: carrega primeiro */
          />
        </figure>

        <div className={styles.texto}>
          {BIO.map((paragrafo) => (
            <p key={paragrafo} className={styles.paragrafo}>
              {paragrafo}
            </p>
          ))}

          {/* <dl> = lista de "termo e definição": o jeito certo de marcar pares rótulo/valor */}
          <dl className={styles.fatos}>
            {FATOS.map(({ titulo, valor }) => (
              <div key={titulo} className={styles.fato}>
                <dt className="rotulo rotulo--suave">{titulo}</dt>
                <dd>{valor}</dd>
              </div>
            ))}
          </dl>

          <div className={styles.acoes}>
            <Botao href={`mailto:${PESSOA.email}`} seta>
              Vamos conversar
            </Botao>
            <Botao href={PESSOA.redes.linkedin} variante="secundario" seta>
              LinkedIn
            </Botao>
            <Botao href={PESSOA.redes.github} variante="secundario" seta>
              GitHub
            </Botao>
          </div>
        </div>
      </div>
    </Container>
  );
}

/* ---------- 2. Habilidades ---------- */
function Habilidades() {
  return (
    <Secao
      id="habilidades"
      rotulo="Habilidades"
      titulo="O que eu uso"
      descricao="Linguagens, ferramentas e áreas que aparecem nos meus projetos e estudos."
    >
      <div className={styles.habilidades}>
        {HABILIDADES.map(({ grupo, itens }) => (
          <div key={grupo}>
            <h3 className={styles.subtitulo}>{grupo}</h3>
            <ul className={styles.tags} aria-label={grupo}>
              {itens.map((item) => (
                <li key={item}>
                  <Tag>{item}</Tag>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Secao>
  );
}

/* ---------- 3. Tecnologias e módulos usados neste app ---------- */
function TecnologiasDoApp() {
  const total = TECNOLOGIAS_DO_APP.reduce((soma, grupo) => soma + grupo.itens.length, 0);
  return (
    <Secao
      id="tecnologias"
      rotulo="Por dentro deste site"
      titulo="Tecnologias e módulos usados neste app"
      descricao={`As ${total} peças que fazem este portfólio funcionar e o papel de cada uma. As versões são lidas direto do package.json.`}
    >
      <ListaTecnologias grupos={TECNOLOGIAS_DO_APP} />
    </Secao>
  );
}

/* ---------- 4. Como este site foi feito ---------- */
function ComoFoiFeito() {
  return (
    <Secao
      id="como-foi-feito"
      rotulo="Processo"
      titulo="Como este site foi feito"
      descricao="Do zero ao deploy em etapas diárias, cada uma revisada, testada e publicada."
    >
      {/* <ol>: a ordem importa, então é lista numerada */}
      <ol className={styles.passos}>
        {COMO_FOI_FEITO.map(({ titulo, texto }) => (
          <li key={titulo} className={styles.passo}>
            <h3 className={styles.subtitulo}>{titulo}</h3>
            <p className={styles.passoTexto}>{texto}</p>
          </li>
        ))}
      </ol>

      <div className={styles.acoes}>
        <Botao href={LINKS_DO_PROJETO.repositorio} seta>
          Ver o código no GitHub
        </Botao>
        <Botao href={LINKS_DO_PROJETO.decisoes} variante="secundario" seta>
          Decisões técnicas
        </Botao>
      </div>
    </Secao>
  );
}

/* JSON-LD da página: diz ao Google que esta é a página de perfil
   da Vanessa (texto nosso + serializarJsonLd = seguro) */
const jsonLd = serializarJsonLd(criarJsonLdPaginaSobre());

export default function PaginaSobre() {
  return (
    <>
      <Apresentacao />
      <Habilidades />
      <TecnologiasDoApp />
      <ComoFoiFeito />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
    </>
  );
}
