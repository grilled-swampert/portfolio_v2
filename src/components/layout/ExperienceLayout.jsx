// "use client"

import React, { useEffect } from "react"
// import { gsap } from "gsap"
// import { ScrollTrigger } from "gsap/ScrollTrigger"

// gsap.registerPlugin(ScrollTrigger)

// const cards = [
//   {
//     id: 1,
//     img: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=400&fit=crop",
//     title: "The Algorithm",
//     desc: "The algorithm's workings are shrouded in complexity.",
//     className: "card1",
//   },
//   {
//     id: 2,
//     img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=400&fit=crop",
//     title: "The Dogma",
//     desc: "Enshrining the principles of conformity and reinforcing the status quo.",
//     className: "card2",
//   },
// ]

// const ExperienceLayout = () => {
//   const containerRef = useRef(null)
//   const cardsRef = useRef([])

//   useEffect(() => {
//     const ctx = gsap.context(() => {
//       // Set up horizontal scrolling container
//       const totalWidth = cards.length * 100 // 100vw per card
      
//       // Create horizontal scroll animation
//       const horizontalScroll = gsap.to(cardsRef.current, {
//         x: () => -(totalWidth - 100) + "vw",
//         ease: "none",
//         scrollTrigger: {
//           trigger: containerRef.current,
//           start: "top top",
//           end: () => "+=" + totalWidth * 10, // Adjust scroll distance
//           scrub: 1,
//           pin: true,
//           anticipatePin: 1,
//         }
//       })

//       // Create stacking effect for each card
//       cardsRef.current.forEach((card, index) => {
//         if (!card) return

//         // Set initial positioning
//         gsap.set(card, {
//           x: index * window.innerWidth * 0.8, // Offset cards horizontally
//           scale: 1,
//           opacity: 1,
//           filter: "blur(0px)",
//           zIndex: cards.length - index,
//           transformOrigin: "center center"
//         })

//         // Create stacking animation as cards move
//         gsap.timeline({
//           scrollTrigger: {
//             trigger: containerRef.current,
//             start: `top top`,
//             end: () => "+=" + totalWidth * 10,
//             scrub: 1,
//             onUpdate: (self) => {
//               const progress = self.progress
//               const cardProgress = Math.max(0, Math.min(1, (progress - index * 0.3) / 0.4))
              
//               if (cardProgress > 0) {
//                 // Scale down and stack as they come together
//                 gsap.set(card, {
//                   scale: Math.max(0.7, 1 - cardProgress * 0.3),
//                   opacity: Math.max(0.3, 1 - cardProgress * 0.7),
//                   filter: `blur(${cardProgress * 6}px)`,
//                   x: (index * window.innerWidth * 0.8) - (cardProgress * index * window.innerWidth * 0.6),
//                   rotateY: cardProgress * (index % 2 === 0 ? -15 : 15), // Slight rotation for stacking effect
//                 })
//               }
//             },
//           },
//         })
//       })
//     }, containerRef)

//     return () => {
//       ctx.revert()
//     }
//   }, [])

//   const getCardStyles = (className) => {
//     const baseStyles =
//       "absolute top-1/2 left-0 transform -translate-y-1/2 rounded-2xl text-white p-8 md:p-12 flex flex-col justify-center items-center backdrop-blur-sm border border-white/20"

//     if (className === "card1") {
//       return `${baseStyles} bg-gradient-to-br from-purple-900/95 via-blue-900/95 to-indigo-900/95 shadow-2xl shadow-purple-500/30`
//     } else {
//       return `${baseStyles} bg-gradient-to-br from-slate-900/95 via-gray-800/95 to-black/95 shadow-2xl shadow-gray-500/30`
//     }
//   }

//   return (
//     <div className="min-h-screen bg-white text-black">
//       <main className="px-4 md:px-8 pt-8">
//         {/* Section 1 */}
//         <section className="w-full pt-8 min-h-screen flex items-center">
//           <div className="w-full max-w-4xl mx-auto">
//             <p className="text-black text-3xl md:text-5xl lg:text-6xl text-center leading-tight font-light">
//               As data conglomerates reveled in the opulence of cognitive wealth, a silent underclass manifested,
//               condemned to the digital periphery.
//             </p>
//           </div>
//         </section>

