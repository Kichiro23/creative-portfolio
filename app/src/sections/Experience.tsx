import { useEffect, useRef, useState } from "react";
import { Briefcase, Calendar, ExternalLink } from "lucide-react";

const experiences = [
  {
    role: "IT & Technical Support Specialist",
    company: "Freelance",
    period: "2020 – Present",
    bullets: [
      "Delivered end-to-end IT services to 4+ clients — covering network setup, hardware/software troubleshooting, website management, and performance monitoring.",
      "Managed cloud-hosted environments, ensuring uptime, data integrity, and smooth operations for client sites.",
    ],
    tags: ["Network Setup", "Cloud Hosting", "Troubleshooting", "System Admin"],
  },
  {
    role: "Social Media Manager",
    company: "Freelance",
    period: "2022 – 2024",
    bullets: [
      "Managed accounts for 5+ brands across food, retail, and events — handling content planning, creation, scheduling, and audience engagement.",
      "Consistently met weekly content deadlines across multiple clients without supervision.",
    ],
    tags: ["Content Strategy", "Brand Management", "Scheduling", "Engagement"],
  },
  {
    role: "Graphic Designer & Video Editor",
    company: "Freelance",
    period: "2020 – 2024",
    bullets: [
      "Produced 200+ graphic and video outputs (reels, AVPs, promotional clips, banners) for clients in food, retail, events, and service industries.",
    ],
    tags: ["Adobe Premiere", "After Effects", "Photoshop", "Canva", "CapCut"],
  },
];

export default function Experience() {
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
      id="experience"
      className="relative py-24 md:py-32 px-4 sm:px-6"
    >
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-6">
            <span className="w-2 h-2 rounded-full bg-[var(--accent-teal)] animate-pulse" />
            <span className="text-sm font-medium text-[var(--text-secondary)]">Work Experience</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--text-primary)] tracking-tight mb-4">
            Proven track record of{" "}
            <span className="text-gradient-teal">delivery</span>
          </h2>
          <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
            Years of freelance experience delivering results across IT, creative, and digital marketing domains.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-[var(--accent-indigo)] via-[var(--accent-slate)] to-[var(--accent-teal)] opacity-25" />

          <div className="space-y-8">
            {experiences.map((exp, i) => (
              <div
                key={exp.role}
                className={`relative pl-16 md:pl-20 transition-all duration-700 ${
                  inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-6"
                }`}
                style={{ transitionDelay: `${i * 150}ms` }}
              >
                {/* Dot */}
                <div className="absolute left-4 md:left-6 top-2 w-4 h-4 rounded-full border-2 border-[var(--accent-indigo)] bg-[var(--bg-void)] z-10" />

                <div className="glass-card p-6 md:p-8">
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <Briefcase className="w-4 h-4 text-[var(--accent-indigo)]" />
                    <h3 className="text-lg font-semibold text-[var(--text-primary)]">
                      {exp.role}
                    </h3>
                    <span className="text-sm text-[var(--text-muted)]">| {exp.company}</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-[var(--text-muted)] mb-4">
                    <Calendar className="w-3.5 h-3.5" />
                    {exp.period}
                  </div>

                  <ul className="space-y-2 mb-4">
                    {exp.bullets.map((bullet, bi) => (
                      <li
                        key={bi}
                        className="text-sm text-[var(--text-secondary)] leading-relaxed flex items-start gap-2"
                      >
                        <ExternalLink className="w-3 h-3 mt-1 shrink-0 text-[var(--text-muted)]" />
                        {bullet}
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2">
                    {exp.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-xs font-medium rounded-full bg-white/5 text-[var(--text-secondary)] border border-white/5"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
