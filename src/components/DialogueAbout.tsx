import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ChevronRight } from "lucide-react";

const dialogue = [
  {
    speaker: "VINÍCIUS",
    text: "Tenho 19 anos e sou estudante de Sistemas de Informação na Fametro, atualmente no 4º período.",
    note: "Manaus, Amazonas // personagem desbloqueado",
  },
  {
    speaker: "VINÍCIUS",
    text: "Minha jornada começou resolvendo problemas de infraestrutura. Foi ali que aprendi a ouvir, investigar e seguir os sinais até a causa.",
    note: "Primeira missão: suporte e infraestrutura",
  },
  {
    speaker: "VINÍCIUS",
    text: "Hoje, minha curiosidade me leva à automação de processos, qualidade de software e construção de sistemas que tornam o trabalho mais simples.",
    note: "Nova rota descoberta: QA + desenvolvimento",
  },
];

export default function DialogueAbout() {
  const [active, setActive] = useState(0);
  const [complete, setComplete] = useState(false);
  const current = dialogue[active];

  const advance = () => {
    if (!complete) {
      setComplete(true);
      return;
    }
    if (active < dialogue.length - 1) {
      setActive((index) => index + 1);
      setComplete(false);
      return;
    }
    document.getElementById("toolchain")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative px-5 py-24 sm:px-8 sm:py-36" id="about">
      <div className="city-scene absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="city-moon" />
        <div className="city-building building-one" />
        <div className="city-building building-two" />
        <div className="city-building building-three" />
        <div className="city-horizon" />
      </div>
      <div className="section-wash absolute inset-0" aria-hidden="true" />
      <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[.65fr_1.35fr] lg:items-center">
        <div>
          <p className="eyebrow"><span>01</span> // personagem</p>
          <h2 className="section-title mt-5">Uma história<br /><span className="text-signal">em construção.</span></h2>
          <p className="mt-6 max-w-sm text-sm leading-7 text-white/50">
            Cada incidente, cada automação e cada teste fizeram parte do caminho. Este é o meu save atual.
          </p>
          <div className="mt-8 flex gap-2" aria-label={`Diálogo ${active + 1} de ${dialogue.length}`}>
            {dialogue.map((line, index) => (
              <span className={`h-1 w-8 transition ${index <= active ? "bg-acid" : "bg-white/15"}`} key={line.note} />
            ))}
          </div>
        </div>
        <div className="dialogue-frame relative mx-auto w-full max-w-2xl">
          <div className="dialogue-topline" />
          <div className="flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.16em] text-signal">
            <span>Memory fragment / 0{active + 1}</span>
            <span>Manaus • 2026</span>
          </div>
          <div className="my-7 flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center border border-acid/30 bg-acid/5 font-display text-sm font-bold text-acid">VF</span>
            <div>
              <p className="font-mono text-[10px] tracking-[0.12em] text-paper">{current.speaker}</p>
              <p className="mt-1 font-mono text-[9px] text-white/30">{current.note}</p>
            </div>
          </div>
          <div className="min-h-32">
            <AnimatePresence mode="wait">
              <motion.p
                animate={{ opacity: 1 }}
                className="font-display text-lg leading-8 text-white/85 sm:text-xl sm:leading-9"
                initial={{ opacity: 0 }}
                key={active}
                transition={{ duration: 0.28 }}
              >
                {current.text.split("").map((character, index) => (
                  <motion.span
                    animate={{ opacity: 1 }}
                    initial={{ opacity: 0.2 }}
                    key={`${active}-${index}`}
                    transition={{ delay: index * 0.012, duration: 0.08 }}
                  >
                    {character}
                  </motion.span>
                ))}
              </motion.p>
            </AnimatePresence>
          </div>
          <button
            className="mt-6 flex w-full items-center justify-between border-t border-white/10 pt-5 text-left font-mono text-[10px] uppercase tracking-[0.12em] text-acid transition hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-acid"
            onClick={advance}
            type="button"
          >
            <span>{complete ? (active === dialogue.length - 1 ? "Seguir para a toolchain" : "Próximo fragmento") : "Clique para continuar"}</span>
            {complete ? <ArrowRight size={15} /> : <ChevronRight className="animate-pulse" size={15} />}
          </button>
        </div>
      </div>
    </section>
  );
}
