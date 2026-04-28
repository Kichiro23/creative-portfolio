import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const isTouch = window.matchMedia("(hover: none)").matches;
    if (isTouch) return;

    const cursor = cursorRef.current;
    const label = labelRef.current;
    if (!cursor || !label) return;

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const target = { x: pos.x, y: pos.y };

    const onMove = (e: MouseEvent) => { target.x = e.clientX; target.y = e.clientY; };

    const onOver = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      if (el.closest("a, button, [data-cursor='link']")) {
        gsap.to(cursor, { width: 40, height: 40, opacity: 0.5, duration: 0.3, ease: "power2.out" });
        label.textContent = "";
      }
      if (el.closest("[data-cursor='view']")) {
        gsap.to(cursor, { width: 64, height: 64, opacity: 0.9, duration: 0.3, ease: "power2.out" });
        label.textContent = "VIEW";
      }
    };

    const onOut = () => {
      gsap.to(cursor, { width: 12, height: 12, opacity: 1, duration: 0.3, ease: "power2.out" });
      label.textContent = "";
    };

    let raf: number;
    const loop = () => {
      pos.x += (target.x - pos.x) * 0.15;
      pos.y += (target.y - pos.y) * 0.15;
      cursor.style.transform = `translate(${pos.x}px, ${pos.y}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
    };
  }, []);

  if (typeof window !== "undefined" && window.matchMedia("(hover: none)").matches) return null;

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:flex items-center justify-center"
      style={{ width: 12, height: 12, borderRadius: "50%", background: "var(--accent-coral)", mixBlendMode: "difference", willChange: "transform" }}
    >
      <span ref={labelRef} className="text-[8px] font-medium tracking-wider" style={{ color: "var(--bg-void)" }} />
    </div>
  );
}
