import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const bootLines = [
  "User_Identity: Vinícius Ferreira da Silva",
  "Location: Manaus - Amazonas | Status: Online",
  "Core_Objective: Software Development & Quality Assurance",
];

type TerminalHeroProps = {
  onComplete: () => void;
};

export default function TerminalHero({ onComplete }: TerminalHeroProps) {
  const [started, setStarted] = useState(false);
  const [lineIndex, setLineIndex] = useState(0);
  const [characterIndex, setCharacterIndex] = useState(0);
  const completedRef = useRef(false);

  const start = useCallback(() => setStarted(true), []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter" && !started) start();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [start, started]);

  useEffect(() => {
    if (!started || completedRef.current) return;
    if (lineIndex >= bootLines.length) {
      completedRef.current = true;
      const timeout = window.setTimeout(onComplete, 700);
      return () => window.clearTimeout(timeout);
    }

    const currentLine = bootLines[lineIndex];
    if (characterIndex >= currentLine.length) {
      const timeout = window.setTimeout(() => {
        setLineIndex((index) => index + 1);
        setCharacterIndex(0);
      }, 180);
      return () => window.clearTimeout(timeout);
    }

    const timeout = window.setTimeout(
      () => setCharacterIndex((index) => index + 1),
      characterIndex < 2 ? 110 : 14,
    );
    return () => window.clearTimeout(timeout);
  }, [characterIndex, lineIndex, onComplete, started]);

  return (
    <motion.main
      className="terminal-screen relative grid min-h-[100svh] place-items-center overflow-hidden bg-[#030506] px-5 py-12 font-mono text-[#c8d8d1]"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.02, filter: "blur(7px)" }}
      transition={{ duration: 0.7 }}
    >
      <div className="terminal-grid pointer-events-none absolute inset-0 opacity-50" />
      <div className="scanlines pointer-events-none absolute inset-0 opacity-25" />
      <section aria-label="Terminal de inicialização" className="relative w-full max-w-3xl">
        <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-3 text-[9px] uppercase tracking-[0.2em] text-white/35 sm:text-[10px]">
          <span>Wired access terminal / VF-01</span>
          <span className="text-signal">Sinal ativo</span>
        </div>
        <div className="min-h-[18rem] border border-signal/20 bg-[#050b0a]/85 p-5 shadow-[0_0_70px_rgba(66,245,197,.07)] sm:p-9">
          <div className="mb-7 text-[10px] leading-6 text-white/35 sm:text-xs">
            <p>SPIRAL CORE INITIALIZATION</p>
            <p>ESTABLISHING CONNECTION TO THE WIRED...</p>
            <p className="text-signal">[ OK ] INPUT CHANNEL READY</p>
          </div>
          {!started ? (
            <div>
              <p className="text-xs leading-7 text-white/65 sm:text-sm">
                Você encontrou uma frequência. Quer descobrir quem está do outro lado?
              </p>
              <button
                className="mt-8 inline-flex items-center gap-3 border border-acid/50 px-4 py-3 text-[10px] uppercase tracking-[0.15em] text-acid transition hover:bg-acid hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-acid"
                onClick={start}
                type="button"
              >
                [ Enter ] iniciar sequência <ArrowRight size={14} />
              </button>
              <p className="mt-4 text-[9px] text-white/30">Pressione Enter ou selecione o comando.</p>
            </div>
          ) : (
            <div aria-live="polite" className="space-y-3 text-[10px] leading-6 sm:text-sm">
              {bootLines.map((line, index) => {
                const visibleText =
                  index < lineIndex
                    ? line
                    : index === lineIndex
                      ? line.slice(0, characterIndex)
                      : "";
                return (
                  <p className="min-h-6 break-words" key={line}>
                    <span className="text-acid">&gt;</span> {visibleText}
                    {index === lineIndex && <span className="cursor-block ml-1 inline-block h-3 w-1.5 bg-acid align-middle" />}
                  </p>
                );
              })}
              {lineIndex >= bootLines.length && <p className="text-signal">&gt; Signal established_</p>}
            </div>
          )}
        </div>
        <p className="mt-4 text-[9px] uppercase tracking-[0.14em] text-white/25">
          Security level: public <span className="mx-2">/</span> User session: guest
        </p>
      </section>
    </motion.main>
  );
}
