import { useEffect, useRef } from "react";
import { ArrowDown } from "lucide-react";
import gsap from "gsap";
import FluidShader from "./FluidShader";

interface HeroProps {
  intensity: number;
}

export default function Hero({ intensity }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.3 });
    tl.fromTo(".hero-title", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" })
      .fromTo(".hero-subtitle", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1, ease: "power3.out" }, "-=0.7")
      .fromTo(".hero-hint", { opacity: 0 }, { opacity: 1, duration: 0.8, ease: "power2.out" }, "-=0.3");

    gsap.to(arrowRef.current, { y: 8, duration: 1.5, ease: "sine.inOut", repeat: -1, yoyo: true });

    return () => { tl.kill(); };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative w-full h-screen flex items-center justify-center overflow-hidden"
    >
      <FluidShader intensity={intensity} />

      {/* Subtle glow orbs */}
      <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] rounded-full opacity-20 pointer-events-none" style={{ background: "radial-gradient(circle, var(--accent-coral), transparent 70%)", filter: "blur(100px)" }} />
      <div className="absolute bottom-1/4 right-1/3 w-[400px] h-[400px] rounded-full opacity-15 pointer-events-none" style={{ background: "radial-gradient(circle, var(--accent-violet), transparent 70%)", filter: "blur(80px)" }} />

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* Liquid glass badge */}
        <div className="hero-title opacity-0 inline-flex mb-8">
          <div className="liquid-glass px-5 py-2.5 flex items-center gap-2">
            <span className="relative z-10 text-sm font-medium" style={{ color: "var(--text-secondary)" }}>
              Open to Remote, Part-Time & Project-Based Work
            </span>
          </div>
        </div>

        <h1
          className="hero-title opacity-0 font-semibold tracking-tight leading-none"
          style={{ fontSize: "clamp(3rem, 10vw, 7rem)", color: "var(--text-primary)", letterSpacing: "-0.03em" }}
        >
          Rommel Andrei
          <br />
          <span className="text-gradient-coral">De Leon</span>
        </h1>

        <p
          className="hero-subtitle opacity-0 mt-6 mx-auto max-w-2xl"
          style={{ fontSize: "clamp(1rem, 2vw, 1.35rem)", color: "var(--text-secondary)", letterSpacing: "-0.01em", lineHeight: 1.5 }}
        >
          Full Stack Developer · AI Automation Engineer · Creative Technologist
        </p>

        <div className="hero-subtitle opacity-0 mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" }); }}
            className="btn-glow"
          >
            Start a Project
          </a>
          <a
            href="#work"
            onClick={(e) => { e.preventDefault(); document.querySelector("#work")?.scrollIntoView({ behavior: "smooth" }); }}
            className="btn-ghost"
          >
            View My Work
          </a>
        </div>
      </div>

      <div className="hero-hint opacity-0 absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <span className="text-xs tracking-[0.15em] uppercase" style={{ color: "var(--text-muted)" }}>Scroll</span>
        <div ref={arrowRef} style={{ color: "var(--text-muted)" }}>
          <ArrowDown className="w-5 h-5" />
        </div>
      </div>
    </section>
  );
}
