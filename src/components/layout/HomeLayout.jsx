import React, { useEffect, useRef } from "react";
import RollingPanda from "../../assets/panda-rolling.gif";
import DownButton from "../ui/DownButton";
import gsap from "gsap";

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
        className="relative flex justify-start flex-col items-center w-11/12 mt-36 gap-10 rounded-3xl bg-gradient-to-b from-black to-gray-800 shadow-2xl"
        style={{
          height: "calc(100vh - 36px)",
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
          className="flex justify-between items-center w-full px-8 font-poppins"
        >
          <div>
            <div className="text-5xl tracking-tighter mb-5">crisplettuce</div>
            <div className="text-2xl font-light text-gray-600 italic">
              Swapnil Ranadive
            </div>
          </div>
          <div>
            <img
              src={RollingPanda}
              alt="Rolling Panda"
              className="panda-image w-50 h-50 object-contain rounded-full"
            />
          </div>
        </div>

        <div className="font-poppins w-full px-8 mt-4 flex flex-row justify-between">
          <div className="flex flex-col gap-5">
            <div className="text-block">
              hello, i actually have no idea what to put here.
            </div>
            <div className="text-block bg-white text-black p-2 opacity-60">
              still figuring everything out.
            </div>
            <div className="text-block bg-white text-black p-2 opacity-60">
              here's the chaos i've been a part of so far.
            </div>
          </div>

          <div className="flex-1 flex flex-col justify-center items-end space-y-6">
            <nav ref={navRef} className="text-right space-y-4">
              {[
                "Experience",
                "Project",
                "Contact",
                "Resume",
                "GitHub",
                "LinkedIn",
              ].map((item) => (
                <div
                  key={item}
                  className="text-lg text-gray-400 hover:bg-white hover:text-black transition-colors cursor-pointer relative after:content-[''] after:block px-3 py-1 rounded"
                >
                  {item}
                </div>
              ))}
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
