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
            background: `radial-gradient(circle at 30% 30%, ${ball.color}, rgba(255,255,255,0.1) 40%, transparent 70%)`,
            opacity: ball.opacity,
            filter: `blur(${Math.max(8, ball.size / 20)}px)`,
            transform: 'translateZ(0)',
            willChange: 'transform',
         }}
      />
   );
};
