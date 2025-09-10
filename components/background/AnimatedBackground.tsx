"use client";

import { useEffect, useState } from "react";
import { AnimatedBall } from "./AnimatedBall";

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
   const [balls, setBalls] = useState<Ball[]>([]);

   useEffect(() => {
      const colors = [
         "rgba(139, 69, 19, 0.3)", // Brown
         "rgba(255, 165, 0, 0.3)", // Orange
         "rgba(255, 20, 147, 0.3)", // Deep Pink
         "rgba(0, 191, 255, 0.3)", // Deep Sky Blue
         "rgba(50, 205, 50, 0.3)", // Lime Green
         "rgba(138, 43, 226, 0.3)", // Blue Violet
         "rgba(255, 69, 0, 0.3)", // Red Orange
         "rgba(0, 206, 209, 0.3)", // Dark Turquoise
      ];

      const initialBalls = Array.from({ length: 15 }, (_, i) => ({
         id: i,
         x: Math.random() * window.innerWidth,
         y: Math.random() * window.innerHeight,
         size: Math.random() * 200 + 50,
         color: colors[Math.floor(Math.random() * colors.length)],
         speedX: (Math.random() - 0.5) * 0.5,
         speedY: (Math.random() - 0.5) * 0.5,
         opacity: Math.random() * 0.4 + 0.1,
      }));

      setBalls(initialBalls);

      const animateBalls = () => {
         setBalls((prevBalls) =>
            prevBalls.map((ball) => {
               let newX = ball.x + ball.speedX;
               let newY = ball.y + ball.speedY;
               let newSpeedX = ball.speedX;
               let newSpeedY = ball.speedY;

               if (newX <= 0 || newX >= window.innerWidth - ball.size) {
                  newSpeedX = -ball.speedX;
                  newX = Math.max(
                     0,
                     Math.min(newX, window.innerWidth - ball.size)
                  );
               }
               if (newY <= 0 || newY >= window.innerHeight - ball.size) {
                  newSpeedY = -ball.speedY;
                  newY = Math.max(
                     0,
                     Math.min(newY, window.innerHeight - ball.size)
                  );
               }

               return {
                  ...ball,
                  x: newX,
                  y: newY,
                  speedX: newSpeedX,
                  speedY: newSpeedY,
               };
            })
         );
      };

      const interval = setInterval(animateBalls, 16);
      return () => clearInterval(interval);
   }, []);

   return (
      <div className='fixed inset-0 overflow-hidden pointer-events-none'>
         {balls.map((ball) => (
            <AnimatedBall key={ball.id} ball={ball} />
         ))}
         <style jsx>{`
            @keyframes float {
               0% {
                  transform: translateY(0px) scale(1);
               }
               100% {
                  transform: translateY(-20px) scale(1.05);
               }
            }
         `}</style>
      </div>
   );
};
