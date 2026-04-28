import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const counterRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const topPanelRef = useRef<HTMLDivElement>(null);
  const bottomPanelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obj = { val: 0 };
    const tl = gsap.timeline({
      onComplete: () => {
        const exitTl = gsap.timeline({ onComplete });
        exitTl
          .to(counterRef.current, { opacity: 0, y: -20, duration: 0.4, ease: "power2.in" })
          .to(barRef.current, { opacity: 0, duration: 0.3 }, "-=0.2")
          .to(topPanelRef.current, { y: "-100%", duration: 0.8, ease: "power3.inOut" }, "+=0.1")
          .to(bottomPanelRef.current, { y: "100%", duration: 0.8, ease: "power3.inOut" }, "<");
      },
    });
    tl.to(obj, {
      val: 100,
      duration: 1.5,
      ease: "power2.inOut",
      onUpdate: () => setProgress(Math.round(obj.val)),
    });
    return () => { tl.kill(); };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[100] pointer-events-none">
      <div ref={topPanelRef} className="absolute top-0 left-0 w-full h-1/2" style={{ background: "var(--bg-void)", willChange: "transform" }} />
      <div ref={bottomPanelRef} className="absolute bottom-0 left-0 w-full h-1/2" style={{ background: "var(--bg-void)", willChange: "transform" }} />
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span
          ref={counterRef}
          className="tabular-nums leading-none font-semibold"
          style={{ fontSize: "clamp(4rem, 10vw, 8rem)", color: "var(--text-primary)", letterSpacing: "-0.03em", willChange: "opacity, transform" }}
        >
          {progress}%
        </span>
        <div ref={barRef} className="w-48 h-[3px] mt-6 overflow-hidden rounded-full" style={{ background: "var(--bg-surface)" }}>
          <div className="h-full rounded-full transition-none" style={{ width: `${progress}%`, background: "linear-gradient(90deg, var(--accent-coral), var(--accent-violet))" }} />
        </div>
      </div>
    </div>
  );
}
