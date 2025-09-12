import React from 'react';

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

// Forward a ref so the parent can update transform directly for smooth animation
export const AnimatedBall = React.forwardRef<HTMLDivElement, AnimatedBallProps>(({ ball }, ref) => {
  // Derive a soft glow color from the ball color if it's in rgba(...) form.
  const glowColor = (() => {
    const m = ball.color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*[\d.]+)?\)/);

    if (m) {
      const [, r, g, b] = m;

      return `rgba(${r}, ${g}, ${b}, 0.22)`;
    }

    return ball.color;
  })();

  return (
    <div
      ref={ref}
      className="absolute rounded-full"
      style={{
        left: 0,
        top: 0,
        width: ball.size,
        height: ball.size,
        backgroundColor: ball.color,
        opacity: ball.opacity,
        transform: `translate3d(${ball.x}px, ${ball.y}px, 0)`,
        willChange: 'transform',
        boxShadow: `0 10px ${Math.max(8, ball.size / 12)}px ${glowColor}`,
        pointerEvents: 'none',
        borderRadius: '50%',
      }}
    />
  );
});

AnimatedBall.displayName = 'AnimatedBall';
