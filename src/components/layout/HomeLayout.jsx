// import React, { useEffect, useRef } from "react";
// import RollingPanda from "../../assets/panda-rolling.gif";
// import DownButton from "../ui/DownButton";
// import gsap from "gsap";
// import { Link } from "react-router-dom";

// const HomeLayout = () => {
//   const containerRef = useRef(null);
//   const headerRef = useRef(null);
//   const navRef = useRef(null);
//   const downButtonRef = useRef(null);

//   useEffect(() => {
//     const ctx = gsap.context(() => {
//       const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

//       tl.fromTo(
//         headerRef.current.children,
//         {
//           opacity: 0,
//           y: -30,
//           scale: 0.9,
//         },
//         {
//           opacity: 1,
//           y: 0,
//           scale: 1,
//           duration: 0.8,
//           stagger: 0.2,
//         }
//       )
//         .fromTo(
//           ".text-block",
//           {
//             opacity: 0,
//             x: -50,
//             rotationX: 45,
//           },
//           {
//             opacity: 1,
//             x: 0,
//             rotationX: 0,
//             duration: 1,
//             stagger: 0.3,
//           },
//           "-=0.4"
//         )
//         .fromTo(
//           navRef.current.children,
//           {
//             opacity: 0,
//             x: 30,
//             scale: 0.8,
//           },
//           {
//             opacity: 1,
//             x: 0,
//             scale: 1,
//             duration: 0.6,
//             stagger: 0.1,
//           },
//           "-=0.8"
//         )
//         .fromTo(
//           downButtonRef.current,
//           {
//             opacity: 0,
//             y: 30,
//             scale: 0.8,
//           },
//           {
//             opacity: 1,
//             y: 0,
//             scale: 1,
//             duration: 0.8,
//           },
//           "-=0.3"
//         );

//       gsap.to(".panda-image", {
//         y: -10,
//         duration: 2,
//         ease: "sine.inOut",
//         yoyo: true,
//         repeat: -1,
//       });

//       gsap.to(".bg-grid", {
//         backgroundPosition: "15px 15px",
//         duration: 20,
//         ease: "none",
//         repeat: -1,
//         yoyo: true,
//       });
//     }, containerRef);

//     return () => ctx.revert();
//   }, []);

//   return (
//     <div className="flex justify-center items-center w-full h-full bg-gradient-to-b from-gray-400 to-white">
//       <div
//         ref={containerRef}
//         className="relative flex justify-start flex-col items-center w-11/12 mt-36 gap-10 rounded-3xl bg-gradient-to-b from-black to-gray-800 shadow-2xl sm:mt-36 sm:gap-6"
//         style={{
//           height: "calc(90vh)",
//           boxShadow: "0 20px 60px rgba(0, 0, 0, 0.5)",
//         }}
//       >
//         <div
//           className="bg-grid absolute inset-0 opacity-10 pointer-events-none"
//           style={{
//             backgroundImage: `
//               linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px),
//               linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)
//             `,
//             backgroundSize: "30px 30px",
//           }}
//         ></div>
//         <div
//           className="absolute inset-0 rounded-3xl pointer-events-none"
//           style={{
//             background:
//               "radial-gradient(circle at center, rgba(0,0,0,0.8), rgba(128,128,128,0.2))",
//             filter: "blur(80px)",
//             zIndex: -1,
//           }}
//         ></div>

//         <div
//           ref={headerRef}
//           className="flex justify-between items-center w-full px-8 mt-6 font-poppins flex-col md:flex-row"
//         >
//           <div>
//             <div className="text-3xl sm:text-4xl md:text-5xl tracking-tighter mb-3 sm:mb-5">
//               crisplettuce
//             </div>
//             <div className="text-lg sm:text-xl md:text-2xl font-light text-gray-600 italic">
//               Swapnil Ranadive
//             </div>
//           </div>
//           <div>
//             <img
//               src={RollingPanda}
//               alt="Rolling Panda"
//               className="panda-image w-32 h-32 sm:w-40 sm:h-40 md:w-50 md:h-50 object-contain rounded-full mx-auto sm:mx-0"
//             />
//           </div>
//         </div>

