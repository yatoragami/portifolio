import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Billboard, OrbitControls } from "@react-three/drei";
import { motion } from "framer-motion";
import { CircleHelp, Orbit } from "lucide-react";
import {
  CanvasTexture,
  DoubleSide,
  Group,
  Quaternion,
  SRGBColorSpace,
  Vector3,
} from "three";
import {
  siGit,
  siGoogleappsscript,
  siJira,
  siJavascript,
  siMysql,
  siNodedotjs,
  siOpenjdk,
  siPostman,
  siReact,
  siTailwindcss,
  siTypescript,
  type SimpleIcon,
} from "simple-icons";

type Technology = {
  name: string;
  group: string;
  description: string;
  status:
    | "Prática profissional"
    | "Conhecimento aplicado"
    | "Em desenvolvimento";
  icon?: SimpleIcon;
};

const technologies: Technology[] = [
  {
    name: "Java",
    group: "DEV",
    description:
      "Lógica de programação e fundamentos aplicados em estudos e exercícios acadêmicos.",
    status: "Conhecimento aplicado",
    icon: siOpenjdk,
  },
  {
    name: "JavaScript",
    group: "DEV",
    description: "Linguagem para interfaces, automações e ecossistema web.",
    status: "Em desenvolvimento",
    icon: siJavascript,
  },
  {
    name: "TypeScript",
    group: "DEV",
    description:
      "Tipagem estática para escrever aplicações front-end mais claras e seguras.",
    status: "Em desenvolvimento",
    icon: siTypescript,
  },
  {
    name: "React",
    group: "WEB",
    description: "Componentização e construção de interfaces web interativas.",
    status: "Em desenvolvimento",
    icon: siReact,
  },
  {
    name: "Tailwind CSS",
    group: "WEB",
    description:
      "Estilização utilitária, responsiva e orientada a componentes.",
    status: "Em desenvolvimento",
    icon: siTailwindcss,
  },
  {
    name: "Node.js",
    group: "DEV",
    description:
      "Ecossistema JavaScript e fundamentos de execução no servidor.",
    status: "Em desenvolvimento",
    icon: siNodedotjs,
  },
  {
    name: "SQL",
    group: "DATA",
    description:
      "Consultas e fundamentos para trabalhar com dados relacionais.",
    status: "Conhecimento aplicado",
    icon: siMysql,
  },
  {
    name: "Postman",
    group: "QA",
    description: "Testes e exploração de APIs REST.",
    status: "Prática profissional",
    icon: siPostman,
  },
  {
    name: "Jira SM",
    group: "OPS",
    description:
      "Fluxos de atendimento, painéis, SLAs e indicadores de serviço.",
    status: "Prática profissional",
    icon: siJira,
  },
  {
    name: "Webhooks",
    group: "INTEGRATION",
    description: "Integração de sistemas e dispositivos com automações.",
    status: "Prática profissional",
  },
  {
    name: "REST APIs",
    group: "QA / DEV",
    description: "Documentação técnica e testes de integrações via API.",
    status: "Prática profissional",
  },
  {
    name: "Git",
    group: "TOOLS",
    description: "Versionamento de código e colaboração em repositórios.",
    status: "Conhecimento aplicado",
    icon: siGit,
  },
  {
    name: "Google Apps Script",
    group: "AUTOMATION",
    description: "Automação de rotinas e conexão entre Jira e Google Sheets.",
    status: "Prática profissional",
    icon: siGoogleappsscript,
  },
  {
    name: "Redes",
    group: "INFRA",
    description:
      "Fundamentos e suporte a redes, estações e equipamentos de infraestrutura.",
    status: "Prática profissional",
  },
];

type GlobeTechnology = Technology & { icon: SimpleIcon };

const globeTechnologies = technologies.filter(
  (technology): technology is GlobeTechnology => technology.icon !== undefined,
);
const textTechnologies = technologies.filter(
  (technology) => technology.icon === undefined,
);
const technologyGroups = [
  { label: "Ferramentas", items: globeTechnologies },
  { label: "Integrações e áreas", items: textTechnologies },
];

function getGlobeTechnologyPosition(index: number, total: number) {
  const phi = Math.acos(-1 + (2 * index) / total);
  const theta = Math.sqrt(total * Math.PI) * phi;

  return {
    x: Math.cos(theta) * Math.sin(phi),
    y: Math.cos(phi),
    z: Math.sin(theta) * Math.sin(phi),
  };
}

function getTechnologyIndex(name: string | null) {
  return globeTechnologies.findIndex((technology) => technology.name === name);
}

