import { useEffect, useRef, useState } from "react";
import { Code2, Palette, Server, Shield, Wrench, Zap } from "lucide-react";

const attributes = [
  {
    icon: Zap,
    title: "Fast Learner",
    desc: "Quickly adapts to new technologies and frameworks with minimal supervision.",
  },
  {
    icon: Shield,
    title: "Detail Oriented",
    desc: "Strong attention to detail and accuracy in every line of code and design.",
  },
  {
    icon: Wrench,
    title: "Problem Solver",
    desc: "Reliable troubleshooter who works effectively under pressure.",
  },
  {
    icon: Code2,
    title: "Full Stack",
    desc: "End-to-end development from database schema to polished UI.",
  },
  {
    icon: Server,
    title: "Cloud Native",
    desc: "Experienced with AWS, GCP, Azure, Docker, and Kubernetes deployments.",
  },
  {
    icon: Palette,
    title: "Creative Pro",
    desc: "200+ graphic and video outputs for brands across multiple industries.",
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
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--text-primary)] tracking-tight mb-4">
            Solutions Expert &{" "}
            <span className="text-gradient-indigo">Creative Mind</span>
          </h2>
          <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed">
            I bridge the gap between complex technical challenges and beautiful user experiences. 
            With expertise spanning full-stack development, AI automation, cloud infrastructure, 
            and creative production, I deliver end-to-end solutions that scale.
          </p>
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
