/* =========================================================
   Contato — seção "Vamos conversar" da página Início
   ---------------------------------------------------------
   Duas colunas no computador (uma embaixo da outra no celular):
   [canais: e-mail, WhatsApp, LinkedIn, GitHub]  [formulário]
   Cada canal tem um quadrado com o ícone; no hover o quadrado
   ganha a cor da marca e o brilho neon (o mesmo das Redes).
   Server Component: só o formulário (FormContato) roda no
   navegador. Textos e endereços vêm de data/contato.js.
   ========================================================= */
import { CONTATO } from "@/data/contato";
import Secao from "@/components/ui/Secao/Secao";
import { IconeEmail, IconeGithub, IconeLinkedin, IconeWhatsapp } from "@/components/Navbar/Icones";
import FormContato from "./FormContato";
import styles from "./Contato.module.css";

const ICONES = { email: IconeEmail, whatsapp: IconeWhatsapp, linkedin: IconeLinkedin, github: IconeGithub };

export default function Contato() {
  return (
    <Secao id={CONTATO.id} rotulo={CONTATO.rotulo} titulo={CONTATO.titulo} descricao={CONTATO.descricao}>
      <div className={styles.grade}>
        <ul className={styles.canais}>
          {CONTATO.canais.map(({ rede, rotulo, valor, link }) => {
            const Icone = ICONES[rede];
            const externo = link.startsWith("http");
            return (
              <li key={rede}>
                <a
                  href={link}
                  className={`${styles.canal} ${styles[rede]}`}
                  {...(externo && { target: "_blank", rel: "noopener noreferrer" })}
                >
                  <span className={styles.icone} aria-hidden="true">
                    <Icone />
                  </span>
                  <span>
                    <span className={`rotulo rotulo--suave ${styles.rotulo}`}>{rotulo}</span>
                    <span className={styles.valor}>{valor}</span>
                    {externo && <span className="so-leitor"> (abre em nova aba)</span>}
                  </span>
                </a>
              </li>
            );
          })}
        </ul>

        <FormContato />
      </div>
    </Secao>
  );
}
