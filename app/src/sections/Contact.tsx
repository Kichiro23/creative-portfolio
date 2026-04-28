import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { api } from "@/lib/api";
import { Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".contact-content > *", { opacity: 0, y: 30 }, {
        opacity: 1, y: 0, duration: 0.8, ease: "power3.out", stagger: 0.1,
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%", toggleActions: "play none none reverse" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setError("Please fill in all required fields.");
      return;
    }
    setIsPending(true);
    try {
      await api.messages.create({
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        content: formData.message,
      });
      setSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err: any) {
      setError(err.message || "Failed to send message. Please try again.");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative w-full py-24 md:py-32 lg:py-40 overflow-hidden"
      style={{ background: "var(--bg-void)" }}
    >
      <div className="absolute bottom-0 left-1/3 w-[400px] h-[400px] rounded-full pointer-events-none opacity-15" style={{ background: "radial-gradient(circle, var(--accent-coral), transparent 70%)", filter: "blur(90px)" }} />

      <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="contact-content text-center mb-10 md:mb-12">
          <span className="inline-block text-xs font-medium tracking-[0.15em] uppercase mb-4" style={{ color: "var(--accent-coral)" }}>
            Get In Touch
          </span>
          <h2
            className="font-semibold tracking-tight mb-4"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "var(--text-primary)", letterSpacing: "-0.02em" }}
          >
            Let&apos;s build something <span className="text-gradient-coral">extraordinary</span>
          </h2>
          <p style={{ fontSize: 16, color: "var(--text-secondary)", lineHeight: 1.6 }}>
            Open to remote, part-time, and project-based collaborations.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="contact-content space-y-5">
          {submitted && (
            <div className="flex items-center gap-2 p-4 rounded-2xl" style={{ background: "rgba(6, 214, 160, 0.08)", color: "var(--accent-mint)" }}>
              <CheckCircle className="w-4 h-4" />
              <span className="text-sm">Message sent successfully! I&apos;ll get back to you soon.</span>
            </div>
          )}
          {error && (
            <div className="flex items-center gap-2 p-4 rounded-2xl" style={{ background: "rgba(220, 38, 38, 0.08)", color: "#f87171" }}>
              <AlertCircle className="w-4 h-4" /> <span className="text-sm">{error}</span>
            </div>
          )}

          <div className="liquid-glass p-5 sm:p-8">
            <div className="relative z-10 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-medium mb-2" style={{ color: "var(--text-muted)" }}>Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your name"
                    autoComplete="name"
                    autoCapitalize="words"
                    className="w-full px-4 py-3.5 rounded-2xl text-sm focus:outline-none focus:ring-2 transition-all"
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      color: "var(--text-primary)",
                      minHeight: 48,
                    }}
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-2" style={{ color: "var(--text-muted)" }}>Email *</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your@email.com"
                    autoComplete="email"
                    autoCapitalize="off"
                    className="w-full px-4 py-3.5 rounded-2xl text-sm focus:outline-none focus:ring-2 transition-all"
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      color: "var(--text-primary)",
                      minHeight: 48,
                    }}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium mb-2" style={{ color: "var(--text-muted)" }}>Subject</label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="What's this about?"
                  autoCapitalize="sentences"
                  className="w-full px-4 py-3.5 rounded-2xl text-sm focus:outline-none focus:ring-2 transition-all"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    color: "var(--text-primary)",
                    minHeight: 48,
                  }}
                />
              </div>

              <div>
                <label className="block text-xs font-medium mb-2" style={{ color: "var(--text-muted)" }}>Message *</label>
                <textarea
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell me about your project..."
                  autoCapitalize="sentences"
                  className="w-full px-4 py-3.5 rounded-2xl text-sm focus:outline-none focus:ring-2 transition-all resize-none"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    color: "var(--text-primary)",
                  }}
                />
              </div>

              <button type="submit" disabled={isPending} className="btn-glow w-full disabled:opacity-50">
                {isPending ? <><Loader2 className="w-4 h-4 animate-spin mr-2" /> Sending...</> : <><Send className="w-4 h-4 mr-2" /> Send Message</>}
              </button>
            </div>
          </div>
        </form>

        {/* Footer */}
        <div className="mt-16 md:mt-20 pt-8 text-center" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <p className="text-xs" style={{ color: "var(--text-muted)" }}>
            &copy; {new Date().getFullYear()} Rommel Andrei De Leon. Crafted with passion in Malolos, Philippines.
          </p>
        </div>
      </div>
    </section>
  );
}
