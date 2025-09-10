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
   return (
      <div
         className='absolute rounded-full'
         style={{
            left: ball.x,
            top: ball.y,
            width: ball.size,
            height: ball.size,
            background: `radial-gradient(circle at 30% 30%, ${ball.color}, rgba(255,255,255,0.3) 30%, ${ball.color.replace(/[\d\.]+\)$/g, '0.4)')} 70%, transparent 85%)`,
            opacity: ball.opacity,
            filter: `blur(${Math.max(4, ball.size / 30)}px)`, // Less blur to make more visible
            transform: 'translateZ(0)',
            willChange: 'transform',
            boxShadow: `0 0 ${ball.size / 4}px ${ball.color.replace(/[\d\.]+\)$/g, '0.6)')}`, // Add glow effect
         }}
      />
   );
};
