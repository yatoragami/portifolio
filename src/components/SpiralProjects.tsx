import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Braces, Code2, Compass, Github, Layers3, Network } from "lucide-react";

const projects = [
  {
    type: "REPOSITÓRIO PÚBLICO / FAMETRO",
    title: "Estruturas de Dados II",
    description: "Lista acadêmica de exercícios em C com foco em ponteiros e fundamentos de estruturas de dados.",
    tags: ["C", "Ponteiros", "Lógica"],
    href: "https://github.com/yatoragami/Estrutura-de-dados-2---Fametro",
    icon: Braces,
    number: "01",
  },
  {
    type: "REPOSITÓRIO PÚBLICO / FAMETRO",
    title: "Listas de estruturas de dados",
    description: "Exercícios e estudos acadêmicos organizados em repositório, reforçando raciocínio e fundamentos de programação.",
    tags: ["C", "Estruturas de dados", "Estudos"],
    href: "https://github.com/yatoragami/LISTAS_ESTRUTURA_DE_DADOS_VINICIUS_FERREIRA_DA_SILVA",
    icon: Layers3,
    number: "02",
  },
  {
    type: "CASE PROFISSIONAL / TVLAR MOTORS",
    title: "Automação de rotinas",
    description: "Integração de Jira com Google Sheets por Webhooks e Apps Script para automatizar cálculos de notas fiscais. O código não está publicado.",
    tags: ["Google Apps Script", "Webhooks", "Jira"],
    icon: Network,
    number: "03",
  },
  {
    type: "TRILHA EM EVOLUÇÃO / QA",
    title: "Qualidade & APIs",
    description: "Prática com testes de API no Postman e fundamentos de testes automatizados, ampliando a visão de suporte para qualidade de software.",
    tags: ["Postman", "API REST", "Testes"],
    icon: Code2,
    number: "04",
  },
];

function SpiralMark() {
  const spiralRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: spiralRef,
    offset: ["start end", "end start"],
  });
  const rotate = useTransform(scrollYProgress, [0, 1], [-70, 260]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.7, 1.45]);
  const pathLength = useTransform(scrollYProgress, [0, 0.9], [0.1, 1]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute -right-20 top-0 h-[34rem] w-[34rem] opacity-20 sm:-right-8 sm:h-[46rem] sm:w-[46rem]"
      ref={spiralRef}
    >
      <motion.svg className="h-full w-full" style={{ rotate, scale }} viewBox="0 0 600 600">
        <motion.path
          d="M300 300 C302 287 318 284 328 295 C342 312 331 340 307 348 C270 361 229 339 216 301 C196 245 228 181 284 159 C360 130 447 174 469 252 C499 358 435 472 329 495 C192 524 54 435 31 298 C3 133 119 -21 283 -48"
          fill="none"
          stroke="#b8ff3b"
          strokeLinecap="round"
          strokeWidth="1.5"
          style={{ pathLength }}
        />
        <circle cx="300" cy="300" fill="#42f5c5" r="3" />
      </motion.svg>
    </div>
  );
}

export default function SpiralProjects() {
  return (
    <section className="relative overflow-hidden px-5 py-24 sm:px-8 sm:py-36" id="projects">
      <SpiralMark />
      <div className="relative mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[.85fr_1.15fr]">
          <div className="lg:sticky lg:top-32 lg:h-fit">
            <p className="eyebrow"><span>04</span> // projetos & evolução</p>
            <h2 className="section-title mt-5">O próximo<br />limite é <span className="text-acid">o começo.</span></h2>
            <p className="mt-6 max-w-md text-sm leading-7 text-white/50">
              De Assistente de TI a Engenheiro de Software / QA: uma espiral de experiências,
              estudo e novos desafios.
            </p>
            <div className="mt-9 flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.12em] text-signal">
              <Compass size={14} /> Próxima coordenada: software + qualidade
            </div>
          </div>
          <div className="space-y-4">
            {projects.map(({ type, title, description, tags, href, icon: Icon, number }, index) => (
              <motion.article
                className="project-card group relative border border-white/10 bg-[#090e10]/90 p-5 sm:p-7"
                initial={{ opacity: 0, x: 24 }}
                key={number}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.5, delay: index * 0.06 }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <span className="mt-1 font-mono text-[9px] text-acid/70">{number}</span>
                    <div>
                      <p className="font-mono text-[8px] uppercase tracking-[0.12em] text-signal">{type}</p>
                      <h3 className="mt-2 font-display text-xl font-semibold text-paper sm:text-2xl">{title}</h3>
                    </div>
                  </div>
                  {href ? (
                    <a
                      aria-label={`Abrir ${title} no GitHub`}
                      className="grid h-9 w-9 shrink-0 place-items-center border border-white/10 text-white/45 transition hover:border-acid/50 hover:text-acid"
                      href={href}
                      rel="noreferrer"
                      target="_blank"
                    >
                      <Github size={15} />
                    </a>
                  ) : (
                    <span className="grid h-9 w-9 shrink-0 place-items-center border border-white/10 text-white/35">
                      <Icon size={15} />
                    </span>
                  )}
                </div>
                <p className="mt-5 max-w-xl text-sm leading-7 text-white/50">{description}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <span className="border border-white/10 px-2 py-1 font-mono text-[8px] uppercase tracking-[0.08em] text-white/40" key={tag}>
                      {tag}
                    </span>
                  ))}
                </div>
                {href && (
                  <a
                    className="mt-6 inline-flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.12em] text-acid opacity-80 transition group-hover:opacity-100"
                    href={href}
                    rel="noreferrer"
                    target="_blank"
                  >
                    Explorar repositório <ArrowUpRight size={12} />
                  </a>
                )}
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
