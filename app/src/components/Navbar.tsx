import { useState, useEffect, useCallback } from "react";
import { Link, useLocation } from "react-router";
import { Menu, X, Sun, Moon, Monitor } from "lucide-react";
import { useTheme } from "@/providers/theme";
import { useAuth } from "@/hooks/useAuth";

const navLinks = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { resolvedTheme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const location = useLocation();
  const isHome = location.pathname === "/";

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 40);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    if (!isHome) {
      window.location.href = "/" + href;
      return;
    }
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <nav
        className="fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-500"
        style={{
          width: scrolled ? "calc(100% - 2rem)" : "auto",
          maxWidth: scrolled ? "1200px" : "900px",
        }}
      >
        <div
          className="flex items-center justify-between gap-4 px-5 py-3 transition-all duration-500"
          style={{
            borderRadius: 9999,
            background: scrolled
              ? "rgba(15, 13, 22, 0.75)"
              : "rgba(255, 255, 255, 0.04)",
            backdropFilter: "blur(40px) saturate(180%)",
            WebkitBackdropFilter: "blur(40px) saturate(180%)",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow: scrolled
              ? "0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)"
              : "0 4px 20px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.05)",
          }}
        >
          {/* Logo */}
          <Link
            to="/"
            className="text-sm font-semibold tracking-tight whitespace-nowrap"
            style={{ color: "var(--text-primary)", letterSpacing: "-0.02em" }}
          >
            R.A.De Leon
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => scrollTo(link.href)}
                className="px-3 py-1.5 text-sm font-medium rounded-full transition-colors duration-200 hover:bg-white/5"
                style={{ color: "var(--text-secondary)" }}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="w-9 h-9 rounded-full flex items-center justify-center transition-colors duration-200 hover:bg-white/5"
              style={{ color: "var(--text-secondary)" }}
            >
              {resolvedTheme === "dark" ? (
                <Moon className="w-4 h-4" />
              ) : (
                <Sun className="w-4 h-4" />
              )}
            </button>

            {user?.role === "admin" && (
              <Link
                to="/admin"
                className="hidden md:inline-flex px-4 py-2 text-sm font-medium rounded-full transition-colors duration-200 hover:bg-white/5"
                style={{ color: "var(--text-secondary)" }}
              >
                Admin
              </Link>
            )}

            {user ? (
              <button
                onClick={logout}
                className="hidden md:inline-flex btn-glow text-sm py-2 px-5"
              >
                Log out
              </button>
            ) : (
              <Link to="/login" className="hidden md:inline-flex btn-glow text-sm py-2 px-5">
                Log in
              </Link>
            )}

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen((p) => !p)}
              className="md:hidden w-9 h-9 rounded-full flex items-center justify-center transition-colors duration-200 hover:bg-white/5"
              style={{ color: "var(--text-secondary)" }}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 md:hidden"
          style={{
            background: "rgba(6, 4, 10, 0.85)",
            backdropFilter: "blur(20px)",
          }}
          onClick={() => setMobileOpen(false)}
        >
          <div
            className="absolute top-24 left-4 right-4 p-6 flex flex-col gap-2"
            style={{
              borderRadius: 28,
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => scrollTo(link.href)}
                className="w-full text-left px-4 py-3 text-base font-medium rounded-2xl transition-colors hover:bg-white/5"
                style={{ color: "var(--text-primary)" }}
              >
                {link.label}
              </button>
            ))}
            <div
              className="my-2"
              style={{ height: 1, background: "rgba(255,255,255,0.06)" }}
            />
            {user?.role === "admin" && (
              <Link
                to="/admin"
                onClick={() => setMobileOpen(false)}
                className="w-full text-left px-4 py-3 text-base font-medium rounded-2xl transition-colors hover:bg-white/5"
                style={{ color: "var(--text-primary)" }}
              >
                Admin
              </Link>
            )}
            {user ? (
              <button
                onClick={() => {
                  setMobileOpen(false);
                  logout();
                }}
                className="btn-glow w-full text-center mt-2"
              >
                Log out
              </button>
            ) : (
              <Link
                to="/login"
                onClick={() => setMobileOpen(false)}
                className="btn-glow w-full text-center mt-2"
              >
                Log in
              </Link>
            )}
          </div>
        </div>
      )}
    </>
  );
}
