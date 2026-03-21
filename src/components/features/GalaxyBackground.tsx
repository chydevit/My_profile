"use client";

import { useEffect, useRef } from "react";

// ── Types ──────────────────────────────────────────────────────────────────
interface Star {
  x: number; y: number;
  ox: number; oy: number;   // drifting origin
  z: number;
  size: number;
  speed: number;
  color: string;
  vx: number; vy: number;
  twinkleOffset: number;
}

interface Shooter {
  x: number; y: number;
  vx: number; vy: number;
  life: number;            // 0–1
  maxLife: number;
  color: string;
  tail: { x: number; y: number }[];
}

interface Burst {
  x: number; y: number;
  particles: { x: number; y: number; vx: number; vy: number; life: number; color: string; size: number }[];
}

// ── Constants ──────────────────────────────────────────────────────────────
const STAR_COLORS = [
  "rgba(103,232,249,",   // cyan
  "rgba(99,102,241,",    // indigo
  "rgba(167,139,250,",   // violet
  "rgba(248,200,255,",   // pink-white
  "rgba(255,255,255,",   // white
];
const COUNT          = 280;
const GATHER_RADIUS  = 160;
const GATHER_STRENGTH = 0.07;
const RETURN_STRENGTH = 0.028;
const CONNECT_DIST   = 90;    // max px to draw constellation line
const SHOOT_INTERVAL = 2800;  // ms between shooting stars
const BURST_PARTICLES = 28;

