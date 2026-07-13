"use client";

import { useEffect, useRef } from "react";

type Point = {
  x: number;
  y: number;
};

type PigmentParticle = {
  x: number;
  y: number;
  age: number;
  life: number;
  speed: number;
  phase: number;
  width: number;
  alpha: number;
  hue: number;
  history: Point[];
};

type DyeFlowCanvasProps = {
  className?: string;
};

function seededRandom(seed: number) {
  let value = seed >>> 0;

  return () => {
    value += 0x6d2b79f5;
    let result = value;
    result = Math.imul(result ^ (result >>> 15), result | 1);
    result ^= result + Math.imul(result ^ (result >>> 7), result | 61);
    return ((result ^ (result >>> 14)) >>> 0) / 4294967296;
  };
}

function createParticle(): PigmentParticle {
  return {
    x: 0,
    y: 0,
    age: 0,
    life: 1,
    speed: 1,
    phase: 0,
    width: 1,
    alpha: 0.2,
    hue: 218,
    history: [],
  };
}

export default function DyeFlowCanvas({ className = "" }: DyeFlowCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const random = seededRandom(140);
    const particles: PigmentParticle[] = [];
    const pointer = { x: 0, y: 0, active: false };
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let width = 1;
    let height = 1;
    let frame = 0;
    let previousTime = 0;
    let running = false;
    let inView = true;

    const resetParticle = (particle: PigmentParticle, spread = false) => {
      particle.x = spread
        ? random() * width
        : width * (0.76 + random() * 0.32);
      particle.y = height * (0.28 + random() * 0.62);
      particle.age = spread ? random() * 260 : 0;
      particle.life = 190 + random() * 260;
      particle.speed = 0.55 + random() * 0.9;
      particle.phase = random() * Math.PI * 2;
      particle.width = 0.45 + random() * 1.45;
      particle.alpha = 0.13 + random() * 0.27;
      particle.hue = 212 + random() * 14;
      particle.history = Array.from({ length: 9 }, () => ({
        x: particle.x,
        y: particle.y,
      }));
    };

    const sizeCanvas = () => {
      const bounds = canvas.getBoundingClientRect();
      width = Math.max(1, bounds.width);
      height = Math.max(1, bounds.height);
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.6);

      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

      const particleCount = width < 640 ? 52 : width < 1100 ? 76 : 104;
      while (particles.length < particleCount) particles.push(createParticle());
      particles.length = particleCount;
      particles.forEach((particle) => resetParticle(particle, true));
    };

    const draw = (time: number, animate: boolean) => {
      const delta = previousTime
        ? Math.min(2.2, Math.max(0.35, (time - previousTime) / 16.667))
        : 1;
      previousTime = time;

      context.clearRect(0, 0, width, height);
      context.save();
      context.globalCompositeOperation = "screen";
      context.lineCap = "round";
      context.lineJoin = "round";

      particles.forEach((particle) => {
        if (animate) {
          const horizontalFlow = -0.42 * particle.speed;
          const eddy = Math.sin(
            particle.y * 0.013 + time * 0.00048 + particle.phase
          );
          const crossCurrent = Math.cos(
            particle.x * 0.009 - time * 0.00031 + particle.phase
          );

          particle.x += (horizontalFlow + eddy * 0.13) * delta;
          particle.y += (crossCurrent * 0.19 + 0.035) * particle.speed * delta;

          if (pointer.active) {
            const dx = pointer.x - particle.x;
            const dy = pointer.y - particle.y;
            const distance = Math.hypot(dx, dy);
            const radius = Math.min(width, height) * 0.23;

            if (distance > 1 && distance < radius) {
              const influence = (1 - distance / radius) * delta * 0.72;
              particle.x += (-dy / distance) * influence;
              particle.y += (dx / distance) * influence;
            }
          }

          particle.age += delta;
          particle.history.unshift({ x: particle.x, y: particle.y });
          particle.history.length = 9;

          if (
            particle.age > particle.life ||
            particle.x < -width * 0.12 ||
            particle.y < -height * 0.1 ||
            particle.y > height * 1.1
          ) {
            resetParticle(particle);
          }
        }

        const lifeFade = Math.sin(
          Math.min(1, particle.age / particle.life) * Math.PI
        );
        const opacity = particle.alpha * (0.35 + lifeFade * 0.65);

        context.beginPath();
        particle.history.forEach((point, index) => {
          if (index === 0) context.moveTo(point.x, point.y);
          else context.lineTo(point.x, point.y);
        });
        context.strokeStyle = `hsla(${particle.hue}, 92%, 67%, ${opacity})`;
        context.lineWidth = particle.width;
        context.shadowColor = `hsla(${particle.hue}, 94%, 62%, ${opacity})`;
        context.shadowBlur = particle.width * 5;
        context.stroke();
      });

      context.restore();
    };

    const stop = () => {
      running = false;
      window.cancelAnimationFrame(frame);
    };

    const tick = (time: number) => {
      if (!running) return;
      draw(time, true);
      frame = window.requestAnimationFrame(tick);
    };

    const start = () => {
      if (running || reduceMotion || !inView || document.hidden) return;
      running = true;
      previousTime = 0;
      frame = window.requestAnimationFrame(tick);
    };

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      const bounds = canvas.getBoundingClientRect();
      const inside =
        event.clientX >= bounds.left &&
        event.clientX <= bounds.right &&
        event.clientY >= bounds.top &&
        event.clientY <= bounds.bottom;

      pointer.active = inside;
      if (inside) {
        pointer.x = event.clientX - bounds.left;
        pointer.y = event.clientY - bounds.top;
      }
    };

    const onVisibilityChange = () => {
      if (document.hidden) stop();
      else start();
    };

    const resizeObserver = new ResizeObserver(() => {
      sizeCanvas();
      if (reduceMotion) draw(0, false);
    });
    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        if (inView) start();
        else stop();
      },
      { rootMargin: "20% 0px" }
    );

    sizeCanvas();
    if (reduceMotion) draw(0, false);
    else start();

    resizeObserver.observe(canvas);
    intersectionObserver.observe(canvas);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      stop();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none block h-full w-full ${className}`}
    />
  );
}