//         <div className="font-poppins w-full md:mb-16 px-8 mt-4 flex flex-col lg:flex-row justify-between gap-6 lg:gap-0">
//           <div className="flex flex-col gap-5 sm:gap-4 md:gap-7 text-center lg:text-left">
//             <div className="text-block text-block text-sm sm:text-4xl">
//               hello, figuring out how to introduce myself...
//             </div>
//             {/* <div className="text-block bg-white text-black p-2 opacity-60 text-block text-sm sm:text-4xl">
//               still figuring everything out.
//             </div>
//             <div className="text-block bg-white text-black p-2 opacity-60 text-block text-sm sm:text-4xl">
//               here's the chaos i've been a part of so far.
//             </div> */}
//           </div>

//           <div className="flex-1 flex flex-col justify-center items-end space-y-6">
//             <nav
//               ref={navRef}
//               className="md:w-auto w-full text-center md:text-right space-y-4"
//             >
//               {[
//                 {
//                   name: "Resume",
//                   href: "https://drive.google.com/file/d/1PYeu5RQ7j1iIo1yBSMnffvjR8B-DtpG-/view?usp=sharing",
//                 },
//                 { name: "GitHub", href: "https://github.com/grilled-swampert" },
//                 {
//                   name: "LinkedIn",
//                   href: "https://www.linkedin.com/in/swapnil-ranadive-crispy/",
//                 },
//               ].map((item) =>
//                 item.href.startsWith("http") ? (
//                   <a
//                     key={item.name}
//                     href={item.href}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                   >
//                     <div className="text-lg text-gray-400 hover:bg-white hover:text-black transition-colors cursor-pointer relative after:content-[''] after:block px-3 py-1 rounded tracking-wide mb-4">
//                       {item.name}
//                     </div>
//                   </a>
//                 ) : (
//                   <Link key={item.name} to={item.href}>
//                     <div className="text-lg text-gray-400 hover:bg-white hover:text-black transition-colors cursor-pointer relative after:content-[''] after:block px-3 py-1 rounded tracking-wide mb-4">
//                       {item.name}
//                     </div>
//                   </Link>
//                 )
//               )}
//             </nav>
//           </div>
//         </div>

//         <div ref={downButtonRef}>
//           <DownButton text="SCROLL DOWN " />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HomeLayout;

import React, { useEffect, useRef, useState } from "react";
import RollingPanda from "../../assets/panda-rolling.gif";
import DownButton from "../ui/DownButton";
import gsap from "gsap";
import { Link } from "react-router-dom";

