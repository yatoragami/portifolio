import { Suspense, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { motion } from "framer-motion";
import { CircleHelp, Orbit } from "lucide-react";
import type { Group } from "three";
import { useRef } from "react";

type Technology = {
  name: string;
  group: string;
  description: string;
  status: "Prática profissional" | "Conhecimento aplicado" | "Em desenvolvimento";
};

const technologies: Technology[] = [
  { name: "Java", group: "DEV", description: "Lógica de programação e fundamentos aplicados em estudos e exercícios acadêmicos.", status: "Conhecimento aplicado" },
  { name: "JavaScript", group: "DEV", description: "Linguagem para interfaces, automações e ecossistema web.", status: "Em desenvolvimento" },
  { name: "TypeScript", group: "DEV", description: "Tipagem estática para escrever aplicações front-end mais claras e seguras.", status: "Em desenvolvimento" },
  { name: "React", group: "WEB", description: "Componentização e construção de interfaces web interativas.", status: "Em desenvolvimento" },
  { name: "Tailwind CSS", group: "WEB", description: "Estilização utilitária, responsiva e orientada a componentes.", status: "Em desenvolvimento" },
  { name: "Node.js", group: "DEV", description: "Ecossistema JavaScript e fundamentos de execução no servidor.", status: "Em desenvolvimento" },
  { name: "SQL", group: "DATA", description: "Consultas e fundamentos para trabalhar com dados relacionais.", status: "Conhecimento aplicado" },
  { name: "Postman", group: "QA", description: "Testes e exploração de APIs REST.", status: "Prática profissional" },
  { name: "Jira SM", group: "OPS", description: "Fluxos de atendimento, painéis, SLAs e indicadores de serviço.", status: "Prática profissional" },
  { name: "Webhooks", group: "INTEGRATION", description: "Integração de sistemas e dispositivos com automações.", status: "Prática profissional" },
  { name: "REST APIs", group: "QA / DEV", description: "Documentação técnica e testes de integrações via API.", status: "Prática profissional" },
  { name: "Git", group: "TOOLS", description: "Versionamento de código e colaboração em repositórios.", status: "Conhecimento aplicado" },
  { name: "Google Apps Script", group: "AUTOMATION", description: "Automação de rotinas e conexão entre Jira e Google Sheets.", status: "Prática profissional" },
  { name: "Redes", group: "INFRA", description: "Fundamentos e suporte a redes, estações e equipamentos de infraestrutura.", status: "Prática profissional" },
];

function WireGlobe({ paused }: { paused: boolean }) {
  const globe = useRef<Group>(null);

  useFrame((_, delta) => {
    if (globe.current) globe.current.rotation.y += delta * (paused ? 0.025 : 0.11);
  });

  return (
    <group ref={globe}>
      <mesh>
        <sphereGeometry args={[1.38, 40, 32]} />
        <meshStandardMaterial color="#07372f" emissive="#04251f" emissiveIntensity={1.2} roughness={0.65} metalness={0.15} />
      </mesh>
      <mesh>
        <sphereGeometry args={[1.395, 28, 22]} />
        <meshBasicMaterial color="#42f5c5" wireframe transparent opacity={0.28} />
      </mesh>
      {technologies.map((technology, index) => {
        const phi = Math.acos(-1 + (2 * index) / technologies.length);
        const theta = Math.sqrt(technologies.length * Math.PI) * phi;
        const radius = 1.4;
        const position: [number, number, number] = [
          radius * Math.cos(theta) * Math.sin(phi),
          radius * Math.cos(phi),
          radius * Math.sin(theta) * Math.sin(phi),
        ];
        return (
          <mesh key={technology.name} position={position}>
            <sphereGeometry args={[0.035, 8, 8]} />
            <meshBasicMaterial color={index % 2 === 0 ? "#b8ff3b" : "#42f5c5"} />
          </mesh>
        );
      })}
      <mesh rotation={[Math.PI / 2.4, 0.2, 0]}>
        <torusGeometry args={[1.62, 0.006, 8, 120]} />
        <meshBasicMaterial color="#b8ff3b" transparent opacity={0.35} />
      </mesh>
    </group>
  );
}

export default function TechGlobe() {
  const [selected, setSelected] = useState(technologies[0]);
  const [hovering, setHovering] = useState(false);

  return (
    <section className="relative overflow-hidden px-5 py-24 sm:px-8 sm:py-36" id="toolchain">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_55%_45%,rgba(15,77,65,.2),transparent_50%)]" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow"><span>02</span> // ecossistema</p>
            <h2 className="section-title mt-5">Minha <span className="text-acid">toolchain.</span></h2>
          </div>
          <p className="max-w-md text-sm leading-7 text-white/45">
            Ferramentas que conectam suporte, qualidade e desenvolvimento. Selecione um nó para explorar.
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.2fr_.8fr] lg:items-center">
          <div
            className="relative mx-auto h-[23rem] w-full max-w-xl sm:h-[31rem]"
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
          >
            <div className="absolute inset-0 rounded-full bg-signal/[0.045] blur-3xl" />
            <Canvas camera={{ position: [0, 0, 4.8], fov: 40 }} dpr={[1, 1.5]}>
              <ambientLight intensity={0.75} />
              <pointLight color="#42f5c5" intensity={20} position={[3, 3, 4]} />
              <pointLight color="#b8ff3b" intensity={8} position={[-3, -2, -3]} />
              <Suspense fallback={null}>
                <WireGlobe paused={hovering} />
              </Suspense>
              <OrbitControls enablePan={false} enableZoom={false} />
            </Canvas>
            <div className="pointer-events-none absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-2 font-mono text-[9px] uppercase tracking-[0.14em] text-white/35">
              <Orbit size={12} /> arraste para orbitar
            </div>
          </div>

          <div className="relative border border-white/10 bg-[#090e10]/80 p-5 sm:p-7">
            <div className="flex items-center justify-between border-b border-white/10 pb-4 font-mono text-[9px] uppercase tracking-[0.14em] text-white/35">
              <span>Tool / {selected.group}</span>
              <span className="text-signal">Node active</span>
            </div>
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              className="py-6"
              key={selected.name}
              initial={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.2 }}
            >
              <h3 className="font-display text-3xl font-semibold text-paper">{selected.name}</h3>
              <p className="mt-4 text-sm leading-7 text-white/55">{selected.description}</p>
              <p className="mt-5 inline-flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.1em] text-acid">
                <span className="h-1.5 w-1.5 rounded-full bg-acid" /> {selected.status}
              </p>
            </motion.div>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {technologies.map((technology) => (
                <button
                  aria-pressed={selected.name === technology.name}
                  className={`border px-2.5 py-2 text-left font-mono text-[9px] transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-acid ${
                    selected.name === technology.name
                      ? "border-signal/55 bg-signal/10 text-signal"
                      : "border-white/10 text-white/45 hover:border-white/30 hover:text-white/80"
                  }`}
                  key={technology.name}
                  onFocus={() => setSelected(technology)}
                  onMouseEnter={() => {
                    setSelected(technology);
                    setHovering(true);
                  }}
                  onMouseLeave={() => setHovering(false)}
                  onClick={() => setSelected(technology)}
                  type="button"
                >
                  {technology.name}
                </button>
              ))}
            </div>
            <p className="mt-5 flex items-start gap-2 font-mono text-[9px] leading-5 text-white/30">
              <CircleHelp className="mt-0.5 shrink-0" size={12} />
              As etiquetas diferenciam experiência profissional, conhecimento aplicado e ferramentas em desenvolvimento.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
