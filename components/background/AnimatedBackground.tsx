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
         "rgba(255, 99, 132, 0.8)", // Pink - much more visible
         "rgba(54, 162, 235, 0.8)", // Blue - much more visible
         "rgba(255, 206, 86, 0.8)", // Yellow - much more visible
         "rgba(75, 192, 192, 0.8)", // Teal - much more visible
         "rgba(153, 102, 255, 0.8)", // Purple - much more visible
         "rgba(255, 159, 64, 0.8)", // Orange - much more visible
         "rgba(46, 204, 113, 0.8)", // Green - much more visible
         "rgba(231, 76, 60, 0.8)", // Red - much more visible
      ];

      const initialBalls = Array.from({ length: 15 }, (_, i) => ({
         id: i,
         x: Math.random() * window.innerWidth,
         y: Math.random() * window.innerHeight,
         size: Math.random() * 350 + 120, // Much larger balls
         color: colors[i % colors.length], // Static color assignment based on ball ID
         speedX: (Math.random() - 0.5) * 0.3,
         speedY: (Math.random() - 0.5) * 0.3,
         opacity: Math.random() * 0.4 + 0.6, // Much higher opacity (0.6-1.0)
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
