import { ArrowDownRight, ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";

const email = "viniciusferreira1938@gmail.com";
const contactLinks = [
  {
    number: "01",
    label: "GitHub",
    detail: "@yatoragami",
    href: "https://github.com/yatoragami",
    icon: Github,
    external: true,
  },
  {
    number: "02",
    label: "LinkedIn",
    detail: "in/vinicius-ferre",
    href: "https://www.linkedin.com/in/vinicius-ferre/",
    icon: Linkedin,
    external: true,
  },
  {
    number: "03",
    label: "E-mail",
    detail: email,
    href: `mailto:${email}`,
    icon: Mail,
    external: false,
  },
];

export default function ContactSection() {
  return (
    <>
      <section className="relative overflow-hidden border-t border-white/10 px-5 py-24 sm:px-8 sm:py-32" id="contact">
        <div className="contact-grid absolute inset-0 opacity-50" aria-hidden="true" />
        <div className="contact-orbit absolute -left-36 top-24 h-80 w-80 rounded-full border border-signal/[0.12] sm:-left-20 sm:h-[28rem] sm:w-[28rem]" aria-hidden="true">
          <span className="absolute right-[12%] top-[20%] h-2 w-2 rounded-full bg-acid shadow-[0_0_16px_4px_rgba(184,255,59,.4)]" />
        </div>

        <div className="relative mx-auto max-w-7xl">
          <p className="eyebrow"><span>05</span> // contato</p>

          <div className="mt-10 grid gap-14 lg:grid-cols-[1fr_.8fr] lg:items-end lg:gap-20">
            <div className="relative">
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-signal">
                Próxima conexão
              </p>
              <h2 className="mt-5 max-w-3xl font-display text-[clamp(3.2rem,8vw,7.5rem)] font-bold leading-[0.88] tracking-[-0.075em] text-paper">
                Vamos fazer
                <br />
                <span className="text-acid">acontecer.</span>
              </h2>
              <p className="mt-7 max-w-lg text-sm leading-7 text-white/55 sm:text-base">
                Tem uma oportunidade, uma ideia ou um desafio interessante? Me conte. Gosto de
                transformar boas conversas em soluções que funcionam.
              </p>
              <div className="mt-8 inline-flex items-center gap-3 border border-white/10 bg-[#090e10]/80 px-3 py-2 font-mono text-[9px] uppercase tracking-[0.1em] text-white/55">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-acid opacity-40" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-acid" />
                </span>
                Aberto a novas conexões
              </div>
            </div>

            <div className="contact-links relative">
              <div className="mb-2 flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.14em] text-white/35">
                <span>Canais diretos</span>
                <ArrowDownRight className="text-signal" size={14} />
              </div>
              {contactLinks.map(({ number, label, detail, href, icon: Icon, external }) => (
                <a
                  className="contact-link group"
                  href={href}
                  key={label}
                  rel={external ? "noreferrer" : undefined}
                  target={external ? "_blank" : undefined}
                >
                  <span className="font-mono text-[9px] text-acid/65">{number}</span>
                  <span className="contact-link-icon">
                    <Icon size={17} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-display text-base font-semibold text-paper transition group-hover:text-acid">
                      {label}
                    </span>
                    <span className="mt-1 block truncate font-mono text-[9px] text-white/40 sm:text-[10px]">
                      {detail}
                    </span>
                  </span>
                  <ArrowUpRight className="shrink-0 text-white/30 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-acid" size={16} />
                </a>
              ))}
              <p className="mt-5 font-mono text-[9px] leading-5 text-white/30">
                Escolha seu canal preferido. Espero seu contato.
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/[0.07] px-5 py-6 sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 font-mono text-[9px] uppercase tracking-[0.12em] text-white/25 sm:flex-row sm:justify-between">
          <span>© {new Date().getFullYear()} Vinícius Ferreira da Silva</span>
          <span>Spiral core // sempre em evolução</span>
        </div>
      </footer>
    </>
  );
}
