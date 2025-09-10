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
         "rgba(255, 99, 132, 0.4)", // Pink
         "rgba(54, 162, 235, 0.4)", // Blue  
         "rgba(255, 206, 86, 0.4)", // Yellow
         "rgba(75, 192, 192, 0.4)", // Teal
         "rgba(153, 102, 255, 0.4)", // Purple
         "rgba(255, 159, 64, 0.4)", // Orange
         "rgba(199, 199, 199, 0.3)", // Gray
         "rgba(83, 102, 255, 0.4)", // Indigo
      ];

      const initialBalls = Array.from({ length: 15 }, (_, i) => ({
         id: i,
         x: Math.random() * window.innerWidth,
         y: Math.random() * window.innerHeight,
         size: Math.random() * 250 + 80,
         color: colors[Math.floor(Math.random() * colors.length)],
         speedX: (Math.random() - 0.5) * 0.3,
         speedY: (Math.random() - 0.5) * 0.3,
         opacity: Math.random() * 0.4 + 0.2,
      }));

      setBalls(initialBalls);

      let animationFrame: number;

      const animateBalls = () => {
         setBalls((prevBalls) =>
            prevBalls.map((ball) => {
               let newX = ball.x + ball.speedX;
               let newY = ball.y + ball.speedY;
               let newSpeedX = ball.speedX;
               let newSpeedY = ball.speedY;

               if (newX <= -ball.size * 0.5) {
                  newX = window.innerWidth + ball.size * 0.5;
               } else if (newX >= window.innerWidth + ball.size * 0.5) {
                  newX = -ball.size * 0.5;
               }
               
               if (newY <= -ball.size * 0.5) {
                  newY = window.innerHeight + ball.size * 0.5;
               } else if (newY >= window.innerHeight + ball.size * 0.5) {
                  newY = -ball.size * 0.5;
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
         
         animationFrame = requestAnimationFrame(animateBalls);
      };

      animationFrame = requestAnimationFrame(animateBalls);
      return () => cancelAnimationFrame(animationFrame);
   }, []);

   return (
      <div className='fixed inset-0 overflow-hidden pointer-events-none'>
         {balls.map((ball) => (
            <AnimatedBall key={ball.id} ball={ball} />
         ))}
      </div>
   );
};
