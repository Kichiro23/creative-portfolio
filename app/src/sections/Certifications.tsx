import { useEffect, useRef, useState } from "react";
import { Award, CheckCircle } from "lucide-react";

const certifications = [
  {
    org: "Cisco Networking Academy",
    items: [
      "Introduction to Packet Tracer",
      "Networking Basics",
      "Introduction to Cybersecurity",
    ],
    color: "var(--accent-indigo)",
  },
  {
    org: "Huawei ICT Academy",
    items: [
      "Introduction to AI",
      "Introduction to Cloud Computing",
      "Networking Protocols & Internet Basics",
      "Network Communications & Network Access Basics",
      "HCIA v3.5",
      "Ethical Hacker",
      "Overview of Artificial Intelligence",
    ],
    color: "var(--accent-slate)",
  },
];

const coreAttributes = [
  "Strong attention to detail and accuracy",
  "Self-motivated with minimal supervision required",
  "Reliable, punctual, and deadline-driven",
  "Manages multiple tasks simultaneously",
  "Works effectively under pressure",
  "Quick learner and strong problem-solver",
];

export default function Certifications() {
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="certifications"
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
            <span className="w-2 h-2 rounded-full bg-[var(--accent-cyan)] animate-pulse" />
            <span className="text-sm font-medium text-[var(--text-secondary)]">Certifications & Attributes</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--text-primary)] tracking-tight mb-4">
            Always{" "}
            <span className="text-gradient-slate">learning</span> & growing
          </h2>
          <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
            Industry-recognized certifications and the core attributes that drive consistent results.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Certifications */}
          <div
            className={`space-y-6 transition-all duration-700 ${
              inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-6"
            }`}
          >
            <h3 className="text-lg font-semibold text-[var(--text-primary)] flex items-center gap-2">
              <Award className="w-5 h-5 text-[var(--accent-indigo)]" />
              Certifications
            </h3>
            {certifications.map((cert) => (
              <div key={cert.org} className="glass-card p-6">
                <h4 className="text-sm font-semibold text-[var(--text-primary)] mb-4">
                  {cert.org}
                </h4>
                <div className="space-y-2.5">
                  {cert.items.map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-3 text-sm text-[var(--text-secondary)]"
                    >
                      <CheckCircle
                        className="w-4 h-4 shrink-0"
                        style={{ color: cert.color }}
                      />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Core Attributes */}
          <div
            className={`space-y-6 transition-all duration-700 delay-200 ${
              inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-6"
            }`}
          >
            <h3 className="text-lg font-semibold text-[var(--text-primary)] flex items-center gap-2">
              <Award className="w-5 h-5 text-[var(--accent-teal)]" />
              Core Attributes
            </h3>
            <div className="glass-card p-6">
              <div className="space-y-3">
                {coreAttributes.map((attr) => (
                  <div
                    key={attr}
                    className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.03]"
                  >
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[var(--accent-teal)]/15 to-[var(--accent-slate)]/15 flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle className="w-3.5 h-3.5 text-[var(--accent-teal)]" />
                    </div>
                    <span className="text-sm text-[var(--text-secondary)] leading-relaxed">
                      {attr}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick info card */}
            <div className="glass-card p-6">
              <h4 className="text-sm font-semibold text-[var(--text-primary)] mb-3">
                Availability
              </h4>
              <div className="space-y-2 text-sm text-[var(--text-secondary)]">
                <div className="flex justify-between">
                  <span>Status</span>
                  <span className="text-[var(--accent-teal)] font-medium">Open to work</span>
                </div>
                <div className="flex justify-between">
                  <span>Timezone</span>
                  <span>PHT (UTC+8)</span>
                </div>
                <div className="flex justify-between">
                  <span>Work types</span>
                  <span>Remote, Part-Time, Project-Based</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
