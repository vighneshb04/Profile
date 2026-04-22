"use client";
import { useEffect, useRef } from "react";

interface Star {
  x: number; y: number;
  vx: number; vy: number;
  r: number; o: number; to: number;
  twinkleSpeed: number;
  layer: number;
}

interface Shooter {
  x: number; y: number;
  vx: number; vy: number;
  life: number; maxLife: number;
  active: boolean;
}

export default function SpaceCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    let raf: number;
    let W = 0, H = 0;
    const stars: Star[] = [];
    const shooters: Shooter[] = Array.from({ length: 5 }, () => ({ x: 0, y: 0, vx: 0, vy: 0, life: 0, maxLife: 0, active: false }));
    const MOUSE = { x: -9999, y: -9999 };

    const resize = () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", (e) => { MOUSE.x = e.clientX; MOUSE.y = e.clientY; });

    for (let i = 0; i < 380; i++) {
      const layer = i < 130 ? 0 : i < 280 ? 1 : 2;
      stars.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * (layer === 0 ? 0.04 : layer === 1 ? 0.1 : 0.22),
        vy: (Math.random() - 0.5) * (layer === 0 ? 0.04 : layer === 1 ? 0.1 : 0.22),
        r: layer === 0 ? Math.random() * 0.5 + 0.1 : layer === 1 ? Math.random() * 0.9 + 0.3 : Math.random() * 1.5 + 0.5,
        o: Math.random() * 0.5 + 0.05,
        to: Math.random() * 0.5 + 0.05,
        twinkleSpeed: Math.random() * 0.006 + 0.002,
        layer,
      });
    }

    const spawnShooter = () => {
      const s = shooters.find(s => !s.active);
      if (!s) return;
      const edge = Math.random() < 0.6 ? 0 : 1;
      s.x = edge === 0 ? Math.random() * W : W + 10;
      s.y = edge === 0 ? -10 : Math.random() * H * 0.4;
      const angle = Math.PI / 4 + (Math.random() - 0.5) * 0.4;
      const speed = 5 + Math.random() * 7;
      s.vx = edge === 0 ? Math.cos(angle) * speed : -speed * 0.9;
      s.vy = edge === 0 ? Math.sin(angle) * speed : speed * 0.25;
      s.maxLife = 55 + Math.random() * 45;
      s.life = 0;
      s.active = true;
    };

    let shooterTimer = 60;

    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      // Nebula glows
      const grad = ctx.createRadialGradient(W * 0.15, H * 0.18, 0, W * 0.15, H * 0.18, W * 0.38);
      grad.addColorStop(0, "rgba(184,164,138,0.018)");
      grad.addColorStop(1, "transparent");
      ctx.fillStyle = grad; ctx.fillRect(0, 0, W, H);

      const grad2 = ctx.createRadialGradient(W * 0.88, H * 0.82, 0, W * 0.88, H * 0.82, W * 0.28);
      grad2.addColorStop(0, "rgba(100,85,65,0.014)");
      grad2.addColorStop(1, "transparent");
      ctx.fillStyle = grad2; ctx.fillRect(0, 0, W, H);

      for (let layer = 0; layer < 3; layer++) {
        const ls = stars.filter(s => s.layer === layer);

        for (const p of ls) {
          if (Math.abs(p.o - p.to) < 0.008) p.to = Math.random() * 0.55 + 0.05;
          p.o += (p.to - p.o) * p.twinkleSpeed * 4;

          if (layer === 2) {
            const dx = p.x - MOUSE.x, dy = p.y - MOUSE.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 130) {
              const force = (130 - dist) / 130;
              p.vx += (dx / dist) * force * 0.55;
              p.vy += (dy / dist) * force * 0.55;
            }
          }

          p.vx *= 0.991; p.vy *= 0.991;
          p.x += p.vx; p.y += p.vy;
          if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
          if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;

          const alpha = p.o * (layer === 0 ? 0.42 : layer === 1 ? 0.62 : 0.85);

          if (layer === 2 && p.r > 1.1) {
            const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 5);
            g.addColorStop(0, `rgba(220,200,165,${alpha * 0.5})`);
            g.addColorStop(1, "transparent");
            ctx.fillStyle = g;
            ctx.beginPath(); ctx.arc(p.x, p.y, p.r * 5, 0, Math.PI * 2); ctx.fill();
          }

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(220,205,175,${alpha})`;
          ctx.fill();
        }

        if (layer === 1) {
          for (let i = 0; i < ls.length; i++) {
            for (let j = i + 1; j < ls.length; j++) {
              const dx = ls[i].x - ls[j].x, dy = ls[i].y - ls[j].y;
              const d = Math.sqrt(dx * dx + dy * dy);
              if (d < 85) {
                ctx.beginPath();
                ctx.moveTo(ls[i].x, ls[i].y);
                ctx.lineTo(ls[j].x, ls[j].y);
                ctx.strokeStyle = `rgba(184,164,138,${0.055 * (1 - d / 85)})`;
                ctx.lineWidth = 0.35; ctx.stroke();
              }
            }
          }
        }
      }

      // Shooting stars
      shooterTimer--;
      if (shooterTimer <= 0) { spawnShooter(); shooterTimer = 150 + Math.floor(Math.random() * 100); }

      for (const s of shooters) {
        if (!s.active) continue;
        s.life++;
        if (s.life >= s.maxLife) { s.active = false; continue; }
        const progress = s.life / s.maxLife;
        const alpha = progress < 0.15 ? progress / 0.15 : progress > 0.75 ? (1 - progress) / 0.25 : 1;
        const speed = Math.sqrt(s.vx ** 2 + s.vy ** 2);
        const tailLen = 60 + speed * 6;
        const nx = s.vx / speed, ny = s.vy / speed;
        const g = ctx.createLinearGradient(s.x - nx * tailLen, s.y - ny * tailLen, s.x, s.y);
        g.addColorStop(0, "transparent");
        g.addColorStop(0.6, `rgba(220,200,170,${alpha * 0.4})`);
        g.addColorStop(1, `rgba(255,248,235,${alpha})`);
        ctx.beginPath();
        ctx.moveTo(s.x - nx * tailLen, s.y - ny * tailLen);
        ctx.lineTo(s.x, s.y);
        ctx.strokeStyle = g; ctx.lineWidth = 1.8; ctx.stroke();
        const hg = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, 5);
        hg.addColorStop(0, `rgba(255,252,245,${alpha})`);
        hg.addColorStop(1, "transparent");
        ctx.fillStyle = hg;
        ctx.beginPath(); ctx.arc(s.x, s.y, 5, 0, Math.PI * 2); ctx.fill();
        s.x += s.vx; s.y += s.vy;
      }

      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);

  return <canvas ref={ref} className="fixed inset-0 pointer-events-none z-0" style={{ opacity: 0.85 }} />;
}
