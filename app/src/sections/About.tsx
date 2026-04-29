import { useEffect, useRef, useState } from "react";
import { Code2, Palette, Server, Shield, Wrench, Zap } from "lucide-react";

const attributes = [
  {
    icon: Zap,
    title: "Fast Learner",
    desc: "I pick up new frameworks and tools quickly — usually before the documentation is fully read.",
  },
  {
    icon: Shield,
    title: "Detail Obsessed",
    desc: "Pixel-perfect UI, clean code, and smooth animations. The small things matter.",
  },
  {
    icon: Wrench,
    title: "Problem Solver",
    desc: "I enjoy breaking down complex problems and building things that actually work under pressure.",
  },
  {
    icon: Code2,
    title: "Full Stack",
    desc: "From database schemas to polished interfaces — I handle the entire flow, not just pieces.",
  },
  {
    icon: Server,
    title: "Cloud Native",
    desc: "AWS, GCP, Docker, Kubernetes. I deploy and manage infrastructure that stays up.",
  },
  {
    icon: Palette,
    title: "Creative at Core",
    desc: "200+ graphics and videos for brands. Design thinking isn't an afterthought — it's baked in.",
  },
];

export default function About() {
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-24 md:py-32 px-4 sm:px-6"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-6">
            <span className="w-2 h-2 rounded-full bg-[var(--accent-indigo)] animate-pulse" />
            <span className="text-sm font-medium text-[var(--text-secondary)]">About Me</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--text-primary)] tracking-tight mb-6">
            I build things that{" "}
            <span className="text-gradient-indigo">work beautifully</span>
          </h2>
          <div className="max-w-2xl mx-auto space-y-4 text-[var(--text-secondary)] leading-relaxed">
            <p>
              I'm Rommel — a full-stack developer and AI automation engineer based in the Philippines. 
              I started out fixing networks and editing videos for local brands, then fell deep into code 
              and never really looked back.
            </p>
            <p>
              These days I spend most of my time building web apps, automating workflows with AI, and 
              deploying cloud infrastructure. But I still bring that creative eye from my design days — 
              because functionality without good UX is just a tool nobody wants to use.
            </p>
            <p>
              I've worked with 5+ brands across food, retail, and events. Delivered 200+ creative outputs. 
              Managed IT infrastructure for multiple clients. And somewhere in between, I taught myself 
              React, Python, cloud architecture, and how to make LLMs actually useful.
            </p>
          </div>
        </div>

        {/* Attribute Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {attributes.map((attr, i) => (
            <div
              key={attr.title}
              className={`glass-card p-6 group transition-all duration-700 ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[var(--accent-indigo)]/10 to-[var(--accent-slate)]/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <attr.icon className="w-5 h-5 text-[var(--accent-indigo)]" />
              </div>
              <h3 className="text-base font-semibold text-[var(--text-primary)] mb-1">
                {attr.title}
              </h3>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                {attr.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
