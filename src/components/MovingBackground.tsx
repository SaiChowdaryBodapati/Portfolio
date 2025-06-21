import { useState, useEffect } from 'react';

const MovingBackground = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const parallax = (factor: number) => ({
    transform: `translate(${mousePosition.x * factor / 1000}px, ${mousePosition.y * factor / 1000}px)`
  });

  return (
    <div className="absolute inset-0 overflow-hidden -z-10">
      {/* Subtle grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px]"></div>
      
      {/* Floating particles */}
      {[...Array(30)].map((_, i) => (
        <div
          key={i}
          className={`absolute rounded-full bg-slate-700/50`}
          style={{
            ...parallax(Math.random() * -50 - 10),
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${Math.random() * 3 + 1}px`,
            height: `${Math.random() * 3 + 1}px`,
            animation: `float ${Math.random() * 10 + 5}s ease-in-out infinite`
          }}
        />
      ))}
    </div>
  );
};

export default MovingBackground; 