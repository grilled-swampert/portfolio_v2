import React, { useState, useRef, useEffect } from "react";
import { Menu, X, Home, User, Settings, Mail, Info } from "lucide-react";
import gsap from "gsap";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const buttonRef = useRef(null);
  const overlayRef = useRef(null);
  const titleRef = useRef(null);
  const menuItemsRef = useRef([]);

  const menuItems = [
    { icon: Home, label: "Home", href: "#home" },
    { icon: User, label: "About", href: "#about" },
    { icon: Settings, label: "Services", href: "#services" },
    { icon: Mail, label: "Contact", href: "#contact" },
    { icon: Info, label: "Info", href: "#info" },
  ];

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    if (isOpen) {
      gsap.set(overlayRef.current, { display: "block" });
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.6 }
      )
        .fromTo(
          titleRef.current,
          { y: -50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          "-=0.3"
        )
        .fromTo(
          menuItemsRef.current,
          { y: 40, opacity: 0, rotationX: -10 },
          {
            y: 0,
            opacity: 1,
            rotationX: 0,
            duration: 0.7,
            stagger: 0.15,
          },
          "-=0.4"
        );
    } else {
      const tl = gsap.timeline({
        defaults: { ease: "power3.in" },
        onComplete: () => {
          gsap.set(overlayRef.current, { display: "none" });
        },
      });

      tl.to(menuItemsRef.current, {
        y: 40,
        opacity: 0,
        rotationX: -10,
        duration: 0.5,
        stagger: 0.1,
      })
        .to(titleRef.current, { y: -50, opacity: 0, duration: 0.5 }, "-=0.3")
        .to(overlayRef.current, { opacity: 0, duration: 0.5 }, "-=0.3");
    }
  }, [isOpen]);

  const handleMenuItemClick = (href) => {
    setIsOpen(false);
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* Toggle Button */}
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

      {/* Fullscreen Overlay */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-40 hidden opacity-0"
        style={{ display: "none" }}
      >
        <div className="absolute inset-0 bg-black" />

        <div className="relative h-full flex items-center justify-center">
          <nav className="text-center">
            <div className="mb-16" ref={titleRef}>
              <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 tracking-tight">
                MENU
              </h1>
              <div className="w-32 h-px bg-white mx-auto" />
            </div>

            <ul className="space-y-10">
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
                    <item.icon
                      size={32}
                      className="transform group-hover:scale-110 transition-transform duration-300"
                    />
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