export function GalaxyBackground() {
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const mouse      = useRef({ x: -9999, y: -9999 });
  const shooters   = useRef<Shooter[]>([]);
  const bursts     = useRef<Burst[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const stars: Star[] = [];

    // ── Resize ──────────────────────────────────────────────────────────
    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // ── Mouse ────────────────────────────────────────────────────────────
    const onMouseMove  = (e: MouseEvent) => { mouse.current = { x: e.clientX, y: e.clientY }; };
    const onMouseLeave = ()              => { mouse.current = { x: -9999, y: -9999 }; };
    window.addEventListener("mousemove",  onMouseMove);
    window.addEventListener("mouseleave", onMouseLeave);

    // ── Click burst ──────────────────────────────────────────────────────
    const onClick = (e: MouseEvent) => {
      const particles = Array.from({ length: BURST_PARTICLES }, () => {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 4 + 1.5;
        const color = STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)];
        return {
          x: e.clientX, y: e.clientY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 1,
          color,
          size: Math.random() * 2.5 + 0.8,
        };
      });
      bursts.current.push({ x: e.clientX, y: e.clientY, particles });
    };
    window.addEventListener("click", onClick);

    // ── Init stars ───────────────────────────────────────────────────────
    for (let i = 0; i < COUNT; i++) {
      const x = Math.random() * window.innerWidth;
      const y = Math.random() * window.innerHeight;
      stars.push({
        x, y, ox: x, oy: y,
        z:    Math.random() * 1.6 + 0.2,
        size: Math.random() * 1.8 + 0.3,
        speed: Math.random() * 0.28 + 0.04,
        color: STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)],
        vx: 0, vy: 0,
        twinkleOffset: Math.random() * Math.PI * 2,
      });
    }

    // ── Spawn shooting star ──────────────────────────────────────────────
    const spawnShooter = () => {
      const angle = (Math.random() * 30 + 15) * (Math.PI / 180); // 15–45°
      const speed = Math.random() * 8 + 6;
      shooters.current.push({
        x: Math.random() * canvas.width * 0.7,
        y: Math.random() * canvas.height * 0.3,
        vx:  Math.cos(angle) * speed,
        vy:  Math.sin(angle) * speed,
        life: 1,
        maxLife: Math.random() * 60 + 40,
        color: STAR_COLORS[Math.floor(Math.random() * 3)],
        tail: [],
      });
    };
    const shootInterval = setInterval(spawnShooter, SHOOT_INTERVAL);

    // ── Nebula gradient (static, drawn once per frame as bg layer) ───────
    const drawNebula = () => {
      const w = canvas.width;
      const h = canvas.height;
      const t = Date.now() * 0.0002;

      // Slow-breathing nebula blobs
      const blobs = [
        { x: w * 0.15, y: h * 0.2,  r: w * 0.28, c: "rgba(99,102,241,"  },
        { x: w * 0.82, y: h * 0.15, r: w * 0.22, c: "rgba(103,232,249," },
        { x: w * 0.5,  y: h * 0.75, r: w * 0.3,  c: "rgba(167,139,250," },
      ];
      for (const b of blobs) {
        const pulse = 0.03 + Math.sin(t + b.x) * 0.015;
        const g = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r);
        g.addColorStop(0,   `${b.c}${pulse})`);
        g.addColorStop(0.5, `${b.c}${pulse * 0.4})`);
        g.addColorStop(1,   `${b.c}0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    // ── Draw constellation lines ─────────────────────────────────────────
    const drawConstellations = (mx: number, my: number) => {
      for (let i = 0; i < stars.length; i++) {
        const a = stars[i];
        const dax = mx - a.x, day = my - a.y;
        const distA = Math.sqrt(dax * dax + day * day);
        if (distA > GATHER_RADIUS * 1.4) continue; // only near mouse

        for (let j = i + 1; j < stars.length; j++) {
          const b = stars[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const d  = Math.sqrt(dx * dx + dy * dy);
          if (d > CONNECT_DIST) continue;

          const alpha = (1 - d / CONNECT_DIST) * 0.18;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(103,232,249,${alpha.toFixed(3)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    };

    // ── Draw shooting stars ──────────────────────────────────────────────
    const drawShooters = () => {
      shooters.current = shooters.current.filter(s => s.life > 0);
      for (const s of shooters.current) {
        s.tail.push({ x: s.x, y: s.y });
        if (s.tail.length > 18) s.tail.shift();

        s.x += s.vx;
        s.y += s.vy;
        s.life -= 1 / s.maxLife;

        // Draw tail
        for (let i = 1; i < s.tail.length; i++) {
          const t = i / s.tail.length;
          ctx.beginPath();
          ctx.moveTo(s.tail[i - 1].x, s.tail[i - 1].y);
          ctx.lineTo(s.tail[i].x,     s.tail[i].y);
          ctx.strokeStyle = `${s.color}${(t * s.life * 0.9).toFixed(3)})`;
          ctx.lineWidth   = t * 2.2;
          ctx.stroke();
        }

        // Head glow
        ctx.shadowBlur  = 12;
        ctx.shadowColor = `${s.color}1)`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, 1.8, 0, Math.PI * 2);
        ctx.fillStyle = `${s.color}${s.life.toFixed(2)})`;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    };

    // ── Draw click bursts ────────────────────────────────────────────────
    const drawBursts = () => {
      bursts.current = bursts.current.filter(b => b.particles.some(p => p.life > 0));
      for (const burst of bursts.current) {
        for (const p of burst.particles) {
          if (p.life <= 0) continue;
          p.x  += p.vx;
          p.y  += p.vy;
          p.vx *= 0.93;
          p.vy *= 0.93;
          p.vy += 0.04; // slight gravity
          p.life -= 0.025;

          ctx.shadowBlur  = 6;
          ctx.shadowColor = `${p.color}1)`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
          ctx.fillStyle = `${p.color}${Math.max(0, p.life).toFixed(2)})`;
          ctx.fill();
        }
        ctx.shadowBlur = 0;
      }
    };

    // ── Main draw loop ───────────────────────────────────────────────────
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const mx = mouse.current.x;
      const my = mouse.current.y;
      const now = Date.now();

      drawNebula();
      drawConstellations(mx, my);

      for (const star of stars) {
        const dx   = mx - star.x;
        const dy   = my - star.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Gather pull
        if (dist < GATHER_RADIUS && dist > 0) {
          const force = (1 - dist / GATHER_RADIUS) * GATHER_STRENGTH;
          star.vx += dx * force;
          star.vy += dy * force;
        }

        // Spring return
        star.vx += (star.ox - star.x) * RETURN_STRENGTH;
        star.vy += (star.oy - star.y) * RETURN_STRENGTH;
        star.vx *= 0.82;
        star.vy *= 0.82;
        star.x  += star.vx;
        star.y  += star.vy;

        // Drift origin upward
        star.oy -= star.speed;
        if (star.oy < -4) {
          star.oy = canvas.height + 4;
          star.ox = Math.random() * canvas.width;
          star.x  = star.ox;
          star.y  = star.oy;
        }

        const proximity  = dist < GATHER_RADIUS ? 1 - dist / GATHER_RADIUS : 0;
        const twinkle    = Math.sin(now * 0.0012 * star.z + star.twinkleOffset);
        const alpha      = Math.min(1, 0.3 + twinkle * 0.2 + proximity * 0.5);
        const drawSize   = star.size * star.z * (1 + proximity * 1.0);

        if (proximity > 0.08) {
          ctx.shadowBlur  = 6 + proximity * 18;
          ctx.shadowColor = `${star.color}1)`;
        } else {
          ctx.shadowBlur = 0;
        }

        ctx.beginPath();
        ctx.arc(star.x, star.y, drawSize, 0, Math.PI * 2);
        ctx.fillStyle = `${star.color}${alpha.toFixed(2)})`;
        ctx.fill();
      }

      ctx.shadowBlur = 0;
      drawShooters();
      drawBursts();

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      clearInterval(shootInterval);
      window.removeEventListener("resize",     resize);
      window.removeEventListener("mousemove",  onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("click",      onClick);
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
