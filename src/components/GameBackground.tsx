import { useState, useEffect } from 'react';

const GameBackground = () => {
  const [bricks, setBricks] = useState<Array<{ id: number; x: number; y: number; color: string; visible: boolean; row: number; col: number }>>([]);
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; vx: number; vy: number; color: string }>>([]);
  const [floatingElements, setFloatingElements] = useState<Array<{ id: number; x: number; y: number; size: number; speed: number }>>([]);

  useEffect(() => {
    const colors = ['#EF4444', '#3B82F6', '#10B981', '#F59E0B', '#8B5CF6', '#EC4899'];
    const newBricks = [];
    
    // Create more dynamic brick pattern
    for (let row = 0; row < 12; row++) {
      for (let col = 0; col < 20; col++) {
        if (Math.random() > 0.4) { // 60% chance for brick to exist
          newBricks.push({
            id: row * 20 + col,
            x: col * 5 + 2,
            y: row * 6 + 5,
            color: colors[Math.floor(Math.random() * colors.length)],
            visible: Math.random() > 0.1, // 90% initially visible
            row,
            col
          });
        }
      }
    }
    setBricks(newBricks);

    // Create floating elements
    const newFloatingElements = [];
    for (let i = 0; i < 15; i++) {
      newFloatingElements.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        speed: Math.random() * 0.5 + 0.1
      });
    }
    setFloatingElements(newFloatingElements);

    // Animate bricks with more dynamic pattern
    const brickInterval = setInterval(() => {
      setBricks(prev => prev.map(brick => ({
        ...brick,
        visible: Math.random() > 0.03 // 97% chance to be visible
      })));
    }, 2000);

    // Create floating particles
    const createParticles = () => {
      const newParticles = [];
      for (let i = 0; i < 20; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          vx: (Math.random() - 0.5) * 0.2,
          vy: (Math.random() - 0.5) * 0.2,
          color: colors[Math.floor(Math.random() * colors.length)]
        });
      }
      setParticles(newParticles);
    };

    createParticles();

    // Animate particles
    const particleInterval = setInterval(() => {
      setParticles(prev => prev.map(particle => ({
        ...particle,
        x: (particle.x + particle.vx + 100) % 100,
        y: (particle.y + particle.vy + 100) % 100
      })));
    }, 100);

    // Animate floating elements
    const floatingInterval = setInterval(() => {
      setFloatingElements(prev => prev.map(element => ({
        ...element,
        y: (element.y - element.speed + 100) % 100
      })));
    }, 50);

    return () => {
      clearInterval(brickInterval);
      clearInterval(particleInterval);
      clearInterval(floatingInterval);
    };
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Grid background */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      {/* Enhanced bricks with glow effect */}
      {bricks.map((brick) => (
        <div
          key={brick.id}
          className={`absolute rounded-sm transition-all duration-700 ${
            brick.visible ? 'opacity-30 scale-100' : 'opacity-0 scale-0'
          }`}
          style={{
            left: `${brick.x}%`,
            top: `${brick.y}%`,
            width: '3%',
            height: '3%',
            backgroundColor: brick.color,
            boxShadow: `
              inset 0 1px 0 rgba(255,255,255,0.4),
              inset 0 -1px 0 rgba(0,0,0,0.4),
              0 0 8px ${brick.color}40,
              0 2px 4px rgba(0,0,0,0.3)
            `,
            border: '1px solid rgba(255,255,255,0.2)'
          }}
        />
      ))}

      {/* Floating geometric elements */}
      {floatingElements.map((element) => (
        <div
          key={element.id}
          className="absolute animate-pulse"
          style={{
            left: `${element.x}%`,
            top: `${element.y}%`,
            width: `${element.size}px`,
            height: `${element.size}px`,
            background: `radial-gradient(circle, rgba(59, 130, 246, 0.6), rgba(139, 92, 246, 0.4))`,
            borderRadius: element.size > 2 ? '50%' : '2px',
            boxShadow: `0 0 ${element.size * 2}px rgba(59, 130, 246, 0.4)`
          }}
        />
      ))}
      
      {/* Floating particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute w-1 h-1 rounded-full animate-pulse"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            backgroundColor: particle.color,
            opacity: 0.6,
            boxShadow: `0 0 4px ${particle.color}`
          }}
        />
      ))}

      {/* Game border effect */}
      <div className="absolute inset-0 border-4 border-blue-500/10 rounded-lg pointer-events-none" />
      
      {/* Enhanced corner decorative elements */}
      <div className="absolute top-4 left-4 w-12 h-12 border-l-4 border-t-4 border-blue-500/50 rounded-tl-lg">
        <div className="absolute -top-1 -left-1 w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
      </div>
      <div className="absolute top-4 right-4 w-12 h-12 border-r-4 border-t-4 border-green-500/50 rounded-tr-lg">
        <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
      </div>
      <div className="absolute bottom-4 left-4 w-12 h-12 border-l-4 border-b-4 border-purple-500/50 rounded-bl-lg">
        <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
      </div>
      <div className="absolute bottom-4 right-4 w-12 h-12 border-r-4 border-b-4 border-pink-500/50 rounded-br-lg">
        <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-pink-400 rounded-full animate-pulse"></div>
      </div>

      {/* Scanning line effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-60 animate-pulse"
             style={{ 
               top: '20%',
               animation: 'scan 8s linear infinite'
             }}
        />
      </div>
    </div>
  );
};

export default GameBackground;
