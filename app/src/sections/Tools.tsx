import { useEffect, useRef, useState } from "react";
import {
  Bot,
  Workflow,
  Database,
  Cloud,
  Video,
  PenTool,
  BarChart3,
  Shield,
} from "lucide-react";

const toolGroups = [
  {
    icon: Bot,
    title: "AI & LLM",
    color: "var(--accent-indigo)",
    items: [
      "Claude",
      "LangChain",
      "LlamaIndex",
      "RAG Pipeline Design",
      "Prompt Engineering",
      "LLM Deployment",
      "NLP & Document Processing",
    ],
  },
  {
    icon: Workflow,
    title: "AI Agents & Frameworks",
    color: "var(--accent-slate)",
    items: [
      "CrewAI",
      "AutoGen",
      "Claude MCP",
      "Anthropic API",
      "Multi-Agent Pipelines",
      "Agentic Tool Use",
    ],
  },
  {
    icon: Shield,
    title: "Automation",
    color: "var(--accent-teal)",
    items: [
      "N8N",
      "Zapier",
      "Make",
      "REST API Integration",
      "Webhooks",
      "Shopify",
      "ActiveCampaign",
    ],
  },
  {
    icon: Database,
    title: "Backend & Databases",
    color: "var(--accent-cyan)",
    items: [
      "Python",
      "FastAPI",
      "MySQL",
      "Pinecone",
      "Weaviate",
      "Supabase pgvector",
      "FAISS",
      "Chroma",
      "TypeScript",
      "JavaScript",
    ],
  },
  {
    icon: Cloud,
    title: "Cloud & Infrastructure",
    color: "var(--accent-violet)",
    items: [
      "AWS",
      "GCP",
      "Azure",
      "Docker",
      "Kubernetes",
      "CI/CD",
      "Render",
      "Fly.io",
    ],
  },
  {
    icon: Video,
    title: "Video & Creative",
    color: "var(--accent-indigo)",
    items: [
      "Adobe Premiere Pro",
      "After Effects",
      "Photoshop",
      "Filmora",
      "CapCut",
    ],
  },
  {
    icon: PenTool,
    title: "Design & Dev",
    color: "var(--accent-slate)",
    items: [
      "Figma",
      "Canva",
      "VS Code",
      "HTML",
      "CSS",
      "Cisco Packet Tracer",
      "Linux",
      "Remote Support Tools",
    ],
  },
  {
    icon: BarChart3,
    title: "Marketing & Productivity",
    color: "var(--accent-teal)",
    items: [
      "Meta Business Suite",
      "Buffer",
      "Later",
      "Notion",
      "Trello",
      "Google Workspace",
      "MS Office",
    ],
  },
];

export default function Tools() {
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
      id="tools"
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
            <span className="w-2 h-2 rounded-full bg-[var(--accent-violet)] animate-pulse" />
            <span className="text-sm font-medium text-[var(--text-secondary)]">Tools & Technology</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--text-primary)] tracking-tight mb-4">
            Powered by{" "}
            <span className="text-gradient-slate">modern tools</span>
          </h2>
          <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
            A carefully curated toolkit spanning AI, automation, cloud infrastructure, and creative production.
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {toolGroups.map((group, i) => (
            <div
              key={group.title}
              className={`glass-card p-6 transition-all duration-700 hover:-translate-y-1 ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: `${i * 70}ms` }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                style={{
                  background: `linear-gradient(135deg, ${group.color}12, ${group.color}06)`,
                }}
              >
                <group.icon className="w-5 h-5" style={{ color: group.color }} />
              </div>
              <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-3">
                {group.title}
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="px-2 py-0.5 text-xs font-medium rounded-md bg-white/5 text-[var(--text-secondary)]"
                  >
                    {item}
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
