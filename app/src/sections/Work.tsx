import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExternalLink } from "lucide-react";
import { api } from "@/lib/api";

gsap.registerPlugin(ScrollTrigger);

interface Project {
  _id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  techStack: string;
  liveUrl?: string;
  repoUrl?: string;
}

const bgTextStyle: React.CSSProperties = {
  fontSize: "clamp(4rem, 15vw, 12rem)",
  fontWeight: 700,
  color: "transparent",
  WebkitTextStroke: "1px rgba(240, 236, 228, 0.08)",
  letterSpacing: "-0.03em",
  userSelect: "none",
  pointerEvents: "none",
};

export default function Work() {
  const sectionRef = useRef<HTMLElement>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    api.projects.featured()
      .then((res) => setProjects(res.data))
      .catch(() => setProjects([]))
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    if (!projects.length || isLoading) return;
    const cards = sectionRef.current?.querySelectorAll(".work-card");
    if (!cards) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(".work-bg-text", { opacity: 0 }, {
        opacity: 0.06, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%", toggleActions: "play none none reverse" },
      });

      gsap.fromTo(cards, { opacity: 0, y: 60, scale: 0.95 }, {
        opacity: 1, y: 0, scale: 1, duration: 0.9, ease: "power3.out", stagger: 0.2,
        scrollTrigger: { trigger: sectionRef.current, start: "top 60%", toggleActions: "play none none reverse" },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [projects, isLoading]);

  return (
    <section
      ref={sectionRef}
      id="work"
      className="relative w-full py-24 md:py-32 lg:py-40 overflow-hidden"
      style={{ background: "var(--bg-void)" }}
    >
      <div className="work-bg-text absolute inset-0 flex items-center justify-center opacity-0 pointer-events-none">
        <span className="text-center" style={bgTextStyle}>SELECTED WORK</span>
      </div>

      <div className="absolute top-20 right-10 w-[300px] h-[300px] rounded-full pointer-events-none opacity-20" style={{ background: "radial-gradient(circle, var(--accent-violet), transparent 70%)", filter: "blur(80px)" }} />
      <div className="absolute bottom-20 left-10 w-[250px] h-[250px] rounded-full pointer-events-none opacity-15" style={{ background: "radial-gradient(circle, var(--accent-coral), transparent 70%)", filter: "blur(70px)" }} />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 md:mb-20">
          <span className="inline-block text-xs font-medium tracking-[0.15em] uppercase mb-4" style={{ color: "var(--accent-coral)" }}>
            Featured Projects
          </span>
          <h2
            className="font-semibold tracking-tight"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "var(--text-primary)", letterSpacing: "-0.02em" }}
          >
            Things I&apos;ve <span className="text-gradient-violet">built</span>
          </h2>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
            {[1, 2].map((i) => (
              <div key={i} className="rounded-[28px] animate-pulse" style={{ background: "var(--bg-surface)", height: 400 }} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
            {projects.map((project) => (
              <div
                key={project._id}
                className="work-card liquid-glass group cursor-pointer hover:scale-[1.02]"
                data-cursor="view"
              >
                <div className="relative z-10 p-4 sm:p-5">
                  <div className="relative aspect-video overflow-hidden rounded-[20px] mb-5 sm:mb-6">
                    <img
                      src={project.image || "/project-carp.jpg"}
                      alt={project.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                      <div className="liquid-glass w-10 h-10 flex items-center justify-center" style={{ borderRadius: 14 }}>
                        <ExternalLink className="w-4 h-4" style={{ color: "var(--text-primary)" }} />
                      </div>
                    </div>
                  </div>

                  <h3
                    className="font-semibold mb-2"
                    style={{ fontSize: "clamp(1.25rem, 2.5vw, 1.5rem)", color: "var(--text-primary)", letterSpacing: "-0.02em" }}
                  >
                    {project.name}
                  </h3>
                  <p
                    className="mb-4 line-clamp-2"
                    style={{ fontSize: 15, color: "var(--text-secondary)", lineHeight: 1.6 }}
                  >
                    {project.description}
                  </p>
                  {project.techStack && (
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.split(",").slice(0, 5).map((tech) => (
                        <span
                          key={tech.trim()}
                          className="px-3 py-1 text-xs font-medium rounded-full"
                          style={{ background: "rgba(255,255,255,0.06)", color: "var(--text-secondary)", border: "1px solid rgba(255,255,255,0.08)" }}
                        >
                          {tech.trim()}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
