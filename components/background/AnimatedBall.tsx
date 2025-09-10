interface AnimatedBallProps {
   ball: {
      id: number;
      x: number;
      y: number;
      size: number;
      color: string;
      opacity: number;
   };
}

export const AnimatedBall = ({ ball }: AnimatedBallProps) => {
   // Derive a soft glow color from the ball color if it's in rgba(...) form.
   const glowColor = (() => {
      const m = ball.color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*[\d.]+)?\)/);
      if (m) {
         const [, r, g, b] = m;
         return `rgba(${r}, ${g}, ${b}, 0.22)`;
      }
      // fallback to the provided color
      return ball.color;
   })();

   return (
      <div
         className="absolute rounded-full"
         style={{
            left: ball.x,
            top: ball.y,
            width: ball.size,
            height: ball.size,
            backgroundColor: ball.color,
            opacity: ball.opacity,
            transform: "translateZ(0)",
            willChange: "transform",
            boxShadow: `0 10px ${Math.max(8, ball.size / 12)}px ${glowColor}`,
            pointerEvents: "none",
         }}
      />
   );
};
