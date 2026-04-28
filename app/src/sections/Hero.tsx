import { useEffect, useRef, useState } from "react";
import { ArrowDown, Mail, MapPin, Phone } from "lucide-react";

export default function Hero() {
  const [visible, setVisible] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  const scrollToAbout = () => {
    document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 sm:px-6"
    >
      {/* Depth layers */}
      <div className="absolute inset-0 z-0">
        <div className="glow-orb w-[500px] h-[500px] bg-[var(--accent-indigo)] top-[-10%] left-[-10%] animate-pulse-glow" />
        <div className="glow-orb w-[400px] h-[400px] bg-[var(--accent-slate)] bottom-[-10%] right-[-10%] animate-pulse-glow" style={{ animationDelay: "2s" }} />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto w-full pt-40 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Text Content */}
          <div
            className={`transition-all duration-1000 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-8">
              <span className="w-2 h-2 rounded-full bg-[var(--accent-indigo)] animate-pulse" />
              <span className="text-sm font-medium text-[var(--text-secondary)]">
                Available for freelance work
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-[1.1] mb-6">
              <span className="text-[var(--text-primary)]">Building</span>
              <br />
              <span className="text-gradient-indigo">intelligent</span>
              <br />
              <span className="text-[var(--text-primary)]">solutions</span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg sm:text-xl text-[var(--text-secondary)] leading-relaxed mb-4 max-w-lg">
              Rommel Andrei De Leon — Full Stack Developer, AI Automation Engineer & Creative Professional crafting premium digital experiences.
            </p>

            {/* Location / Contact line */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-[var(--text-muted)] mb-10">
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" />
                Malolos, Bulacan, Philippines
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5" />
                +63 962 790 5910
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5" />
                rommeld216@gmail.com
              </span>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4">
              <a href="mailto:rommeld216@gmail.com" className="btn-glow">
                Get in Touch
              </a>
              <button onClick={scrollToAbout} className="btn-ghost">
                View My Work
                <ArrowDown className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right: Profile + Cards */}
          <div
            className={`relative transition-all duration-1000 delay-300 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="grid grid-cols-2 gap-4">
              {/* Profile Photo Card */}
              <div className="col-span-2 glass-card p-2">
                <div className="flex items-center gap-5 p-4">
                  <div className="relative shrink-0">
                    <div className="w-20 h-20 rounded-2xl overflow-hidden ring-2 ring-[var(--accent-indigo)]/20">
                      <img
                        src="/profile.jpg"
                        alt="Rommel Andrei De Leon"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[var(--accent-teal)] border-2 border-[var(--bg-surface)]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[var(--text-primary)]">
                      Rommel Andrei De Leon
                    </h3>
                    <p className="text-sm text-[var(--text-secondary)]">
                      Full Stack Developer · AI Engineer · Creative Pro
                    </p>
                    <div className="flex gap-2 mt-3">
                      <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-[var(--accent-indigo)]/10 text-[var(--accent-indigo)] border border-[var(--accent-indigo)]/10">
                        Open to Remote
                      </span>
                      <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-[var(--accent-slate)]/10 text-[var(--accent-slate)] border border-[var(--accent-slate)]/10">
                        Part-Time
                      </span>
                    </div>
                  </div>
                </div>
                {/* Mini skill bars */}
                <div className="px-4 pb-4 space-y-3">
                  {[
                    { label: "Full Stack Development", val: 95, color: "var(--accent-indigo)" },
                    { label: "AI & Automation", val: 90, color: "var(--accent-slate)" },
                    { label: "Cloud & DevOps", val: 85, color: "var(--accent-teal)" },
                    { label: "Creative & Design", val: 88, color: "var(--accent-cyan)" },
                  ].map((s) => (
                    <div key={s.label}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-[var(--text-secondary)]">{s.label}</span>
                        <span className="text-[var(--text-muted)]">{s.val}%</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-1000"
                          style={{
                            width: visible ? `${s.val}%` : "0%",
                            background: s.color,
                            transitionDelay: "0.6s",
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stats Cards */}
              <div className="glass-card p-5 text-center">
                <div className="text-3xl font-bold text-gradient-indigo">5+</div>
                <div className="text-xs text-[var(--text-secondary)] mt-1">Years Experience</div>
              </div>
              <div className="glass-card p-5 text-center">
                <div className="text-3xl font-bold text-gradient-slate">10+</div>
                <div className="text-xs text-[var(--text-secondary)] mt-1">Technologies</div>
              </div>
              <div className="glass-card p-5 text-center">
                <div className="text-3xl font-bold text-gradient-teal">200+</div>
                <div className="text-xs text-[var(--text-secondary)] mt-1">Creative Outputs</div>
              </div>
              <div className="glass-card p-5 text-center">
                <div className="text-3xl font-bold text-gradient-indigo">4+</div>
                <div className="text-xs text-[var(--text-secondary)] mt-1">Active Clients</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[var(--bg-void)] to-transparent z-10 pointer-events-none" />
    </section>
  );
}
