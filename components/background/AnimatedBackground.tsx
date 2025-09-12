'use client';
import { useEffect, useRef } from 'react';

import { AnimatedBall } from './AnimatedBall';

interface Ball {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  speedX: number;
  speedY: number;
  opacity: number;
}

export const AnimatedBackground = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const ballRefs = useRef<Map<number, HTMLDivElement>>(new Map());
  const ballsRef = useRef<Ball[]>([]);

  useEffect(() => {
    const colors = [
      'rgba(255, 99, 132, 0.9)',
      'rgba(54, 162, 235, 0.9)',
      'rgba(255, 206, 86, 0.9)',
      'rgba(75, 192, 192, 0.9)',
      'rgba(153, 102, 255, 0.9)',
      'rgba(255, 159, 64, 0.9)',
      'rgba(46, 204, 113, 0.9)',
      'rgba(231, 76, 60, 0.9)',
    ];

    // Reduce ball count to 9 and make some balls significantly larger
    const count = 9;
    const initial: Ball[] = Array.from({ length: count }, (_, i) => {
      const baseSize = i % 3 === 0 ? 520 : i % 4 === 0 ? 380 : 220 + Math.random() * 180;

      return {
        id: i,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: baseSize,
        color: colors[i % colors.length],
        speedX: (Math.random() - 0.5) * 0.25,
        speedY: (Math.random() - 0.5) * 0.25,
        opacity: Math.random() * 0.25 + 0.75,
      };
    });

    ballsRef.current = initial;

    let rafId = 0;

    const animate = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;

      for (const b of ballsRef.current) {
        b.x += b.speedX;
        b.y += b.speedY;

        if (b.x <= -b.size * 0.5) b.x = w + b.size * 0.5;
        else if (b.x >= w + b.size * 0.5) b.x = -b.size * 0.5;

        if (b.y <= -b.size * 0.5) b.y = h + b.size * 0.5;
        else if (b.y >= h + b.size * 0.5) b.y = -b.size * 0.5;

        const el = ballRefs.current.get(b.id);

        if (el) {
          el.style.transform = `translate3d(${Math.round(b.x)}px, ${Math.round(b.y)}px, 0)`;
        }
      }

      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);

    const handleResize = () => {
      // nothing special needed; wrap logic uses window size each frame
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 9 }).map((_, i) => {
        const b = ballsRef.current[i] || {
          id: i,
          x: 0,
          y: 0,
          size: 200,
          color: 'rgba(255,255,255,0.8)',
          opacity: 0.9,
        };

        return (
          <AnimatedBall
            key={i}
            ref={(el: HTMLDivElement | null) => {
              if (el) ballRefs.current.set(i, el);
              else ballRefs.current.delete(i);
            }}
            ball={b}
          />
        );
      })}
    </div>
  );
};
