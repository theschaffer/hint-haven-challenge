
import React, { useEffect, useState } from "react";

interface ConfettiProps {
  active: boolean;
}

const Confetti = ({ active }: ConfettiProps) => {
  const [particles, setParticles] = useState<Array<{ id: number; style: React.CSSProperties }>>([]);

  useEffect(() => {
    if (!active) {
      setParticles([]);
      return;
    }

    // Create confetti particles
    const colors = ["#1E90FF", "#FF69B4", "#FFD700", "#7CFC00", "#FF6347", "#8A2BE2"];
    const newParticles = [];

    for (let i = 0; i < 100; i++) {
      const left = Math.random() * 100;
      const size = Math.random() * 8 + 4;
      const duration = Math.random() * 3 + 2;
      const delay = Math.random() * 0.5;
      const color = colors[Math.floor(Math.random() * colors.length)];
      
      newParticles.push({
        id: i,
        style: {
          position: "fixed",
          zIndex: 50,
          left: `${left}%`,
          top: "-5%",
          width: `${size}px`,
          height: `${size}px`,
          backgroundColor: color,
          borderRadius: "50%",
          transform: "rotate(0deg)",
          animation: `fall ${duration}s ease-in ${delay}s forwards, spin ${duration * 0.5}s linear ${delay}s infinite`,
        } as React.CSSProperties,
      });
    }

    setParticles(newParticles);

    // Clean up after animation completes
    const timer = setTimeout(() => {
      setParticles([]);
    }, 5000);

    return () => clearTimeout(timer);
  }, [active]);

  return (
    <>
      <style>
        {`
          @keyframes fall {
            to {
              top: 105%;
            }
          }
          @keyframes spin {
            to {
              transform: rotate(360deg);
            }
          }
        `}
      </style>
      {particles.map((particle) => (
        <div key={particle.id} style={particle.style} />
      ))}
    </>
  );
};

export default Confetti;
