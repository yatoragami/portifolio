import { lazy, Suspense, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowDown, ArrowUpRight, Github } from "lucide-react";
import TerminalHero from "./components/TerminalHero";
import DialogueAbout from "./components/DialogueAbout";
import CircuitsExperience from "./components/CircuitsExperience";
import SpiralProjects from "./components/SpiralProjects";
import ContactSection from "./components/ContactSection";

const TechGlobe = lazy(() => import("./components/TechGlobe"));

const navigation = [
  ["01", "Sinal", "#about"],
  ["02", "Toolchain", "#toolchain"],
  ["03", "Experiência", "#experience"],
  ["04", "Projetos", "#projects"],
  ["05", "Contato", "#contact"],
] as const;

function Portfolio() {
  return (
    <motion.main
      className="min-h-screen overflow-hidden bg-ink text-paper"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.9 }}
    >
      <header className="fixed inset-x-0 top-0 z-40 border-b border-white/[0.07] bg-ink/75 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
          <a
            className="font-mono text-xs tracking-[0.16em] text-signal"
            href="#top"
          >
            VF<span className="text-white/35"> / WIRED</span>
          </a>
          <nav
            aria-label="Navegação principal"
            className="hidden items-center gap-6 md:flex"
          >
            {navigation.map(([number, label, href]) => (
              <a className="nav-link" href={href} key={href}>
                <span>{number}</span> {label}
              </a>
            ))}
          </nav>
          <a
            className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.12em] text-white/65 transition hover:text-acid"
            href="https://github.com/yatoragami"
            target="_blank"
            rel="noreferrer"
          >
            <Github size={14} /> GitHub <ArrowUpRight size={12} />
          </a>
        </div>
      </header>

      <section
        id="top"
        className="relative flex min-h-[92svh] items-center px-5 pb-20 pt-32 sm:px-8"
      >
        <div
          className="hero-grid absolute inset-0 opacity-60"
          aria-hidden="true"
        />
        <div
          className="hero-orbit absolute -right-36 top-28 h-[30rem] w-[30rem] rounded-full border border-signal/10 sm:right-0 sm:top-16"
          aria-hidden="true"
        >
          <div className="absolute left-[13%] top-[16%] h-2 w-2 rounded-full bg-acid shadow-[0_0_22px_5px_rgba(184,255,59,.55)]" />
        </div>
        <div className="relative mx-auto grid w-full max-w-7xl items-end gap-12 lg:grid-cols-[1.3fr_.7fr]">
          <div>
            <p className="mb-6 font-mono text-[10px] uppercase tracking-[0.22em] text-signal">
              <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-acid align-middle" />{" "}
              Manaus, AM
            </p>
            <h1 className="max-w-4xl font-display text-[clamp(3.2rem,10vw,8.5rem)] font-bold leading-[0.83] tracking-[-0.075em]">
              Construo
              <br />
              <span className="text-outline">conexões</span>
              <br />
              <span className="text-acid">que escalam.</span>
            </h1>
            <div className="mt-9 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <p className="max-w-lg text-sm leading-7 text-white/55 sm:text-base">
                Sou Vinícius Ferreira: conecto suporte, qualidade e automação
                para transformar problemas reais em sistemas melhores.
              </p>
              <a
                className="group inline-flex shrink-0 items-center gap-3 font-mono text-[10px] uppercase tracking-[0.18em] text-acid"
                href="#about"
              >
                Entrar na narrativa
                <span className="grid h-9 w-9 place-items-center rounded-full border border-acid/35 transition group-hover:bg-acid group-hover:text-ink">
                  <ArrowDown size={14} />
                </span>
              </a>
            </div>
          </div>
          <aside className="relative z-10 ml-auto w-full max-w-sm">
            <div className="hero-portrait-frame relative overflow-hidden border border-signal/25 bg-[#0b1112] p-2 shadow-glow">
              <img
                alt="Vinícius Ferreira da Silva"
                className="hero-portrait block aspect-[4/5] w-full object-cover object-[center_30%]"
                height="960"
                src="/images/vinicius-ferreira.jpeg"
                width="720"
              />
              <div className="pointer-events-none absolute inset-x-2 bottom-2 h-1/2 bg-gradient-to-t from-[#070a0d] via-[#070a0d]/35 to-transparent" />
              <div className="absolute inset-x-5 bottom-5 flex items-end justify-between font-mono">
                <div>
                  <p className="text-[9px] uppercase tracking-[0.15em] text-signal">
                    Vinícius Ferreira
                  </p>
                  <p className="mt-1 text-[9px] text-white/55">
                    QA / SOFTWARE / INFRA
                  </p>
                </div>
                <span className="h-2 w-2 rounded-full bg-acid shadow-[0_0_16px_4px_rgba(184,255,59,.45)]" />
              </div>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-3 font-mono text-[9px] uppercase tracking-[0.1em] text-white/40">
              <span>Manaus, AM</span>
              <span className="text-right text-acid">Sinal ativo</span>
            </div>
          </aside>
        </div>
      </section>

      <div className="section-rule" aria-hidden="true" />
      <DialogueAbout />
      <Suspense
        fallback={<div aria-hidden="true" className="min-h-[40rem] bg-ink" />}
      >
        <TechGlobe />
      </Suspense>
      <CircuitsExperience />
      <SpiralProjects />
      <ContactSection />
    </motion.main>
  );
}

export default function App() {
  const [unlocked, setUnlocked] = useState(false);

  return (
    <AnimatePresence mode="wait">
      {unlocked ? (
        <Portfolio key="portfolio" />
      ) : (
        <TerminalHero key="terminal" onComplete={() => setUnlocked(true)} />
      )}
    </AnimatePresence>
  );
}
