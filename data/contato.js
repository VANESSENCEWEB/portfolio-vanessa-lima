/* =========================================================
   data/contato.js — textos da seção Contato e do rodapé
   ---------------------------------------------------------
   Mesmo padrão dos outros arquivos de data/: conteúdo aqui,
   layout nos componentes (components/Contato e Footer).
   Os endereços (e-mail, WhatsApp, redes) vêm de PESSOA, em
   data/perfil.js: mudou lá, muda em todo o site.
   Partes:
   1. CONTATO → seção "Vamos conversar" da página Início
   2. RODAPE  → frase e coluna "Foco" do rodapé
   ========================================================= */
import { PESSOA } from "@/data/perfil";

/* ---------- 1. CONTATO ---------- */
export const CONTATO = {
  id: "contato", // âncora: o "Vamos conversar" do menu leva para /#contato
  rotulo: "Contato",
  titulo: "Vamos conversar",
  descricao:
    "Procurando alguém para estágio em front-end ou quer falar de um projeto? Me conta: eu respondo por e-mail.",
  // Canais ao lado do formulário. "rede" escolhe o ícone e a cor da marca.
  canais: [
    { rede: "email", rotulo: "E-mail", valor: PESSOA.email, link: `mailto:${PESSOA.email}` },
    {
      rede: "whatsapp",
      rotulo: "WhatsApp",
      valor: PESSOA.whatsapp.texto,
      link: `https://wa.me/${PESSOA.whatsapp.numero}`,
    },
    { rede: "linkedin", rotulo: "LinkedIn", valor: "vanessa-lima-dev", link: PESSOA.redes.linkedin },
    { rede: "github", rotulo: "GitHub", valor: "VANESSENCEWEB", link: PESSOA.redes.github },
  ],
  // Opções do campo "Assunto" (a primeira já vem marcada)
  assuntos: ["Estágio front-end", "Projeto / freelance", "Outro"],
  botao: "Enviar mensagem",
  sucesso: "Abrindo o seu e-mail com a mensagem pronta: é só enviar.",
};

/* ---------- 2. RODAPE ---------- */
export const RODAPE = {
  frase: "Front-end com projetos reais, em Recife. Disponível para estágio.",
  foco: ["Front-end", "UI design", "React · Next.js", "Acessibilidade"],
};