function createTechnologyTexture(technology: GlobeTechnology) {
  const canvas = document.createElement("canvas");
  canvas.width = 128;
  canvas.height = 128;
  const context = canvas.getContext("2d");

  if (!context) {
    throw new Error("Não foi possível criar o ícone 3D da tecnologia.");
  }

  const color = "#d7e4dc";
  context.beginPath();
  context.arc(64, 64, 61, 0, Math.PI * 2);
  context.fillStyle = "#09110f";
  context.fill();
  context.lineWidth = 3;
  context.strokeStyle = "#78958a";
  context.stroke();

  context.save();
  context.translate(64, 64);
  context.scale(2.67, 2.67);
  context.translate(-12, -12);
  context.fillStyle = color;
  context.fill(new Path2D(technology.icon.path));

  context.restore();

  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace;
  return texture;
}

function GlobePin({
  technology,
  position,
  active,
  onSelect,
}: {
  technology: GlobeTechnology;
  position: [number, number, number];
  active: boolean;
  onSelect: (technology: Technology) => void;
}) {
  const iconTexture = useMemo(
    () => createTechnologyTexture(technology),
    [technology],
  );

  useEffect(() => () => iconTexture.dispose(), [iconTexture]);

  return (
    <group position={position}>
      <mesh
        onClick={(event) => {
          event.stopPropagation();
          onSelect(technology);
        }}
      >
        <sphereGeometry args={[0.09, 10, 10]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>
      <Billboard follow>
        <mesh position={[0, 0, 0.105]}>
          <planeGeometry args={active ? [0.36, 0.36] : [0.32, 0.32]} />
          <meshBasicMaterial
            map={iconTexture}
            transparent
            depthWrite={false}
            side={DoubleSide}
          />
        </mesh>
      </Billboard>
    </group>
  );
}

function WireGlobe({
  hoveredName,
  selected,
  onSelect,
}: {
  hoveredName: string | null;
  selected: Technology;
  onSelect: (technology: Technology) => void;
}) {
  const globe = useRef<Group>(null);
  const cameraPosition = useRef(new Vector3());
  const globePosition = useRef(new Vector3());
  const cameraDirection = useRef(new Vector3());
  const technologyDirection = useRef(new Vector3());
  const parentRotation = useRef(new Quaternion());
  const targetRotation = useRef(new Quaternion());

  useFrame(({ camera }, delta) => {
    if (!globe.current) return;

    const index = getTechnologyIndex(hoveredName);
    if (index >= 0) {
      const position = getGlobeTechnologyPosition(index, globeTechnologies.length);

      camera.getWorldPosition(cameraPosition.current);
      globe.current.getWorldPosition(globePosition.current);
      cameraDirection.current
        .copy(cameraPosition.current)
        .sub(globePosition.current)
        .normalize();

      if (globe.current.parent) {
        globe.current.parent.getWorldQuaternion(parentRotation.current);
        cameraDirection.current.applyQuaternion(
          parentRotation.current.invert(),
        );
      }

      technologyDirection.current
        .set(position.x, position.y, position.z)
        .normalize();
      targetRotation.current.setFromUnitVectors(
        technologyDirection.current,
        cameraDirection.current,
      );
      globe.current.quaternion.slerp(
        targetRotation.current,
        1 - Math.exp(-delta * 6),
      );
      return;
    }

    globe.current.rotation.y += delta * 0.11;
  });

  return (
    <group ref={globe}>
      <mesh>
        <sphereGeometry args={[1.38, 40, 32]} />
        <meshStandardMaterial
          color="#07372f"
          emissive="#04251f"
          emissiveIntensity={1.2}
          roughness={0.65}
          metalness={0.15}
        />
      </mesh>
      <mesh>
        <sphereGeometry args={[1.395, 28, 22]} />
        <meshBasicMaterial
          color="#42f5c5"
          wireframe
          transparent
          opacity={0.28}
        />
      </mesh>
      {globeTechnologies.map((technology, index) => {
        const { x, y, z } = getGlobeTechnologyPosition(
          index,
          globeTechnologies.length,
        );
        const radius = 1.46;
        const position: [number, number, number] = [
          radius * x,
          radius * y,
          radius * z,
        ];
        return (
          <GlobePin
            active={selected.name === technology.name}
            key={technology.name}
            onSelect={onSelect}
            position={position}
            technology={technology}
          />
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
  const [hoveredName, setHoveredName] = useState<string | null>(null);
  const selectTechnology = (technology: Technology) => setSelected(technology);

  return (
    <section
      className="relative overflow-hidden px-5 py-24 sm:px-8 sm:py-36"
      id="toolchain"
    >
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_55%_45%,rgba(15,77,65,.2),transparent_50%)]"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-7xl">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow">
              <span>02</span> // ecossistema
            </p>
            <h2 className="section-title mt-5">
              Minha <span className="text-acid">toolchain.</span>
            </h2>
          </div>
          <p className="max-w-md text-sm leading-7 text-white/45">
            Ferramentas que conectam suporte, qualidade e desenvolvimento.
            Selecione um nó para explorar.
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.2fr_.8fr] lg:items-center">
          <div className="relative mx-auto h-[23rem] w-full max-w-xl sm:h-[31rem] lg:col-start-1">
            <div className="absolute inset-0 rounded-full bg-signal/[0.045] blur-3xl" />
            <Canvas camera={{ position: [0, 0, 4.8], fov: 40 }} dpr={[1, 1.5]}>
              <ambientLight intensity={0.75} />
              <pointLight color="#42f5c5" intensity={20} position={[3, 3, 4]} />
              <pointLight
                color="#b8ff3b"
                intensity={8}
                position={[-3, -2, -3]}
              />
              <Suspense fallback={null}>
                <WireGlobe
                  hoveredName={hoveredName}
                  onSelect={selectTechnology}
                  selected={selected}
                />
              </Suspense>
              <OrbitControls enablePan={false} enableZoom={false} />
            </Canvas>
            <div className="pointer-events-none absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-2 font-mono text-[9px] uppercase tracking-[0.14em] text-white/35">
              <Orbit size={12} /> arraste para orbitar
            </div>
          </div>

          <div className="relative border border-white/10 bg-[#090e10]/80 p-5 sm:p-7 lg:col-start-2">
            <div className="flex items-center justify-between border-b border-white/10 pb-4 font-mono text-[9px] uppercase tracking-[0.14em] text-white/35">
              <span>Tool / {selected.group}</span>
              <span className="flex items-center gap-2 text-signal">
                <span className="h-1 w-1 animate-pulse rounded-full bg-acid" />{" "}
                Node active
              </span>
            </div>
            <svg
              aria-hidden="true"
              className="tech-circuit-bridge pointer-events-none absolute -left-16 top-24 hidden h-16 w-16 overflow-visible lg:block"
              viewBox="0 0 64 64"
            >
              <motion.path
                initial={{ opacity: 0.35, pathLength: 0.18 }}
                animate={{
                  pathLength: hoveredName ? 1 : 0.18,
                  opacity: hoveredName ? 1 : 0.35,
                }}
                d="M 0 32 H 64"
                fill="none"
                stroke="#42f5c5"
                strokeDasharray="4 4"
                strokeWidth="1.5"
                transition={{ duration: 0.25 }}
              />
              <motion.circle
                initial={{ opacity: 0.25, scale: 0.65 }}
                animate={{
                  opacity: hoveredName ? 1 : 0.25,
                  scale: hoveredName ? 1 : 0.65,
                }}
                cx="64"
                cy="32"
                fill="#b8ff3b"
                r="3"
                transition={{ duration: 0.25 }}
              />
            </svg>
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              className="min-h-[13.5rem] py-6"
              key={selected.name}
              initial={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.2 }}
            >
              <h3 className="whitespace-nowrap font-display text-2xl font-semibold text-paper sm:text-3xl">
                {selected.name}
              </h3>
              <p className="tech-description mt-4 text-sm leading-7 text-white/55">
                {selected.description}
              </p>
              <p className="mt-5 inline-flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.1em] text-acid">
                <span className="h-1.5 w-1.5 rounded-full bg-acid" />{" "}
                {selected.status}
              </p>
            </motion.div>
            <div className="space-y-4">
              {technologyGroups.map(({ label, items }) => (
                <div key={label}>
                  <p className="mb-2 font-mono text-[8px] uppercase tracking-[0.12em] text-white/30">
                    {label}
                  </p>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                    {items.map((technology) => (
                      <button
                        aria-pressed={selected.name === technology.name}
                        className={`border px-2.5 py-2 text-left font-mono text-[9px] transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-acid ${
                          selected.name === technology.name
                            ? "border-signal/55 bg-signal/10 text-signal"
                            : "border-white/10 text-white/45 hover:border-white/30 hover:text-white/80"
                        }`}
                        key={technology.name}
                        onFocus={() => {
                          setSelected(technology);
                          setHoveredName(
                            technology.icon ? technology.name : null,
                          );
                        }}
                        onBlur={() => setHoveredName(null)}
                        onMouseEnter={() => {
                          setSelected(technology);
                          setHoveredName(
                            technology.icon ? technology.name : null,
                          );
                        }}
                        onMouseLeave={() => setHoveredName(null)}
                        onClick={() => selectTechnology(technology)}
                        type="button"
                      >
                        {technology.name}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-5 flex items-start gap-2 font-mono text-[9px] leading-5 text-white/30">
              <CircleHelp className="mt-0.5 shrink-0" size={12} />
              As etiquetas diferenciam experiência profissional, conhecimento
              aplicado e ferramentas em desenvolvimento.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
