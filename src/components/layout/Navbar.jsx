import React, { useState, useRef, useEffect } from "react";
import { Menu, X, Home, User, Settings, Mail, Info } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const buttonRef = useRef(null);
  const overlayRef = useRef(null);
  const titleRef = useRef(null);
  const menuItemsRef = useRef([]);

  const menuItems = [
    { icon: Home, label: "Home", href: "#home" },
    { icon: User, label: "Experience", href: "#about" },
    { icon: Settings, label: "Projects", href: "#services" },
    { icon: Info, label: "Contact", href: "#info" },
  ];

  const toggleMenu = () => {
    if (isAnimating) return;
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
      
      // Show overlay immediately
      if (overlayRef.current) {
        overlayRef.current.style.display = "flex";
        overlayRef.current.style.opacity = "0";
        
        // Force reflow
        overlayRef.current.offsetHeight;
        
        // Animate in
        overlayRef.current.style.transition = "opacity 0.6s cubic-bezier(0.25, 1, 0.5, 1)";
        overlayRef.current.style.opacity = "1";
      }

      // Animate title
      if (titleRef.current) {
        titleRef.current.style.transform = "translateY(-50px)";
        titleRef.current.style.opacity = "0";
        titleRef.current.style.transition = "all 0.8s cubic-bezier(0.25, 1, 0.5, 1) 0.3s";
        
        setTimeout(() => {
          if (titleRef.current) {
            titleRef.current.style.transform = "translateY(0)";
            titleRef.current.style.opacity = "1";
          }
        }, 50);
      }

      // Animate menu items
      menuItemsRef.current.forEach((item, index) => {
        if (item) {
          item.style.transform = "translateY(40px) rotateX(-10deg)";
          item.style.opacity = "0";
          item.style.transition = `all 0.7s cubic-bezier(0.25, 1, 0.5, 1) ${0.4 + index * 0.15}s`;
          
          setTimeout(() => {
            if (item) {
              item.style.transform = "translateY(0) rotateX(0deg)";
              item.style.opacity = "1";
            }
          }, 50);
        }
      });

      setTimeout(() => setIsAnimating(false), 1200);
    } else {
      setIsAnimating(true);
      
      // Animate out menu items
      menuItemsRef.current.forEach((item, index) => {
        if (item) {
          item.style.transition = `all 0.5s cubic-bezier(0.5, 0, 0.75, 0) ${index * 0.1}s`;
          item.style.transform = "translateY(40px) rotateX(-10deg)";
          item.style.opacity = "0";
        }
      });

      // Animate out title
      if (titleRef.current) {
        titleRef.current.style.transition = "all 0.5s cubic-bezier(0.5, 0, 0.75, 0) 0.3s";
        titleRef.current.style.transform = "translateY(-50px)";
        titleRef.current.style.opacity = "0";
      }

      // Animate out overlay
      if (overlayRef.current) {
        overlayRef.current.style.transition = "opacity 0.5s cubic-bezier(0.5, 0, 0.75, 0) 0.3s";
        overlayRef.current.style.opacity = "0";
        
        setTimeout(() => {
          if (overlayRef.current) {
            overlayRef.current.style.display = "none";
          }
          setIsAnimating(false);
        }, 800);
      }
    }
  }, [isOpen]);

  const handleMenuItemClick = (href) => {
    setIsOpen(false);
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <button
        ref={buttonRef}
        onClick={toggleMenu}
        className={`fixed top-6 right-6 z-50 p-3 rounded-full transition-colors duration-300 ${
          isOpen
            ? "bg-white text-black hover:bg-gray-200"
            : "bg-black text-white hover:bg-gray-800"
        } shadow-2xl`}
        aria-label="Toggle menu"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <div
        ref={overlayRef}
        className="fixed inset-0 z-40 font-poppins"
        style={{ 
          display: "none",
          opacity: "0"
        }}
      >
        {/* Background */}
        <div className="absolute inset-0 bg-black" />

        {/* Content */}
        <div className="relative h-full w-full flex items-center justify-center">
          <nav className="text-center justify-center">
            <div className="mb-16" ref={titleRef}>
              <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 tracking-tight">
                SECTIONS
              </h1>
              <div className="w-32 h-px bg-white mx-auto" />
            </div>

            <ul className="space-y-10 justify-center text-center">
              {menuItems.map((item, index) => (
                <li
                  key={item.label}
                  ref={(el) => (menuItemsRef.current[index] = el)}
                >
                  <a
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleMenuItemClick(item.href);
                    }}
                    className="group flex items-center justify-center space-x-6 text-white hover:text-gray-300 transition-colors duration-300"
                  >
                    <span className="text-3xl md:text-5xl font-light tracking-wider uppercase">
                      {item.label}
                    </span>
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-20 text-gray-400">
              <div className="w-16 h-px bg-gray-400 mx-auto mb-4" />
              <p className="text-sm uppercase tracking-widest">Navigation</p>
            </div>
          </nav>
        </div>
      </div>

    </>
  );
};

export default Navbar;