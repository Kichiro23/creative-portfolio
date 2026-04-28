import { useEffect, useRef, useState } from "react";
import {
  Terminal,
  Layers,
  Database,
  Cloud,
  Cpu,
  Paintbrush,
  ShieldCheck,
  Wrench,
} from "lucide-react";

const skillCategories = [
  {
    icon: Terminal,
    title: "Programming",
    color: "var(--accent-indigo)",
    skills: [
      "Python (Advanced)",
      "JavaScript / TypeScript",
      "FastAPI",
      "SQL",
      "REST API Development",
      "API Integration",
      "Prompt Engineering",
    ],
  },
  {
    icon: Layers,
    title: "Full Stack Development",
    color: "var(--accent-slate)",
    skills: [
      "React 19",
      "TypeScript",
      "Node.js",
      "Express",
      "MongoDB",
      "REST APIs",
      "JWT Authentication",
      "OAuth 2.0",
    ],
  },
  {
    icon: Database,
    title: "Database & Cloud",
    color: "var(--accent-teal)",
    skills: [
      "MySQL",
      "MongoDB Atlas",
      "Relational Schema Design",
      "CRUD Operations",
      "Pinecone",
      "FAISS",
      "Supabase",
      "Weaviate",
      "Chroma",
    ],
  },
  {
    icon: Cloud,
    title: "Cloud & Infrastructure",
    color: "var(--accent-cyan)",
    skills: [
      "AWS",
      "GCP",
      "Azure",
      "Docker",
      "Kubernetes",
      "CI/CD Pipelines",
      "Web Hosting",
      "Server Administration",
      "Performance Monitoring",
    ],
  },
  {
    icon: Cpu,
    title: "IT & Systems",
    color: "var(--accent-violet)",
    skills: [
      "Network Setup & Troubleshooting",
      "Hardware/Software Support",
      "Website Management",
      "System Administration",
      "Technical Troubleshooting",
    ],
  },
  {
    icon: ShieldCheck,
    title: "Security",
    color: "var(--accent-indigo)",
    skills: [
      "Cybersecurity Fundamentals",
      "HIPAA Compliance Awareness",
      "Data Privacy",
      "Prompt Injection Mitigation",
    ],
  },
  {
    icon: Paintbrush,
    title: "Creative & UI",
    color: "var(--accent-slate)",
    skills: [
      "Figma (UI/UX Prototyping)",
      "Graphic Design",
      "Video Editing",
      "Social Media Content Production",
      "Tailwind CSS",
      "Chart.js",
      "Leaflet.js",
    ],
  },
  {
    icon: Wrench,
    title: "Tools & Platforms",
    color: "var(--accent-teal)",
    skills: [
      "MS Office Suite",
      "Google Workspace",
      "Git / Version Control",
      "Vite",
      "N8N",
      "Zapier",
      "Google Gemini AI",
      "Technical Documentation",
    ],
  },
];

export default function Skills() {
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
      id="skills"
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
            <span className="w-2 h-2 rounded-full bg-[var(--accent-slate)] animate-pulse" />
            <span className="text-sm font-medium text-[var(--text-secondary)]">Technical Skills</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--text-primary)] tracking-tight mb-4">
            Deep expertise across{" "}
            <span className="text-gradient-slate">the stack</span>
          </h2>
          <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
            From low-level infrastructure to pixel-perfect interfaces, I bring a comprehensive skill set to every project.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {skillCategories.map((cat, i) => (
            <div
              key={cat.title}
              className={`glass-card p-6 transition-all duration-700 hover:-translate-y-1 ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                style={{
                  background: `linear-gradient(135deg, ${cat.color}15, ${cat.color}08)`,
                }}
              >
                <cat.icon className="w-5 h-5" style={{ color: cat.color }} />
              </div>
              <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-3">
                {cat.title}
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {cat.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2.5 py-1 text-xs font-medium rounded-full"
                    style={{
                      background: `${cat.color}12`,
                      color: cat.color,
                      border: `1px solid ${cat.color}18`,
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
