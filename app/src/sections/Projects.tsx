import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Globe, ShoppingBag, BarChart3, Lock, Database } from "lucide-react";

const projects = [
  {
    title: "CARP — Climate & Air Research Platform",
    role: "Lead Developer (Full Stack)",
    period: "2025 – 2026",
    description:
      "WeatherCarp is a full-stack environmental monitoring platform delivering real-time weather, air quality, and multi-domain environmental data to global users.",
    highlights: [
      "React 19 + TypeScript frontend, Node.js/Express backend, MongoDB Atlas",
      "Integrated 5+ APIs: Open-Meteo, Google Gemini AI, REST Countries",
      "JWT + Google OAuth 2.0 authentication, user location saving",
      "Leaflet.js live maps, Chart.js visualizations, historical weather analysis",
      "AI chatbot assistant, multi-domain monitoring",
      "Deployed on Hostinger/Render with full database schema design",
    ],
    stack: ["React", "TypeScript", "Tailwind CSS", "Node.js", "Express", "MongoDB", "Vite"],
    liveUrl: "https://weathercarp.com",
    image: "/projects/carp.png",
    gradient: "from-[var(--accent-indigo)] to-[var(--accent-violet)]",
    icon: Globe,
  },
  {
    title: "E-Commerce Management System",
    role: "Full Stack Developer",
    period: "2024",
    description:
      "A comprehensive e-commerce dashboard with real-time sales analytics, inventory management, order tracking, and revenue reporting.",
    highlights: [
      "Real-time sales analytics with interactive charts and KPI tracking",
      "Product inventory management with stock level alerts",
      "Order management pipeline with status tracking",
      "Revenue overview dashboard with trend analysis",
    ],
    stack: ["React", "Node.js", "MongoDB", "Chart.js", "Stripe"],
    image: "/projects/ecommerce.jpg",
    gradient: "from-[var(--accent-slate)] to-[var(--accent-cyan)]",
    icon: ShoppingBag,
  },
  {
    title: "AI Co-Pilot Dashboard",
    role: "AI Automation Engineer",
    period: "2024",
    description:
      "An intelligent automation platform with multi-agent LLM orchestration, webhook processing, and document analysis pipelines.",
    highlights: [
      "Multi-agent pipeline visualization with LLM core network",
      "Real-time webhook logs and event processing",
      "Document processing pipeline with RAG integration",
      "AI chat interface with context-aware responses",
    ],
    stack: ["Python", "LangChain", "CrewAI", "FastAPI", "React"],
    image: "/projects/ai-dashboard.jpg",
    gradient: "from-[var(--accent-teal)] to-[var(--accent-indigo)]",
    icon: BarChart3,
  },
  {
    title: "Cloud Infrastructure Architecture",
    role: "DevOps Engineer",
    period: "2023",
    description:
      "End-to-end cloud infrastructure design spanning AWS, GCP, and Kubernetes with automated CI/CD pipelines and security monitoring.",
    highlights: [
      "Multi-cloud Kubernetes orchestration across AWS and GCP",
      "Automated CI/CD pipeline from code to deployment",
      "Containerized microservices with Docker",
      "Security monitoring and compliance architecture",
    ],
    stack: ["AWS", "GCP", "Kubernetes", "Docker", "CI/CD", "Terraform"],
    image: "/projects/cloud-infra.jpg",
    gradient: "from-[var(--accent-cyan)] to-[var(--accent-indigo)]",
    icon: Lock,
  },
  {
    title: "Database Management System",
    role: "Independent Project",
    period: "2021 – 2022",
    description:
      "A MySQL-based inventory management system with full CRUD operations, relational schemas, and an intuitive query editor interface.",
    highlights: [
      "Full CRUD operations with structured relational schemas",
      "SQL query editor with syntax highlighting",
      "Real-time database load monitoring and performance metrics",
      "Storage usage analytics and query performance tracking",
    ],
    stack: ["MySQL", "SQL", "Database Design", "React"],
    image: "/projects/dbms.jpg",
    gradient: "from-[var(--accent-violet)] to-[var(--accent-slate)]",
    icon: Database,
  },
];

export default function Projects() {
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
      id="projects"
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
            <span className="text-sm font-medium text-[var(--text-secondary)]">Selected Work</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--text-primary)] tracking-tight mb-4">
            Built with{" "}
            <span className="text-gradient-indigo">precision</span>
          </h2>
          <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
            From production-grade platforms to independent experiments — every project is a chance to push boundaries.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <div
              key={project.title}
              className={`glass-card overflow-hidden transition-all duration-700 ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              } ${i === 0 ? "md:col-span-2" : ""}`}
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              {/* Project Image */}
              <div className="relative overflow-hidden group">
                <div className={`aspect-[16/9] ${i === 0 ? "md:aspect-[21/9]" : ""}`}>
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-void)] via-transparent to-transparent opacity-60" />
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute top-4 right-4 p-2.5 rounded-full glass-pill text-[var(--text-primary)] hover:text-[var(--accent-indigo)] transition-colors"
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                )}
              </div>

              <div className="p-6 md:p-8">
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-xl bg-gradient-to-br ${project.gradient} flex items-center justify-center`}
                    >
                      <project.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider">
                        {project.role} · {project.period}
                      </div>
                    </div>
                  </div>
                </div>

                <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-3 hover:text-gradient-indigo transition-all">
                  {project.title}
                </h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4">
                  {project.description}
                </p>

                {/* Highlights */}
                <ul className="space-y-1.5 mb-5">
                  {project.highlights.map((h, hi) => (
                    <li
                      key={hi}
                      className="text-xs text-[var(--text-secondary)] flex items-start gap-2"
                    >
                      <span
                        className={`w-1 h-1 rounded-full mt-1.5 shrink-0 bg-gradient-to-r ${project.gradient}`}
                      />
                      {h}
                    </li>
                  ))}
                </ul>

                {/* Stack */}
                <div className="flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 text-xs font-medium rounded-full bg-white/5 text-[var(--text-secondary)] border border-white/5"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
