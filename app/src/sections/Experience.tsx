import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { api } from "@/lib/api";
import { Calendar, MapPin } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface ExperienceItem {
  _id: string;
  title: string;
  company: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  highlights?: string;
  location?: string;
}

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const [experiences, setExperiences] = useState<ExperienceItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    api.portfolio.experiences()
      .then((res) => setExperiences(res.data))
      .catch(() => setExperiences([]))
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    if (!experiences.length || isLoading) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(".exp-headline", { opacity: 0, y: 20 }, {
        opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%", toggleActions: "play none none reverse" },
      });
      gsap.fromTo(".exp-item", { opacity: 0, x: -20 }, {
        opacity: 1, x: 0, duration: 0.7, ease: "power3.out", stagger: 0.12,
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%", toggleActions: "play none none reverse" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [experiences, isLoading]);

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative w-full py-24 md:py-32 overflow-hidden"
      style={{ background: "var(--bg-void)" }}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <span className="inline-block text-xs font-medium tracking-[0.15em] uppercase mb-4" style={{ color: "var(--accent-violet)" }}>
            Career Journey
          </span>
          <h2
            className="font-semibold tracking-tight"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "var(--text-primary)", letterSpacing: "-0.02em" }}
          >
            Work <span className="text-gradient-violet">Experience</span>
          </h2>
        </div>

        {isLoading ? (
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="rounded-[28px] animate-pulse" style={{ background: "var(--bg-surface)", height: 140 }} />
            ))}
          </div>
        ) : (
          <div className="relative">
            <div className="absolute left-[11px] top-0 bottom-0 w-px hidden sm:block" style={{ background: "rgba(255,255,255,0.08)" }} />
            <div className="space-y-6">
              {experiences.map((exp) => (
                <div key={exp._id} className="exp-item opacity-0 relative pl-0 sm:pl-10">
                  <div className="absolute left-[6px] top-3 w-2.5 h-2.5 rounded-full hidden sm:block" style={{ background: "var(--accent-violet)" }} />
                  <div className="liquid-glass p-5 sm:p-6">
                    <div className="relative z-10">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                        <div>
                          <h3 className="font-semibold text-base" style={{ color: "var(--text-primary)" }}>
                            {exp.title}
                          </h3>
                          <p className="text-sm font-medium" style={{ color: "var(--accent-violet)" }}>
                            {exp.company}
                          </p>
                        </div>
                        <div className="flex items-center gap-1 text-xs" style={{ color: "var(--text-muted)" }}>
                          <Calendar className="w-3 h-3" />
                          {exp.startDate} – {exp.current ? "Present" : exp.endDate}
                        </div>
                      </div>
                      <p className="text-sm" style={{ color: "var(--text-secondary)", lineHeight: 1.6 }}>
                        {exp.description}
                      </p>
                      {exp.location && (
                        <div className="mt-3 flex items-center gap-1 text-xs" style={{ color: "var(--text-muted)" }}>
                          <MapPin className="w-3 h-3" />
                          {exp.location}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