//         {/* Section 2 - Horizontal Stacking Cards */}
//         <section ref={containerRef} className="w-full relative min-h-screen flex items-center justify-center overflow-hidden">
//           <div className="relative w-full h-96 max-w-lg mx-auto">
//             {cards.map((card, index) => (
//               <div
//                 key={card.id}
//                 ref={(el) => (cardsRef.current[index] = el)}
//                 className={getCardStyles(card.className)}
//                 style={{
//                   width: "400px",
//                   height: "500px",
//                   transformOrigin: "center center",
//                 }}
//               >
//                 <div className="w-28 h-28 md:w-36 md:h-36 mb-6 rounded-xl overflow-hidden bg-white/10 backdrop-blur-sm border border-white/20">
//                   <img
//                     className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity duration-300"
//                     src={card.img || "/placeholder.svg"}
//                     alt={card.title}
//                   />
//                 </div>

//                 <h1 className="text-center text-3xl md:text-4xl mb-4 uppercase font-bold tracking-wider">
//                   The <br />
//                   <span className="bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
//                     {card.title.split(" ")[1]}
//                   </span>
//                 </h1>

//                 <p className="text-center text-base md:text-lg leading-relaxed opacity-90 max-w-sm text-gray-100">
//                   {card.desc}
//                 </p>
//               </div>
//             ))}
//           </div>
//         </section>

//         {/* Final section to allow scroll completion */}
//         <section className="w-full min-h-screen flex items-center justify-center">
//           <div className="text-center">
//             <p className="text-2xl md:text-3xl text-gray-600 font-light">The story continues...</p>
//           </div>
//         </section>
//       </main>
//     </div>
//   )
// }

// export default ExperienceLayout;


const experiences = [
  {
    name: "GNSS Map Matching and Road Identification",
    stack: "Python, OSMR, React, GIS",
    description:
      "A tool that processes GNSS data to accurately match and identify road networks for improved navigation.",
    deployedLink: "",
    githubLink: "",
    image: "images/coming-soon.png",
    status: "",
  },
  {
    name: "Financial Investment Report Generator",
    stack: "Python, OpenAI API, Flask, React",
    description:
      "A web application that leverages AI to generate detailed financial investment reports and actionable insights.",
    deployedLink: "",
    githubLink: "",
    image: "images/coming-soon.png",
    status: "",
  },
  // {
  //   name: "Social Media Advisor",
  //   stack: "Python, OpenAI API, Flask, React",
  //   description:
  //     "A mobile app that offers personalized social media strategy tips and content optimization advice.",
  //   deployedLink: "",
  //   githubLink: "",
  //   image: "images/coming-soon.png",
  //   status: "",
  // },
  // {
  //   name: "NLP Extractor",
  //   stack: "Python, SpaCy, Flask",
  //   description:
  //     "An application that uses natural language processing to extract key information and insights from text data.",
  //   deployedLink: "",
  //   githubLink: "",
  //   image: "images/coming-soon.png",
  //   status: "",
  // },
  // {
  //   name: "OE Allotment Application",
  //   stack: "React, Node.js, MongoDB",
  //   description:
  //     "A web solution designed to manage and automate the allotment of office equipment and resources.",
  //   deployedLink: "",
  //   githubLink: "",
  //   image: "images/coming-soon.png",
  //   status: "",
  // },
  // {
  //   name: "H&M Alloment Application",
  //   stack: "React, Node.js, MongoDB",
  //   description:
  //     "An application tailored to streamline the resource allotment process for H&M, enhancing operational efficiency.",
  //   deployedLink: "",
  //   githubLink: "",
  //   image: "images/coming-soon.png",
  //   status: "",
  // },
  // {
  //   name: "Blockchain Setup",
  //   stack: "Golang, React",
  //   description:
  //     "A project focused on configuring and deploying a blockchain network to facilitate secure, transparent transactions.",
  //   deployedLink: "",
  //   githubLink: "",
  //   image: "images/coming-soon.png",
  //   status: "",
  // },
  // {
  //   name: "Chat Application",
  //   stack: "React, Socket.io, Golang",
  //   description:
  //     "A real-time messaging platform enabling instant chat and group conversations with robust scalability.",
  //   deployedLink: "",
  //   githubLink: "",
  //   image: "images/coming-soon.png",
  //   status: "",
  // },
  // {
  //   name: "Tableau StoryBoard",
  //   stack: "Tableau, Python, Flask",
  //   description:
  //     "An interactive dashboard application that combines powerful Tableau visualizations with dynamic storytelling.",
  //   deployedLink: "",
  //   githubLink: "",
  //   image: "images/coming-soon.png",
  //   status: "",
  // },
  // {
  //   name: "Memory Game",
  //   stack: "JavaScript, HTML, CSS",
  //   description:
  //     "A fun, interactive browser game that challenges users to match pairs of cards to boost memory and concentration.",
  //   deployedLink: "",
  //   githubLink: "",
  //   image: "images/coming-soon.png",
  //   status: "",
  // },
  // {
  //   name: "Weather Application using API",
  //   stack: "React, OpenWeatherMap API, CSS",
  //   description:
  //     "A dynamic weather forecasting app that retrieves real-time data from public APIs and displays it in an intuitive interface.",
  //   deployedLink: "",
  //   githubLink: "",
  //   image: "images/coming-soon.png",
  //   status: "",
  // },
];

