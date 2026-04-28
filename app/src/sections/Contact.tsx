import { useEffect, useRef, useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Instagram,
  Facebook,
  MessageCircle,
  Send,
  ArrowUpRight,
} from "lucide-react";

const socials = [
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/rommel-andrei-de-leon-36ba8b291/",
    icon: Linkedin,
    color: "#5a6e7d",
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/drei_sanity",
    icon: Instagram,
    color: "#7a6345",
  },
  {
    name: "Facebook",
    url: "https://www.facebook.com/andrei.deleon23",
    icon: Facebook,
    color: "#5a6e7d",
  },
  {
    name: "Discord",
    url: "https://discord.com/users/drei_sanity",
    icon: MessageCircle,
    color: "#6b7c8e",
    handle: "drei_sanity",
  },
  {
    name: "Telegram",
    url: "https://t.me/drei_sanity",
    icon: Send,
    color: "#5a7a6a",
    handle: "drei_sanity",
  },
];

export default function Contact() {
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
      id="contact"
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
            <span className="w-2 h-2 rounded-full bg-[var(--accent-indigo)] animate-pulse" />
            <span className="text-sm font-medium text-[var(--text-secondary)]">Get in Touch</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--text-primary)] tracking-tight mb-4">
            Let&apos;s build something{" "}
            <span className="text-gradient-indigo">extraordinary</span>
          </h2>
          <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
            Open to remote, part-time, and project-based opportunities. Reach out and let&apos;s discuss how I can help.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Contact Info */}
          <div
            className={`space-y-6 transition-all duration-700 ${
              inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-6"
            }`}
          >
            <div className="glass-card p-8">
              <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-6">
                Contact Information
              </h3>
              <div className="space-y-5">
                <a
                  href="mailto:rommeld216@gmail.com"
                  className="flex items-center gap-4 group"
                >
                  <div className="w-11 h-11 rounded-xl bg-[var(--accent-indigo)]/10 flex items-center justify-center group-hover:bg-[var(--accent-indigo)]/15 transition-colors">
                    <Mail className="w-5 h-5 text-[var(--accent-indigo)]" />
                  </div>
                  <div>
                    <div className="text-xs text-[var(--text-muted)]">Email</div>
                    <div className="text-sm font-medium text-[var(--text-primary)] group-hover:text-[var(--accent-indigo)] transition-colors">
                      rommeld216@gmail.com
                    </div>
                  </div>
                </a>

                <a
                  href="tel:+639627905910"
                  className="flex items-center gap-4 group"
                >
                  <div className="w-11 h-11 rounded-xl bg-[var(--accent-slate)]/10 flex items-center justify-center group-hover:bg-[var(--accent-slate)]/15 transition-colors">
                    <Phone className="w-5 h-5 text-[var(--accent-slate)]" />
                  </div>
                  <div>
                    <div className="text-xs text-[var(--text-muted)]">Phone</div>
                    <div className="text-sm font-medium text-[var(--text-primary)] group-hover:text-[var(--accent-slate)] transition-colors">
                      +63 962 790 5910
                    </div>
                  </div>
                </a>

                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-xl bg-[var(--accent-teal)]/10 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-[var(--accent-teal)]" />
                  </div>
                  <div>
                    <div className="text-xs text-[var(--text-muted)]">Location</div>
                    <div className="text-sm font-medium text-[var(--text-primary)]">
                      Malolos, Bulacan, Philippines · PHT (UTC+8)
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Card */}
            <div className="glass-card p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[var(--accent-indigo)]/10 to-transparent rounded-full blur-2xl" />
              <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2 relative z-10">
                Ready to start a project?
              </h3>
              <p className="text-sm text-[var(--text-secondary)] mb-6 relative z-10">
                I&apos;m currently available for freelance work. Let&apos;s discuss your requirements and build something amazing together.
              </p>
              <a
                href="mailto:rommeld216@gmail.com"
                className="btn-glow relative z-10"
              >
                Start a Conversation
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Social Links */}
          <div
            className={`space-y-6 transition-all duration-700 delay-200 ${
              inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-6"
            }`}
          >
            <div className="glass-card p-8">
              <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-6">
                Connect Online
              </h3>
              <div className="grid gap-3">
                {socials.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] transition-all group"
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ background: `${social.color}12` }}
                    >
                      <social.icon
                        className="w-5 h-5"
                        style={{ color: social.color }}
                      />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-[var(--text-primary)]">
                        {social.name}
                      </div>
                      {social.handle && (
                        <div className="text-xs text-[var(--text-muted)]">
                          @{social.handle}
                        </div>
                      )}
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-[var(--text-muted)] group-hover:text-[var(--text-primary)] transition-colors" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-20 pt-8 border-t border-[var(--glass-border)] text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[var(--accent-indigo)] to-[var(--accent-slate)] flex items-center justify-center text-white text-xs font-bold">
              R
            </div>
            <span className="text-sm font-semibold text-[var(--text-primary)]">
              Rommel De Leon
            </span>
          </div>
          <p className="text-xs text-[var(--text-muted)]">
            Full Stack Developer · AI Automation Engineer · Creative Professional
          </p>
          <p className="text-xs text-[var(--text-muted)] mt-2">
            &copy; {new Date().getFullYear()} Rommel Andrei De Leon. All rights reserved.
          </p>
        </div>
      </div>
    </section>
  );
}
