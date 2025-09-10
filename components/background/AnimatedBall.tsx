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
      className="absolute rounded-full blur-sm transition-all duration-300 ease-in-out"
      style={{
        left: ball.x,
        top: ball.y,
        width: ball.size,
        height: ball.size,
        backgroundColor: ball.color,
        opacity: ball.opacity,
        filter: 'blur(2px)',
        animation: `float ${3 + Math.random() * 2}s ease-in-out infinite alternate`,
      }}
    />
  );
};