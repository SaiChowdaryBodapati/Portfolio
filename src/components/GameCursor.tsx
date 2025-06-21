
import { useState, useEffect } from 'react';

const GameCursor = () => {
  const [trails, setTrails] = useState<Array<{ x: number; y: number; id: number }>>([]);
  const [trailId, setTrailId] = useState(0);
  const [particles, setParticles] = useState<Array<{ x: number; y: number; id: number; opacity: number }>>([]);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      const newTrail = { x: e.clientX, y: e.clientY, id: trailId };
      
      setTrails(prev => {
        const updated = [...prev, newTrail].slice(-20); // Keep last 20 trails
        return updated;
      });
      
      setTrailId(prev => prev + 1);

      // Add particle effect on click
      if (e.type === 'click') {
        const newParticles = Array.from({ length: 8 }, (_, i) => ({
          x: e.clientX + (Math.random() - 0.5) * 100,
          y: e.clientY + (Math.random() - 0.5) * 100,
          id: Date.now() + i,
          opacity: 1
        }));
        
        setParticles(prev => [...prev, ...newParticles]);
        
        // Remove particles after animation
        setTimeout(() => {
          setParticles(prev => prev.filter(p => !newParticles.find(np => np.id === p.id)));
        }, 1000);
      }
    };

    document.addEventListener('mousemove', updatePosition);
    document.addEventListener('click', updatePosition);

    // Clean up old trails
    const cleanupInterval = setInterval(() => {
      setTrails(prev => prev.slice(-15));
    }, 100);

    return () => {
      document.removeEventListener('mousemove', updatePosition);
      document.removeEventListener('click', updatePosition);
      clearInterval(cleanupInterval);
    };
  }, [trailId]);

  return (
    <>
      {/* Cursor trails */}
      {trails.map((trail, index) => (
        <div
          key={trail.id}
          className="fixed w-4 h-4 pointer-events-none z-[9998] rounded-full"
          style={{
            left: trail.x - 8,
            top: trail.y - 8,
            background: `radial-gradient(circle, rgba(59, 130, 246, ${(index + 1) / trails.length}), rgba(139, 92, 246, ${(index + 1) / trails.length * 0.8}), rgba(236, 72, 153, ${(index + 1) / trails.length * 0.6}))`,
            opacity: (index + 1) / trails.length * 0.8,
            transform: `scale(${(index + 1) / trails.length})`,
            transition: 'opacity 0.3s ease-out, transform 0.3s ease-out',
            boxShadow: `0 0 ${4 * (index + 1) / trails.length}px rgba(59, 130, 246, 0.6)`
          }}
        />
      ))}

      {/* Click particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="fixed w-2 h-2 pointer-events-none z-[9997] rounded-full animate-ping"
          style={{
            left: particle.x - 4,
            top: particle.y - 4,
            background: `radial-gradient(circle, #10B981, #3B82F6)`,
            opacity: particle.opacity,
            animation: 'ping 1s cubic-bezier(0, 0, 0.2, 1) infinite'
          }}
        />
      ))}
    </>
  );
};

export default GameCursor;
