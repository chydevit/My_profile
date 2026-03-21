"use client";

import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  z: number;
  size: number;
  speed: number;
  color: string;
}

const STAR_COLORS = [
  "rgba(103,232,249,",  // cyan
  "rgba(99,102,241,",   // indigo
  "rgba(167,139,250,",  // violet
  "rgba(255,255,255,",  // white
];

export function GalaxyBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const stars: Star[] = [];
    const COUNT = 180;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Init stars
    for (let i = 0; i < COUNT; i++) {
      stars.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        z: Math.random() * 1.5 + 0.2,
        size: Math.random() * 1.8 + 0.3,
        speed: Math.random() * 0.3 + 0.05,
        color: STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)],
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const star of stars) {
        const alpha = 0.4 + Math.sin(Date.now() * 0.001 * star.z) * 0.3;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size * star.z, 0, Math.PI * 2);
        ctx.fillStyle = `${star.color}${alpha.toFixed(2)})`;
        ctx.fill();

        // Drift upward slowly
        star.y -= star.speed;
        star.x += Math.sin(Date.now() * 0.0005 * star.z) * 0.15;

        // Reset when off screen
        if (star.y < -4) {
          star.y = canvas.height + 4;
          star.x = Math.random() * canvas.width;
        }
      }

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="galaxy-bg"
      aria-hidden="true"
    />
  );
}
