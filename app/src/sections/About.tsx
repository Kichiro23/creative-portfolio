import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MapPin, Mail, Phone, Award, ShieldCheck, Zap, Users, Clock } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const certifications = [
  "Cisco Networking Academy: Introduction to Packet Tracer, Networking Basics, Introduction to Cybersecurity",
  "Huawei ICT Academy: Introduction to AI, Introduction to Cloud Computing, Networking Protocols & Internet Basics, Network Communications & Network Access Basics, HCIA v3.5, Ethical Hacker, Overview of Artificial Intelligence",
];

const attributes = [
  { icon: <Zap className="w-4 h-4" />, label: "Self-motivated with minimal supervision" },
  { icon: <Clock className="w-4 h-4" />, label: "Reliable, punctual, and deadline-driven" },
  { icon: <Users className="w-4 h-4" />, label: "Manages multiple tasks simultaneously" },
  { icon: <ShieldCheck className="w-4 h-4" />, label: "Works effectively under pressure" },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".about-img", { opacity: 0, scale: 0.92 }, {
        opacity: 1, scale: 1, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%", toggleActions: "play none none reverse" },
      });
      gsap.fromTo(".about-text > *", { opacity: 0, y: 30 }, {
        opacity: 1, y: 0, duration: 0.8, ease: "power3.out", stagger: 0.12,
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%", toggleActions: "play none none reverse" },
      });
      gsap.fromTo(".about-attr", { opacity: 0, y: 20 }, {
        opacity: 1, y: 0, duration: 0.6, ease: "power3.out", stagger: 0.08,
        scrollTrigger: { trigger: ".about-attr-grid", start: "top 85%", toggleActions: "play none none reverse" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative w-full py-24 md:py-32 lg:py-40 overflow-hidden"
      style={{ background: "var(--bg-void)" }}
    >
      <div className="absolute top-0 left-1/4 w-[400px] h-[400px] rounded-full pointer-events-none opacity-15" style={{ background: "radial-gradient(circle, var(--accent-mint), transparent 70%)", filter: "blur(90px)" }} />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Image column */}
          <div className="about-img opacity-0 relative mx-auto lg:mx-0">
            <div
              className="relative overflow-hidden glow-coral"
              style={{ borderRadius: 32, width: "100%", maxWidth: 420, aspectRatio: "3/4" }}
            >
              <img
                src="/about-bg.jpg"
                alt="Rommel Andrei De Leon"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>
            <div className="absolute -bottom-5 -right-5 lg:bottom-6 lg:-right-8 liquid-glass p-4" style={{ borderRadius: 20 }}>
              <div className="relative z-10 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, var(--accent-coral), var(--accent-amber))" }}>
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-xs" style={{ color: "var(--text-muted)" }}>Based in</p>
                  <p className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>Malolos, Philippines</p>
                </div>
              </div>
            </div>
          </div>

          {/* Text column */}
          <div className="about-text">
            <span className="inline-block text-xs font-medium tracking-[0.15em] uppercase mb-4" style={{ color: "var(--accent-coral)" }}>
              About Me
            </span>

            <h2
              className="font-semibold tracking-tight leading-tight mb-6 text-balance"
              style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)", color: "var(--text-primary)", letterSpacing: "-0.02em" }}
            >
              Building digital solutions that bridge{" "}
              <span className="text-gradient-violet">creativity</span> and{" "}
              <span className="text-gradient-coral">technology</span>
            </h2>

            <p className="mb-4" style={{ fontSize: 16, color: "var(--text-secondary)", lineHeight: 1.7, letterSpacing: "-0.01em" }}>
              I&apos;m a versatile full-stack developer and technical solutions expert with over 5
              years of freelance experience across IT support, multimedia production, and software
              development. I specialize in delivering end-to-end digital solutions.
            </p>

            <p className="mb-6" style={{ fontSize: 16, color: "var(--text-secondary)", lineHeight: 1.7, letterSpacing: "-0.01em" }}>
              From managing cloud-hosted environments and building full-stack applications like
              WeatherCarp to producing 200+ graphic and video outputs for diverse clients.
            </p>

            <div className="flex flex-wrap gap-4 mb-8">
              <span className="flex items-center gap-2 text-sm" style={{ color: "var(--text-muted)" }}>
                <Mail className="w-4 h-4" style={{ color: "var(--accent-coral)" }} /> rommeld216@gmail.com
              </span>
              <span className="flex items-center gap-2 text-sm" style={{ color: "var(--text-muted)" }}>
                <Phone className="w-4 h-4" style={{ color: "var(--accent-coral)" }} /> +63 962 790 5910
              </span>
            </div>

            {/* Certifications */}
            <div className="mb-8">
              <h3 className="text-sm font-semibold mb-3 flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
                <Award className="w-4 h-4" style={{ color: "var(--accent-amber)" }} /> Certifications
              </h3>
              <ul className="space-y-2">
                {certifications.map((cert, i) => (
                  <li key={i} className="text-sm pl-4 relative" style={{ color: "var(--text-secondary)", lineHeight: 1.6 }}>
                    <span className="absolute left-0 top-2 w-1.5 h-1.5 rounded-full" style={{ background: "var(--accent-coral)" }} />
                    {cert}
                  </li>
                ))}
              </ul>
            </div>

            {/* Core attributes */}
            <div className="about-attr-grid grid grid-cols-1 sm:grid-cols-2 gap-3">
              {attributes.map((attr, i) => (
                <div
                  key={i}
                  className="about-attr opacity-0 flex items-center gap-2.5 p-3 rounded-2xl"
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}
                >
                  <span style={{ color: "var(--accent-mint)" }}>{attr.icon}</span>
                  <span className="text-sm" style={{ color: "var(--text-secondary)" }}>{attr.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
