import React, { useEffect, useState, useRef } from "react";
import { BrowserRouter } from "react-router-dom";
import walkingGif from "./assets/red_walk.gif";
import idlePng from "./assets/idle.gif";

const App = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [followerPos, setFollowerPos] = useState({ x: 0, y: 0 });
  const [isMoving, setIsMoving] = useState(false);
  const [facingLeft, setFacingLeft] = useState(false);
  const followerRef = useRef({ x: 0, y: 0 });
  const prevXRef = useRef(0);
  const rafRef = useRef();

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      
      if (e.clientX < prevXRef.current) {
        setFacingLeft(true);
      } else if (e.clientX > prevXRef.current) {
        setFacingLeft(false);
      }
      prevXRef.current = e.clientX;
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const animate = () => {
      const dx = mousePos.x - followerRef.current.x;
      const dy = mousePos.y - followerRef.current.y;
      const distance = Math.hypot(dx, dy);

      setIsMoving(distance > 1);

      followerRef.current.x += dx * 0.12;
      followerRef.current.y += dy * 0.12;

      setFollowerPos({
        x: followerRef.current.x,
        y: followerRef.current.y
      });

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [mousePos]);

  return (
    <BrowserRouter>
      <style>{`body { cursor: none; }`}</style>
      
      {/* Radial gradient spotlight overlay */}
      <div 
        className="fixed inset-0 pointer-events-none z-[9998]"
        style={{
          background: `radial-gradient(circle 150px at ${followerPos.x}px ${followerPos.y}px, 
            rgba(255, 255, 255, 0.15) 0%, 
            rgba(255, 255, 255, 0.08) 40%,
            transparent 70%)`,
          transition: 'background 0.1s ease-out'
        }}
      />
      
      <div className="h-screen flex items-center justify-center bg-black text-white text-4xl">
        hello there.
      </div>
      <div className="h-screen">meow</div>
      
      {/* Character follower */}
      <div 
        className="fixed pointer-events-none z-[9999]"
        style={{ 
          left: `${followerPos.x}px`,
          top: `${followerPos.y}px`,
          transform: `translate(-50%, -50%) scaleX(${facingLeft ? 1 : -1})`,
          width: '80px',
          height: '80px'
        }}
      >
        <img
          src={isMoving ? walkingGif : idlePng}
          alt="Among Us Crewmate"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain'
          }}
        />
      </div>
    </BrowserRouter>
  );
};

export default App;
