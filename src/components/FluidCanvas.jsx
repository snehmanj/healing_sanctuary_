import React, { useEffect, useRef } from 'react';

export default function FluidCanvas({ mood, rippleTrigger }) {
  const canvasRef = useRef(null);
  const ripples = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationId;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', handleResize);
    handleResize();

    // Infinite render loop running 60fps physics calculation
    const renderLoop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ripples.current.forEach((ripple, index) => {
        ripple.radius += 2.8;
        ripple.alpha -= 0.007;

        // Draw multiple rings per ripple to give it an organic fluid wave depth
        for (let i = 0; i < 2; i++) {
          ctx.beginPath();
          ctx.arc(ripple.x, ripple.y, Math.max(0, ripple.radius - (i * 12)), 0, Math.PI * 2);
          ctx.strokeStyle = mood === 'heavy'
            ? `rgba(165, 203, 173, ${ripple.alpha * (1 - i * 0.3)})` // Rainwater green ring
            : `rgba(245, 158, 11, ${ripple.alpha * (1 - i * 0.3)})`;  // Sunset amber ring
          ctx.lineWidth = 2.5 / (i + 1);
          ctx.stroke();
        }

        if (ripple.alpha <= 0) {
          ripples.current.splice(index, 1);
        }
      });

      animationId = requestAnimationFrame(renderLoop);
    };
    
    animationId = requestAnimationFrame(renderLoop);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, [mood]);

  // Listen for dynamic app parent clicks/taps
  useEffect(() => {
    if (rippleTrigger) {
      ripples.current.push({
        x: rippleTrigger.x,
        y: rippleTrigger.y,
        radius: 2,
        alpha: 0.65
      });
    }
  }, [rippleTrigger]);

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-10" />;
}
