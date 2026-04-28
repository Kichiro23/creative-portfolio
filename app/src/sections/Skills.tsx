import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { api } from "@/lib/api";
import { Code2, Database, Cloud, Palette, Shield, Layout, Server, Wrench } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface Skill {
  _id: string;
  name: string;
  category: string;
  proficiency: number;
}

const iconMap: Record<string, React.ReactNode> = {
  Programming: <Code2 className="w-5 h-5" />,
  "Full Stack": <Layout className="w-5 h-5" />,
  Database: <Database className="w-5 h-5" />,
  Cloud: <Cloud className="w-5 h-5" />,
  Creative: <Palette className="w-5 h-5" />,
  Security: <Shield className="w-5 h-5" />,
  "IT & Systems": <Server className="w-5 h-5" />,
  Tools: <Wrench className="w-5 h-5" />,
};

const accentColors = [
  "var(--accent-coral)",
  "var(--accent-violet)",
  "var(--accent-mint)",
  "var(--accent-amber)",
  "var(--accent-pink)",
  "var(--accent-coral)",
  "var(--accent-violet)",
  "var(--accent-mint)",
];

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    api.portfolio.skills()
      .then((res) => setSkills(res.data))
      .catch(() => setSkills([]))
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    if (!skills.length || isLoading) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(".skill-card", { opacity: 0, y: 30 }, {
        opacity: 1, y: 0, duration: 0.7, ease: "power3.out", stagger: 0.1,
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%", toggleActions: "play none none reverse" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [skills, isLoading]);

  const grouped = skills.reduce<Record<string, Skill[]>>((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {});

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative w-full py-24 md:py-32 lg:py-40 overflow-hidden"
      style={{ background: "var(--bg-void)" }}
    >
      <div className="absolute top-1/3 right-0 w-[350px] h-[350px] rounded-full pointer-events-none opacity-15" style={{ background: "radial-gradient(circle, var(--accent-mint), transparent 70%)", filter: "blur(80px)" }} />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <span className="inline-block text-xs font-medium tracking-[0.15em] uppercase mb-4" style={{ color: "var(--accent-mint)" }}>
            Technical Arsenal
          </span>
          <h2
            className="font-semibold tracking-tight"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "var(--text-primary)", letterSpacing: "-0.02em" }}
          >
            Skills & <span className="text-gradient-mint">Expertise</span>
          </h2>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="rounded-[28px] animate-pulse" style={{ background: "var(--bg-surface)", height: 240 }} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {Object.entries(grouped).map(([category, items], catIndex) => (
              <div key={category} className="skill-card opacity-0 liquid-glass p-5 sm:p-6">
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-5">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ background: "rgba(255,255,255,0.06)", color: accentColors[catIndex % accentColors.length] }}
                    >
                      {iconMap[category] || <Code2 className="w-5 h-5" />}
                    </div>
                    <h3 className="font-semibold text-base" style={{ color: "var(--text-primary)" }}>{category}</h3>
                  </div>

                  <div className="space-y-3 sm:space-y-4">
                    {items.map((skill) => (
                      <div key={skill._id}>
                        <div className="flex justify-between items-center mb-1.5">
                          <span className="text-sm" style={{ color: "var(--text-primary)" }}>{skill.name}</span>
                          <span className="text-xs font-mono" style={{ color: "var(--text-muted)" }}>{skill.proficiency ?? 0}%</span>
                        </div>
                        <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${skill.proficiency ?? 0}%`,
                              background: `linear-gradient(90deg, ${accentColors[catIndex % accentColors.length]}, transparent 180%)`,
                              transition: "width 1.2s ease",
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
