import { useState, useEffect } from "react";
import { Link } from "react-router";
import { Sun, Moon, Menu, X } from "lucide-react";
import { useTheme } from "@/providers/theme";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Work", href: "#projects" },
  { label: "Tools", href: "#tools" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const { resolvedTheme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <nav
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${
          scrolled ? "top-3" : "top-4 md:top-5"
        }`}
      >
        <div
          className={`glass-pill px-2 py-2 flex items-center gap-1 transition-all duration-500 ${
            scrolled ? "shadow-glass" : ""
          }`}
        >
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 px-4 py-2 rounded-full hover:bg-white/5 transition-colors"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[var(--accent-indigo)] to-[var(--accent-slate)] flex items-center justify-center text-white text-xs font-bold">
              R
            </div>
            <span className="text-sm font-semibold text-[var(--text-primary)] hidden sm:block">
              Rommel
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-0.5">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNav(link.href)}
                className="px-4 py-2 text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] rounded-full hover:bg-white/5 transition-all duration-300"
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="w-px h-5 bg-[var(--glass-border)] mx-2 hidden lg:block" />

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-full hover:bg-white/5 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all duration-300"
            aria-label="Toggle theme"
          >
            {resolvedTheme === "dark" ? (
              <Sun className="w-4 h-4" />
            ) : (
              <Moon className="w-4 h-4" />
            )}
          </button>

          {/* CTA */}
          <a
            href="mailto:rommeld216@gmail.com"
            className="hidden md:inline-flex ml-1 px-5 py-2 text-sm font-semibold text-white rounded-full bg-gradient-to-r from-[var(--accent-indigo)] to-[#818cf8] hover:shadow-lg hover:shadow-[var(--accent-indigo)]/15 transition-all duration-300 hover:-translate-y-0.5"
          >
            Hire Me
          </a>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2.5 rounded-full hover:bg-white/5 text-[var(--text-secondary)] transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {mobileOpen && (
          <div className="lg:hidden mt-2 glass-card p-2 flex flex-col gap-1 animate-scale-in">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNav(link.href)}
                className="w-full text-left px-4 py-3 text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] rounded-2xl hover:bg-white/5 transition-all"
              >
                {link.label}
              </button>
            ))}
            <a
              href="mailto:rommeld216@gmail.com"
              className="mt-1 w-full text-center px-5 py-3 text-sm font-semibold text-white rounded-2xl bg-gradient-to-r from-[var(--accent-indigo)] to-[#818cf8]"
            >
              Hire Me
            </a>
          </div>
        )}
      </nav>
    </>
  );
}
