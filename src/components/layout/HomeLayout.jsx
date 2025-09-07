import React, { useEffect, useRef } from "react";
import RollingPanda from "../../assets/panda-rolling.gif";
import DownButton from "../ui/DownButton";
import gsap from "gsap";
import { Link } from "react-router-dom";

const HomeLayout = () => {
  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const navRef = useRef(null);
  const downButtonRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        headerRef.current.children,
        {
          opacity: 0,
          y: -30,
          scale: 0.9,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.2,
        }
      )
        .fromTo(
          ".text-block",
          {
            opacity: 0,
            x: -50,
            rotationX: 45,
          },
          {
            opacity: 1,
            x: 0,
            rotationX: 0,
            duration: 1,
            stagger: 0.3,
          },
          "-=0.4"
        )
        .fromTo(
          navRef.current.children,
          {
            opacity: 0,
            x: 30,
            scale: 0.8,
          },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 0.6,
            stagger: 0.1,
          },
          "-=0.8"
        )
        .fromTo(
          downButtonRef.current,
          {
            opacity: 0,
            y: 30,
            scale: 0.8,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
          },
          "-=0.3"
        );

      gsap.to(".panda-image", {
        y: -10,
        duration: 2,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });

      gsap.to(".bg-grid", {
        backgroundPosition: "15px 15px",
        duration: 20,
        ease: "none",
        repeat: -1,
        yoyo: true,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="flex justify-center items-center w-full h-full bg-gradient-to-b from-gray-400 to-white">
      <div
        ref={containerRef}
        className="relative flex justify-start flex-col items-center w-11/12 mt-36 gap-10 rounded-3xl bg-gradient-to-b from-black to-gray-800 shadow-2xl sm:mt-36 sm:gap-6"
        style={{
          height: "calc(90vh)",
          boxShadow: "0 20px 60px rgba(0, 0, 0, 0.5)",
        }}
      >
        <div
          className="bg-grid absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)
            `,
            backgroundSize: "30px 30px",
          }}
        ></div>
        <div
          className="absolute inset-0 rounded-3xl pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at center, rgba(0,0,0,0.8), rgba(128,128,128,0.2))",
            filter: "blur(80px)",
            zIndex: -1,
          }}
        ></div>

        <div
          ref={headerRef}
          className="flex justify-between items-center w-full px-8 mt-6 font-poppins flex-col md:flex-row"
        >
          <div>
            <div className="text-3xl sm:text-4xl md:text-5xl tracking-tighter mb-3 sm:mb-5">
              crisplettuce
            </div>
            <div className="text-lg sm:text-xl md:text-2xl font-light text-gray-600 italic">
              Swapnil Ranadive
            </div>
          </div>
          <div>
            <img
              src={RollingPanda}
              alt="Rolling Panda"
              className="panda-image w-32 h-32 sm:w-40 sm:h-40 md:w-50 md:h-50 object-contain rounded-full mx-auto sm:mx-0"
            />
          </div>
        </div>

        <div className="font-poppins w-full md:mb-16 px-8 mt-4 flex flex-col lg:flex-row justify-between gap-6 lg:gap-0">
          <div className="flex flex-col gap-5 sm:gap-4 md:gap-7 text-center lg:text-left">
            <div className="text-block text-block text-sm sm:text-4xl">
              hello, i actually have no idea what to put here.
            </div>
            <div className="text-block bg-white text-black p-2 opacity-60 text-block text-sm sm:text-4xl">
              still figuring everything out.
            </div>
            <div className="text-block bg-white text-black p-2 opacity-60 text-block text-sm sm:text-4xl">
              here's the chaos i've been a part of so far.
            </div>
          </div>

          <div className="flex-1 flex flex-col justify-center items-end space-y-6">
            <nav
              ref={navRef}
              className="md:w-auto w-full text-center md:text-right space-y-4"
            >
              {[
                {
                  name: "Resume",
                  href: "https://drive.google.com/file/d/1PYeu5RQ7j1iIo1yBSMnffvjR8B-DtpG-/view?usp=sharing",
                },
                { name: "GitHub", href: "https://github.com/grilled-swampert" },
                {
                  name: "LinkedIn",
                  href: "https://www.linkedin.com/in/swapnil-ranadive-crispy/",
                },
              ].map((item) =>
                item.href.startsWith("http") ? (
                  <a
                    key={item.name}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="text-lg text-gray-400 hover:bg-white hover:text-black transition-colors cursor-pointer relative after:content-[''] after:block px-3 py-1 rounded tracking-wide mb-4">
                      {item.name}
                    </div>
                  </a>
                ) : (
                  <Link key={item.name} to={item.href}>
                    <div className="text-lg text-gray-400 hover:bg-white hover:text-black transition-colors cursor-pointer relative after:content-[''] after:block px-3 py-1 rounded tracking-wide mb-4">
                      {item.name}
                    </div>
                  </Link>
                )
              )}
            </nav>
          </div>
        </div>

        <div ref={downButtonRef}>
          <DownButton text="SCROLL DOWN " />
        </div>
      </div>
    </div>
  );
};

export default HomeLayout;
