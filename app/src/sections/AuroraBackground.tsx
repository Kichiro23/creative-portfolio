import { useEffect, useRef } from "react";

export default function AuroraBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener("resize", resize);

    // Cool indigo / slate / teal palette
    const blobs = [
      { x: 0.3, y: 0.4, r: 0.35, color: "rgba(99, 102, 241, ", speed: 0.0003, phase: 0 },
      { x: 0.7, y: 0.6, r: 0.4, color: "rgba(139, 157, 195, ", speed: 0.00025, phase: 2 },
      { x: 0.5, y: 0.3, r: 0.3, color: "rgba(34, 211, 238, ", speed: 0.00035, phase: 4 },
      { x: 0.2, y: 0.7, r: 0.25, color: "rgba(94, 234, 212, ", speed: 0.0002, phase: 1 },
    ];

    const draw = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      time += 1;

      ctx.clearRect(0, 0, w, h);

      const isDark = !document.documentElement.classList.contains("light");
      ctx.fillStyle = isDark ? "#0f1115" : "#f3f4f6";
      ctx.fillRect(0, 0, w, h);

      // Very subtle noise
      if (isDark) {
        ctx.fillStyle = "rgba(255,255,255,0.012)";
        for (let i = 0; i < 200; i++) {
          const nx = Math.random() * w;
          const ny = Math.random() * h;
          ctx.fillRect(nx, ny, 1, 1);
        }
      }

      // Draw aurora blobs
      blobs.forEach((blob) => {
        const bx = w * (blob.x + Math.sin(time * blob.speed + blob.phase) * 0.08);
        const by = h * (blob.y + Math.cos(time * blob.speed * 0.7 + blob.phase) * 0.06);
        const br = Math.min(w, h) * (blob.r + Math.sin(time * blob.speed * 0.5) * 0.03);

        const gradient = ctx.createRadialGradient(bx, by, 0, bx, by, br);
        const alpha = isDark ? 0.08 : 0.04;
        gradient.addColorStop(0, blob.color + alpha + ")");
        gradient.addColorStop(0.5, blob.color + (alpha * 0.4) + ")");
        gradient.addColorStop(1, blob.color + "0)");

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, w, h);
      });

      // Subtle grid
      if (isDark) {
        ctx.strokeStyle = "rgba(255,255,255,0.012)";
        ctx.lineWidth = 0.5;
        const gridSize = 80;
        for (let x = 0; x < w; x += gridSize) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, h);
          ctx.stroke();
        }
        for (let y = 0; y < h; y += gridSize) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(w, y);
          ctx.stroke();
        }
      }

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
}
