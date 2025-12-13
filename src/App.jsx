import React, { useEffect, useState, useRef } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import walkingGif from "./assets/red_walk.gif";
import idlePng from "./assets/idle.gif";
import Home from "./pages/Home";
import Privacy from "./pages/Privacy";
import Blog from "./pages/Blog";
import Projects from "./pages/Projects";
import { Contact } from "lucide-react";
import ContactLayout from "./pages/ContactLayout";

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

      if (e.clientX < prevXRef.current) setFacingLeft(true);
      else if (e.clientX > prevXRef.current) setFacingLeft(false);

      prevXRef.current = e.clientX;
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const animate = () => {
      const dx = mousePos.x - followerRef.current.x;
      const dy = mousePos.y - followerRef.current.y;
      const distance = Math.hypot(dx, dy);

      setIsMoving(distance > 2);

      followerRef.current.x += dx * 0.05;
      followerRef.current.y += dy * 0.05;

      setFollowerPos({
        x: followerRef.current.x,
        y: followerRef.current.y,
      });

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [mousePos]);

  return (
    <BrowserRouter>
      {/* Apply cursor-none globally by wrapping the app */}
      <div className="min-h-screen cursor-none bg-black text-white">
        {/* Custom cursor dot */}
        <div
          className="fixed z-[9998] h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white pointer-events-none"
          style={{
            left: `${mousePos.x}px`,
            top: `${mousePos.y}px`,
          }}
        />

        {/* Routes area */}
        <div className="flex items-center justify-center text-4xl">
          <Routes>
            <Route path="*" element={<Home />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<ContactLayout />} />
          </Routes>
        </div>

        {/* Character follower */}
        <div
          className="fixed z-[9999] h-20 w-20 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          style={{
            left: `${followerPos.x}px`,
            top: `${followerPos.y}px`,
            transform: `translate(-50%, -50%) scaleX(${facingLeft ? 1 : -1})`,
          }}
        >
          <img
            src={isMoving ? walkingGif : idlePng}
            alt="Among Us Crewmate"
            className="h-full w-full object-contain"
          />
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
