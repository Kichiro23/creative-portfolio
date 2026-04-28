import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { api } from "@/lib/api";
import { ExternalLink } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface Project {
  _id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  techStack: string;
  liveUrl?: string;
}

export default function Projects() {
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
    const ctx = gsap.context(() => {
      gsap.fromTo(".proj-headline", { opacity: 0, y: 20 }, {
        opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%", toggleActions: "play none none reverse" },
      });
      gsap.fromTo(".proj-card", { opacity: 0, y: 30 }, {
        opacity: 1, y: 0, duration: 0.7, ease: "power3.out", stagger: 0.15,
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%", toggleActions: "play none none reverse" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [projects, isLoading]);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative w-full py-24 md:py-32 overflow-hidden"
      style={{ background: "var(--bg-void)" }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <span className="inline-block text-xs font-medium tracking-[0.15em] uppercase mb-4" style={{ color: "var(--accent-coral)" }}>
            Portfolio
          </span>
          <h2
            className="font-semibold tracking-tight"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "var(--text-primary)", letterSpacing: "-0.02em" }}
          >
            Featured <span className="text-gradient-violet">Projects</span>
          </h2>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[1, 2].map((i) => (
              <div key={i} className="rounded-[28px] animate-pulse" style={{ background: "var(--bg-surface)", height: 320 }} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {projects.map((project) => (
              <div
                key={project._id}
                className="proj-card opacity-0 liquid-glass overflow-hidden group"
              >
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={project.image || "/project-carp.jpg"}
                    alt={project.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="relative z-10 p-5 sm:p-6">
                  <h3 className="font-semibold text-lg" style={{ color: "var(--text-primary)" }}>
                    {project.name}
                  </h3>
                  <p className="mt-2 text-sm" style={{ color: "var(--text-secondary)", lineHeight: 1.6 }}>
                    {project.description}
                  </p>
                  {project.techStack && (
                    <div className="flex flex-wrap gap-1.5 mt-4">
                      {project.techStack.split(",").slice(0, 4).map((tech) => (
                        <span
                          key={tech.trim()}
                          className="px-2 py-0.5 text-[11px] font-medium rounded-full"
                          style={{ background: "rgba(255,255,255,0.06)", color: "var(--text-muted)", border: "1px solid rgba(255,255,255,0.08)" }}
                        >
                          {tech.trim()}
                        </span>
                      ))}
                    </div>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center gap-1 text-sm font-medium"
                      style={{ color: "var(--accent-coral)" }}
                    >
                      <ExternalLink className="w-3 h-3" /> Live Demo
                    </a>
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