const HomeLayout = () => {
  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const navRef = useRef(null);
  const downButtonRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

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
          ".link-card",
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
            stagger: 0.15,
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
        y: -15,
        rotation: 5,
        duration: 2.5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });

      gsap.to(".bg-grid", {
        backgroundPosition: "30px 30px",
        duration: 25,
        ease: "none",
        repeat: -1,
      });

      gsap.to(".glow-orb-1", {
        x: 50,
        y: 30,
        scale: 1.2,
        duration: 8,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });

      gsap.to(".glow-orb-2", {
        x: -30,
        y: -40,
        scale: 0.9,
        duration: 6,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const links = [
    {
      name: "Resume",
      href: "https://drive.google.com/file/d/1PYeu5RQ7j1iIo1yBSMnffvjR8B-DtpG-/view?usp=sharing",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      description: "VIEW CV",
    },
    { 
      name: "GitHub", 
      href: "https://github.com/grilled-swampert",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
        </svg>
      ),
      description: "CODE REPOS",
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/swapnil-ranadive-crispy/",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ),
      description: "NETWORK",
    },
  ];

  return (
    <div className="flex justify-center items-center w-full h-full bg-gradient-to-b from-black via-neutral-500 to-white overflow-hidden">
      <div
        ref={containerRef}
        className="relative flex justify-start flex-col items-center w-11/12 mt-36 gap-10 rounded-3xl overflow-hidden sm:mt-36 sm:gap-6"
        style={{
          height: "calc(90vh)",
          background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #000000 100%)",
          border: "1px solid rgba(255, 255, 255, 0.05)",
        }}
      >
        {/* Animated Grid Background */}
        <div
          className="bg-grid absolute inset-0 opacity-15 pointer-events-none rounded-3xl"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255, 255, 255, 0.15) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 255, 255, 0.15) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        ></div>

        {/* Header Section */}
        <div
          ref={headerRef}
          className="flex justify-between items-center w-full px-8 mt-8 font-poppins flex-col md:flex-row z-10"
        >
          <div className="relative">
            <div className="text-4xl sm:text-5xl md:text-6xl tracking-tight mb-2 font-bold text-white">
              crisplettuce
            </div>
            <div className="text-xl sm:text-2xl md:text-3xl font-light text-gray-400 italic tracking-wide">
              Swapnil Ranadive
            </div>
            <div className="text-sm sm:text-base text-gray-500 mt-2 font-mono">
              &lt;developer /&gt; melophile
            </div>
          </div>
          <div className="mt-6 md:mt-0 relative">
            <img
              src={RollingPanda}
              alt="Rolling Panda"
              className="panda-image relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 object-contain mx-auto sm:mx-0"
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="font-poppins w-full md:mb-16 px-8 mt-8 flex flex-col lg:flex-row justify-between gap-8 lg:gap-0 z-10">
          <div className="flex flex-col gap-6 sm:gap-5 md:gap-8 text-center lg:text-left flex-1">
            <div className="text-block text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-white">
              Crafting digital experiences
            </div>
            <div className="text-block text-lg sm:text-xl md:text-2xl text-gray-400 leading-relaxed max-w-2xl">
              Building innovative solutions with clean code and creative design.
              <span className="block mt-2 text-gray-500 font-mono text-base">
                // Turning ideas into reality
              </span>
            </div>
            <div className="flex flex-wrap gap-3 justify-center lg:justify-start mt-4">
              {[].map((skill) => (
                <span
                  key={skill}
                  className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-gray-300 text-sm font-mono hover:bg-white/10 hover:border-white/20 transition-all duration-300 cursor-default"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Navigation Links - Creative Cards */}
          <div className="flex-1 flex flex-col justify-center items-end space-y-6 max-w-sm ml-auto">
            <nav
              ref={navRef}
              className="w-full text-center md:text-right space-y-4"
            >
              {links.map((item) => (
                item.href.startsWith("http") ? (
                  <a
                    key={item.name}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block group link-card"
                  >
                    <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white hover:border-white transition-all duration-300 cursor-pointer px-6 py-5 rounded-2xl overflow-hidden">
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex flex-col items-start text-left flex-1">
                          <div className="text-xs font-mono text-gray-500 group-hover:text-black transition-colors mb-1">
                            {item.description}
                          </div>
                          <div className="text-xl font-bold text-white group-hover:text-black transition-colors">
                            {item.name}
                          </div>
                        </div>
                        <div className="text-white group-hover:text-black transition-all duration-300 transform group-hover:scale-110 group-hover:rotate-12">
                          {item.icon}
                        </div>
                      </div>

                      {/* Corner accent */}
                      <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-bl from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  </a>
                ) : (
                  <Link key={item.name} to={item.href} className="block group link-card">
                    <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white hover:border-white transition-all duration-300 cursor-pointer px-6 py-5 rounded-2xl overflow-hidden">
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex flex-col items-start text-left flex-1">
                          <div className="text-xs font-mono text-gray-500 group-hover:text-black transition-colors mb-1">
                            {item.description}
                          </div>
                          <div className="text-xl font-bold text-white group-hover:text-black transition-colors">
                            {item.name}
                          </div>
                        </div>
                        <div className="text-white group-hover:text-black transition-all duration-300 transform group-hover:scale-110 group-hover:rotate-12">
                          {item.icon}
                        </div>
                      </div>
                      
                      <div className="absolute bottom-0 left-0 h-1 bg-white w-0 group-hover:w-full transition-all duration-500"></div>
                      <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-bl from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  </Link>
                )
              ))}
            </nav>
          </div>
        </div>

        {/* Scroll Button */}
        <div ref={downButtonRef} className="z-10 mb-8">
          <DownButton text=" EXPLORE MORE" />
        </div>

        {/* Bottom Gradient */}
        <div
          className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
          style={{
            background: "linear-gradient(to top, rgba(0,0,0,0.3), transparent)",
          }}
        ></div>
      </div>
    </div>
  );
};

export default HomeLayout;