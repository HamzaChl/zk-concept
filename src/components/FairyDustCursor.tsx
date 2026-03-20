import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  char: string;
  color: string;
  opacity: number;
  size: number;
}

interface FairyDustCursorProps {
  colors?: string[];
  characterSet?: string[];
  particleSize?: number;
  particleCount?: number;
  gravity?: number;
  fadeSpeed?: number;
  initialVelocity?: { min: number; max: number };
}

export default function FairyDustCursor({
  colors = ["#FF0000", "#00FF00", "#0000FF"],
  characterSet = ["✨", "⭐", "🌟"],
  particleSize = 24,
  particleCount = 2,
  gravity = 0.015,
  fadeSpeed = 0.97,
  initialVelocity = { min: 0.7, max: 2.0 },
}: FairyDustCursorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const rand = (min: number, max: number) => Math.random() * (max - min) + min;

    const onMove = (e: MouseEvent) => {
      for (let i = 0; i < particleCount; i++) {
        const angle = rand(0, Math.PI * 2);
        const speed = rand(initialVelocity.min, initialVelocity.max);
        particlesRef.current.push({
          x: e.clientX,
          y: e.clientY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          char: characterSet[Math.floor(Math.random() * characterSet.length)],
          color: colors[Math.floor(Math.random() * colors.length)],
          opacity: 1,
          size: particleSize,
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particlesRef.current = particlesRef.current.filter((p) => p.opacity > 0.01);

      for (const p of particlesRef.current) {
        p.vy += gravity;
        p.x += p.vx;
        p.y += p.vy;
        p.opacity *= fadeSpeed;

        ctx.save();
        ctx.globalAlpha = p.opacity;
        ctx.font = `${p.size}px serif`;
        ctx.fillStyle = p.color;
        ctx.fillText(p.char, p.x, p.y);
        ctx.restore();
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    animate();
    window.addEventListener("mousemove", onMove);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(rafRef.current);
    };
  }, [colors, characterSet, particleSize, particleCount, gravity, fadeSpeed, initialVelocity]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[999]"
    />
  );
}
