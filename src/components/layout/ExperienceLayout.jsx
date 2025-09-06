// "use client"

import React, { useEffect } from "react";
import NextButton from "../ui/NextButton";

const experiences = [
  {
    name: "Citius Cloud LLP",
    stack: "Kubernetes, ReactJS, PostresSQL, Digital Ocean, NodeJS",
    description:
      "A tool that processes GNSS data to accurately match and identify road networks for improved navigation.",
    title: "DevOps Engineer Intern",
    githubLink: "",
    image: "images/coming-soon.png",
    status: "",
    time: "May 2025 - Present",
  },
  {
    name: "FOSSEE, IIT Bombay",
    stack: "Python, Blender",
    description:
      "A web application that leverages AI to generate detailed financial investment reports and actionable insights.",
    title: "Summer Fellowship",
    githubLink: "",
    image: "images/coming-soon.png",
    status: "",
    time: "May 2025 - Present",
  },
];

const ExperienceLayout = () => {
  useEffect(() => {
    const stickySections = [...document.querySelectorAll(".sticky")];

    const transform = (section) => {
      const offsetTop = section.parentElement.offsetTop;
      const scrollSection = section.querySelector(".scroll_section");
      let percentage =
        ((window.scrollY - offsetTop) / window.innerHeight) * 100;
      percentage = Math.max(0, Math.min(percentage, 900));
      scrollSection.style.transform = `translate3D(${-percentage}vw, 0, 0)`;
    };

    const handleScroll = () => {
      stickySections.forEach((section) => transform(section));
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="w-full bg-gradient-to-b from-white to-black">
      <p className="text-5xl md:text-6xl font-light tracking-tight text-black mb-5 pt-[10rem] flex justify-center">
        EXPERIENCES
      </p>

      <div className="sticky_parent h-[200vh]">
        <div className="sticky top-0 h-screen overflow-hidden">
          <div className="scroll_section absolute top-0 h-full w-[200vw] will-change-transform flex justify-between items-center px-[9vw]">
            {experiences.map((experience, index) => (
              <div
                key={index}
                className="w-[80vw] flex flex-col md:flex-row justify-center items-center text-center text-white bg-black p-10 md:p-20 rounded-2xl shadow-xl"
              >
                {/* Image */}
                {experience.image && (
                  <img
                    src={experience.image}
                    alt={experience.name}
                    className="p-5 md:h-[300px] lg:h-[400px] rounded-xl shadow-lg mb-6 md:mb-0"
                  />
                )}

                {/* Content */}
                <div className="w-full md:w-[50%] flex flex-col items-center md:items-start md:ml-10">
                  {experience.name && (
                    <h2 className="text-3xl font-bold mb-2">
                      {experience.name}
                    </h2>
                  )}

                  {experience.title && (
                    <p className="text-lg text-gray-400 mb-2 italic">
                      {experience.title}
                    </p>
                  )}

                  {experience.time && (
                    <p className="text-sm text-gray-300 mb-4">{experience.time}</p>
                  )}

                  {/* Stack */}
                  {experience.stack && (
                    <div className="flex w-full flex-wrap gap-2 mb-4 justify-center md:justify-center">
                      {experience.stack.split(", ").map((tech, idx) => (
                        <span
                          key={idx}
                          className="text-xs bg-gray-800 px-3 py-1 rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Description */}
                  {experience.description && (
                    <p className="mb-4 text-lg text-gray-200 text-center md:text-left">
                      {experience.description}
                    </p>
                  )}

                  {/* Status */}
                  {experience.status && (
                    <p className="mb-2 text-sm text-yellow-400">
                      Status: {experience.status}
                    </p>
                  )}

                  {/* GitHub Link */}
                  {experience.githubLink && (
                    <a
                      href={experience.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mb-4 text-blue-400 underline"
                    >
                      View on GitHub
                    </a>
                  )}
                  <div className="flex justify-center align-middle w-full mt-8">
                    <NextButton text="LEARN MORE " />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <section className="h-full flex justify-center">
        <div className="container w-full p-20 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-light mb-4">
            Section under renovation.
          </h1>
        </div>
      </section>
    </main>
  );
};

export default ExperienceLayout;
