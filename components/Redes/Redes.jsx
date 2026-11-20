/* =========================================================
   Redes — botões das redes sociais nas cores das marcas
   ---------------------------------------------------------
   Usado no menu (GitHub e LinkedIn) e no rodapé (todas).
   Cada botão tem o fundo da marca e o ícone branco; no hover
   ele sobe e ganha um brilho neon da mesma cor.
   Props:
   - quais: lista das redes, na ordem em que aparecem
   - tamanho: "p" (menu) | "m" (rodapé, padrão)
   - className: classe extra para a lista
   target="_blank" + rel="noopener noreferrer": abre em nova
   aba sem dar ao outro site acesso à aba do portfólio.
   ========================================================= */
import { PESSOA } from "@/data/perfil";
import { juntarClasses } from "@/lib/classes";
import { IconeGithub, IconeInstagram, IconeLinkedin, IconeWhatsapp } from "@/components/Navbar/Icones";
import styles from "./Redes.module.css";

export const REDES = {
  github: { nome: "GitHub", link: PESSOA.redes.github, Icone: IconeGithub },
  linkedin: { nome: "LinkedIn", link: PESSOA.redes.linkedin, Icone: IconeLinkedin },
  whatsapp: {
    nome: "WhatsApp",
    link: `https://wa.me/${PESSOA.whatsapp.numero}`,
    Icone: IconeWhatsapp,
  },
  instagram: { nome: "Instagram", link: PESSOA.redes.instagram, Icone: IconeInstagram },
};

export default function Redes({ quais = Object.keys(REDES), tamanho = "m", className }) {
  return (
    <ul className={juntarClasses(styles.redes, className)}>
      {quais.map((id) => {
        const { nome, link, Icone } = REDES[id];
        return (
          <li key={id}>
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className={juntarClasses(styles.rede, styles[id], styles[tamanho])}
              aria-label={`${nome} de ${PESSOA.nome} (abre em nova aba)`}
            >
              <Icone />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