const ExperienceLayout = () => {
  useEffect(() => {
    const stickySections = [...document.querySelectorAll(".sticky")];
    // @ts-expect-error: Parameter 'section' implicitly has an 'any' type.
    const transform = (section) => {
      const offsetTop = section.parentElement.offsetTop;
      const scrollSection = section.querySelector(".scroll_section");

      let percentage =
        ((window.scrollY - offsetTop) / window.innerHeight) * 100;
      percentage = percentage < 0 ? 0 : percentage > 900 ? 900 : percentage;
      scrollSection.style.transform = `translate3D(${-percentage}vw, 0, 0)`;
    };

    const handleScroll = () => {
      stickySections.forEach((section) => transform(section));
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="w-full bg-white">
      <p
        className="text-6xl font-bold text-black mb-7 pt-[10rem] flex justify-center"
      >
        EXPERIENCES
      </p>

      <div className="sticky_parent h-[250vh]">
        <div className="sticky top-0 h-screen overflow-hidden">
          <div className="scroll_section absolute top-0 h-full w-[250vw] will-change-transform flex justify-between items-center px-[5vw]">
            {experiences.map((experience, index) => (
              <div
                key={index}
                className="w-[100vw] flex flex-col md:flex-row justify-center items-center text-center text-white bg-black"
              >
                  <img
                    src={experience.image}
                    alt={experience.name}
                    className="p-10 md:h-[300px] lg:h-[400px] rounded-xl shadow-lg mb-4"
                  />
                <div className="w-[30vw] ml-5 flex justify-center flex-col items-center">
                  <h2
                    className="text-4xl font-bold"
                  >
                    {experience.name}
                  </h2>
                  <div className="flex md:flex-wrap gap-2 mt-2 justify-center items-center">
                    {experience.stack.split(", ").map((tech, idx) => (
                      <div
                        key={idx}
                        className="text-md text-gray-300"
                      >
                      </div>
                    ))}
                  </div>
                  <div
                    className=" mt-2 md:w-3/4 "
                  >
                    {experience.description}
                  </div>
                  
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <section className="h-full flex justify-center">
        <div className="container w-full p-20 text-center text-black">
          <h1
            className="text-4xl md:text-6xl font-light mb-4"
          >
            Section under renovation.
          </h1>
          {/* <p
            className="md:text-1xl"
          >
            We build our own prisons. Bars forged of oaths, codes, commitments.
            Walls of self-doubt and accepted limitation. We inhabit these cells,
            these identities, and call them "us."
          </p> */}
        </div>
      </section>
    </main>
  );
};

export default ExperienceLayout;
