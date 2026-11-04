import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Activity, Cable, Cpu, HardDrive, Radio } from "lucide-react";

const milestones = [
  {
    icon: HardDrive,
    number: "01",
    title: "Suporte & infraestrutura",
    detail: "Diagnóstico de hardware e software, atendimento a usuários e modernização da infraestrutura, incluindo DVRs e NVRs.",
    tags: ["Suporte técnico", "Redes", "DVR / NVR"],
  },
  {
    icon: Radio,
    number: "02",
    title: "Administração de sistemas",
    detail: "Evolução do Jira Service Management: fluxos operacionais, painéis, indicadores e acompanhamento de SLAs.",
    tags: ["Jira Service Management", "SLA", "NPS"],
  },
  {
    icon: Cable,
    number: "03",
    title: "Automação & integrações",
    detail: "Integração via Webhooks entre Jira e Google Sheets com Google Apps Script, automatizando cálculos de notas fiscais e reduzindo trabalho manual.",
    tags: ["Webhooks", "Google Apps Script", "APIs REST"],
  },
  {
    icon: Activity,
    number: "04",
    title: "Qualidade & processos",
    detail: "Implementação de NPS, documentação técnica de APIs e padronização de rotinas para tornar processos mais claros e confiáveis.",
    tags: ["Postman", "Documentação", "Processos"],
  },
];

export default function CircuitsExperience() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.75", "end 0.7"],
  });
  const pathLength = useTransform(scrollYProgress, [0, 1], [0.02, 1]);
  const glow = useTransform(scrollYProgress, [0, 1], [0.1, 0.8]);
  const haloOpacity = useTransform(glow, (value) => value * 0.12);

  return (
    <section className="relative overflow-hidden px-5 py-24 sm:px-8 sm:py-36" id="experience" ref={sectionRef}>
      <div className="circuit-backdrop absolute inset-0 opacity-50" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="eyebrow"><span>03</span> // experiência profissional</p>
          <h2 className="section-title mt-5">Do incidente<br />à <span className="text-signal">integração.</span></h2>
          <p className="mt-6 max-w-xl text-sm leading-7 text-white/45">
            Na Tvlar Motors, aprendi que tecnologia funciona melhor quando infraestrutura,
            pessoas e processos estão conectados.
          </p>
        </div>
        <div className="relative mt-16">
          <svg
            aria-hidden="true"
            className="pointer-events-none absolute left-[1.1rem] top-0 hidden h-full w-[2px] overflow-visible md:block"
            preserveAspectRatio="none"
            viewBox="0 0 2 1000"
          >
            <motion.path
              d="M1 0 V1000"
              fill="none"
              stroke="#42f5c5"
              strokeLinecap="round"
              strokeWidth="2"
              style={{ pathLength, opacity: glow }}
            />
            <motion.path
              d="M1 0 V1000"
              fill="none"
              stroke="#b8ff3b"
              strokeLinecap="round"
              strokeWidth="8"
              style={{ pathLength, opacity: haloOpacity, filter: "blur(5px)" }}
            />
          </svg>
          <div className="space-y-5">
            {milestones.map(({ icon: Icon, number, title, detail, tags }, index) => (
              <motion.article
                className="relative grid gap-5 border border-white/10 bg-[#090e10]/85 p-5 transition hover:border-signal/35 sm:p-7 md:ml-12 md:grid-cols-[3rem_1fr_auto] md:items-start"
                initial={{ opacity: 0, y: 26 }}
                key={number}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.45, delay: index * 0.04 }}
              >
                <span className="absolute -left-[3.55rem] top-8 hidden h-3 w-3 rounded-full border-2 border-acid bg-ink shadow-[0_0_18px_rgba(184,255,59,.8)] md:block" />
                <div className="flex items-center gap-4 md:contents">
                  <div className="grid h-11 w-11 shrink-0 place-items-center border border-signal/25 bg-signal/5 text-signal">
                    <Icon size={18} />
                  </div>
                  <div>
                    <p className="font-mono text-[9px] uppercase tracking-[0.15em] text-acid">NODE / {number}</p>
                    <h3 className="mt-2 font-display text-xl font-semibold text-paper sm:text-2xl">{title}</h3>
                  </div>
                </div>
                <div className="md:col-start-2">
                  <p className="max-w-2xl text-sm leading-7 text-white/55">{detail}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <span className="border border-white/10 px-2 py-1 font-mono text-[8px] uppercase tracking-[0.08em] text-white/40" key={tag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <span className="hidden font-mono text-[9px] text-white/25 md:block">TVLAR MOTORS</span>
              </motion.article>
            ))}
          </div>
        </div>
        <div className="mt-10 flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.12em] text-white/35">
          <Cpu className="text-acid" size={14} /> Um caminho contínuo: da infraestrutura à qualidade de software
        </div>
      </div>
    </section>
  );
}
