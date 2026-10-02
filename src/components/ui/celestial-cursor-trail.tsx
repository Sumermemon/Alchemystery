'use client';

import { useEffect, useRef } from 'react';

interface Sparkle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  maxLife: number;
  life: number;
  color: string;
  isStar: boolean;
  rotation: number;
  vRot: number;
}

export function CelestialCursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    // Only enable on desktop with fine mouse pointer and no reduced motion
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(pointer: coarse)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const sparkles: Sparkle[] = [];
    const colors = [
      '#CFA56A', // Champagne gold
      '#E8D3A7', // Light gold
      '#D4AF37', // Mystic gold
      '#C084FC', // Ethereal violet
      '#F6F3EE', // Warm starlight
    ];

    let lastX = -100;
    let lastY = -100;
    let lastTime = 0;

    const drawFourPointStar = (
      context: CanvasRenderingContext2D,
      cx: number,
      cy: number,
      size: number,
      rotation: number
    ) => {
      context.save();
      context.translate(cx, cy);
      context.rotate(rotation);
      context.beginPath();
      for (let i = 0; i < 4; i++) {
        context.lineTo(0, -size);
        context.lineTo(size * 0.25, -size * 0.25);
        context.rotate(Math.PI / 2);
      }
      context.closePath();
      context.fill();
      context.restore();
    };

    const addSparkle = (x: number, y: number, isBurst = false) => {
      if (sparkles.length > 50) return; // Cap maximum active particles

      const count = isBurst ? 5 : 1;
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = isBurst ? Math.random() * 2 + 0.8 : Math.random() * 0.8 + 0.2;
        sparkles.push({
          x: x + (Math.random() - 0.5) * 6,
          y: y + (Math.random() - 0.5) * 6,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - (isBurst ? 0.5 : 0.2), // gentle upward float
          size: isBurst ? Math.random() * 3.5 + 2 : Math.random() * 2.5 + 1.2,
          maxLife: isBurst ? 40 : 28,
          life: 0,
          color: colors[Math.floor(Math.random() * colors.length)],
          isStar: Math.random() > 0.45,
          rotation: Math.random() * Math.PI,
          vRot: (Math.random() - 0.5) * 0.1,
        });
      }
    };

    // Track mouse move with subtle distance threshold
    const handleMouseMove = (e: MouseEvent) => {
      const now = performance.now();
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      const dist = Math.hypot(dx, dy);

      if (dist > 8 || now - lastTime > 60) {
        addSparkle(e.clientX, e.clientY, false);
        lastX = e.clientX;
        lastY = e.clientY;
        lastTime = now;
      }
    };

    // Burst sparkles when hovering or clicking interactive elements
    const handlePointerOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a') ||
        target.getAttribute('role') === 'button'
      ) {
        addSparkle(e.clientX, e.clientY, true);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseover', handlePointerOver, { passive: true });

    // Animation Loop (60fps)
    let isRunning = true;
    const render = () => {
      if (!isRunning) return;

      ctx.clearRect(0, 0, width, height);

      for (let i = sparkles.length - 1; i >= 0; i--) {
        const s = sparkles[i];
        s.life++;

        if (s.life >= s.maxLife) {
          sparkles.splice(i, 1);
          continue;
        }

        s.x += s.vx;
        s.y += s.vy;
        s.vy -= 0.015; // subtle gravity/buoyancy
        s.rotation += s.vRot;

        const progress = s.life / s.maxLife;
        // Fade in quickly, then fade out smoothly
        const alpha = progress < 0.2 ? progress / 0.2 : 1 - (progress - 0.2) / 0.8;
        const currentSize = s.size * (1 - progress * 0.4);

        ctx.fillStyle = s.color;
        ctx.globalAlpha = Math.max(0, Math.min(1, alpha * 0.85));
        ctx.shadowColor = s.color;
        ctx.shadowBlur = 6;

        if (s.isStar) {
          drawFourPointStar(ctx, s.x, s.y, currentSize, s.rotation);
        } else {
          ctx.beginPath();
          ctx.arc(s.x, s.y, currentSize, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;
      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      isRunning = false;
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handlePointerOver);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-[99998] select-none"
    />
  );
}
