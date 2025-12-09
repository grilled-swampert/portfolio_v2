import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";

const Navbar = () => {
  const navRef = useRef(null);
  const navItemsRef = useRef([]);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Projects", path: "/projects" },
    { name: "Blog", path: "/blog" },
    { name: "Contact", path: "/contact" },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Navbar slide in from top
      gsap.from(navRef.current, {
        y: -100,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      // Stagger animation for nav items
      gsap.from(navItemsRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.6,
        stagger: 0.1,
        ease: "back.out(1.7)",
        delay: 0.3,
      });
    }, navRef);

    return () => ctx.revert();
  }, []);

  const handleNavItemHover = (e) => {
    gsap.to(e.currentTarget, {
      y: -2,
      color: "#FE7743", // stays white
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleNavItemLeave = (e) => {
    gsap.to(e.currentTarget, {
      y: 0,
      color: "#FFFFFF", // also stays white
      duration: 0.3,
      ease: "power2.out",
    });
  };

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-transparent"
      >
        <div className="max-w-3xl mx-auto px-8 py-6 flex items-center justify-between">
          <div className="flex items-center gap-12">
            {navItems.map((item, index) => (
              <a
                key={index}
                href={item.path}
                ref={(el) => (navItemsRef.current[index] = el)}
                onMouseEnter={handleNavItemHover}
                onMouseLeave={handleNavItemLeave}
                className="text-white text-sm font-medium tracking-wide no-underline cursor-pointer transition-colors uppercase"
              >
                {item.name}
              </a>
            ))}
          </div>

          <a
            href="#home"
            className="text-xl font-semibold text-white tracking-tight no-underline"
          >
            Logo
          </a>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
