"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import NextButton from "../ui/NextButton.jsx";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const ExperienceTimeline = () => {
  const timelineRef = useRef(null);
  const containerRef = useRef(null);

  const experiences = [
    {
      year: "May 2025 – Present",
      title: "DevOps Engineer Intern",
      company: "CitiusCloud Services LLP",
      description:
        "Designing and implementing automation solutions for VM provisioning, software installation workflows, and integrations. Supporting development of a containerized PERN stack product.",
      branch: "main",
      link: "https://www.citiuscloud.com/",
      tech: [
        "Node.js",
        "PostgreSQL",
        "Docker",
        "Kubernetes",
        "OpenShift",
        "Shell Scripting",
        "PERN Stack",
        "Python",
      ],
    },
    {
      year: "March 2024 - July 2024",
      title: "Summer Fellowship",
      company: "FOSSEE, IIT Bombay",
      description:
        "Developed a Blender addon to automate generation of OpenFOAM dictionaries for geometry creation. Implemented tools for arcs, polylines, and splines with dynamic parameter editing, enhancing CFD workflow efficiency.",
      branch: "side",
      link: "https://fossee.in/",
      tech: [
        "Python",
        "Blender API",
        "PyVnT",
        "Git",
      ],
    },
  ];

  useEffect(() => {
    if (!timelineRef.current || !containerRef.current) return;

    const ctx = gsap.context(() => {
      // Timeline animation
      const timelinePath = timelineRef.current?.querySelector(".timeline-path");
      const timelineDots =
        timelineRef.current?.querySelectorAll(".timeline-dot");
      const experienceCards =
        timelineRef.current?.querySelectorAll(".experience-card");

      if (timelinePath) {
        // Animate the main timeline path
        gsap.fromTo(
          timelinePath,
          {
            strokeDasharray: "0 1000",
            opacity: 0.3,
          },
          {
            strokeDasharray: "1000 0",
            opacity: 1,
            duration: 2,
            ease: "power2.inOut",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 80%",
              end: "bottom 20%",
              scrub: 1,
            },
          }
        );
      }

      // Animate dots and cards
      timelineDots?.forEach((dot, index) => {
        gsap.fromTo(
          dot,
          {
            scale: 0,
            opacity: 0,
          },
          {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: dot,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      experienceCards?.forEach((card, index) => {
        gsap.fromTo(
          card,
          {
            y: 50,
            opacity: 0,
            rotateX: -15,
            scale: 0.9,
          },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            scale: 1,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleMoreInfo = (link, title) => {
    if (link && link !== "#") {
      window.open(link, "_blank");
    } else {
      // Placeholder action - you can customize this
      alert(`More information about ${title} coming soon!`);
    }
  };

  return (
    <div className="bg-background h-min-screen text-foreground">
      {/* <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border py-6">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-4xl font-bold text-center text-balance">Experience Timeline</h1>
        </div>
      </div> */}

      <div ref={containerRef} className="pt-10 pb-20">
        <div className="max-w-4xl mx-auto px-6">
          <div ref={timelineRef} className="relative">
            <svg
              className="absolute left-1/2 transform -translate-x-1/2 w-16 h-full z-0"
              viewBox="0 0 60 1000"
              preserveAspectRatio="none"
            >
              <path
                className="timeline-path"
                d="M30 0 Q20 700 30 800 Q40 900 30 1000 Q20 1100 30 1200 Q40 1300 30 1400 Q20 1500 30 1600"
                stroke="currentColor"
                strokeWidth="3"
                fill="none"
                opacity="0.7"
              />

              {/* Branch lines */}
              {experiences.map((exp, index) => (
                <g key={index}>
                  {exp.branch === "side" && (
                    <path
                      className="timeline-path"
                      d={`M${30 + (index % 2 === 0 ? -5 : 5)} ${(index + 1) * 180} Q${index % 2 === 0 ? "10" : "50"} ${(index + 1) * 180 - 20} ${index % 2 === 0 ? "5" : "55"} ${(index + 1) * 180}`}
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                      opacity="0.5"
                    />
                  )}
                </g>
              ))}
            </svg>

            <div className="relative z-10 flex flex-col items-center space-y-60">
              {experiences.map((experience, index) => (
                <div key={index} className="relative flex items-center w-full">
                  {/* Timeline Dot */}
                  <div
                    className={`timeline-dot absolute left-1/2 transform -translate-x-1/2 w-5 h-5 rounded-full border-3 border-foreground z-20 ${
                      experience.branch === "main"
                        ? "bg-foreground"
                        : "bg-background"
                    }`}
                  />

                  <div
                    className="experience-card w-full mx-auto relative"
                    style={{
                      transform: `translateY(${index * -4}px) rotate(${(index % 2 === 0 ? 1 : -1) * (index * 0.5)}deg)`,
                      zIndex: experiences.length - index,
                    }}
                  >
                    {/* Card shadow layers for depth */}
                    <div
                      className="absolute inset-0 bg-muted/20 rounded-lg transform translate-x-1 translate-y-1"
                      style={{ zIndex: -2 }}
                    />
                    <div
                      className="absolute inset-0 bg-muted/10 rounded-lg transform translate-x-2 translate-y-2"
                      style={{ zIndex: -3 }}
                    />

                    <div className="bg-card border-2 border-border rounded-lg p-6 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 hover:rotate-0 relative z-10 backdrop-blur-sm">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-2xl font-bold text-primary">
                          {experience.year}
                        </span>
                        <div
                          className={`w-3 h-3 rounded-full ${
                            experience.branch === "main"
                              ? "bg-foreground"
                              : "bg-muted-foreground"
                          }`}
                        />
                      </div>
                      <h3 className="text-xl font-semibold mb-2 text-balance">
                        {experience.title}
                      </h3>
                      <p className="text-muted-foreground font-medium mb-3">
                        {experience.company}
                      </p>
                      <p className="text-sm text-muted-foreground leading-relaxed text-pretty mb-4">
                        {experience.description}
                      </p>
                      {/* Tech Stack */}
                      {experience.tech && experience.tech.length > 0 && (
                        <div className="mb-4">
                          <h4 className="text-sm font-semibold text-foreground mb-2">
                            Technologies:
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {experience.tech.map((tech, techIndex) => (
                              <span
                                key={techIndex}
                                className="px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full border border-primary/20 hover:bg-primary/20 transition-colors duration-200"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      {/* More Info Button */}
                      {/* <button
                        onClick={() => handleMoreInfo(experience.link, experience.title)}
                        className="w-full mt-4 px-4 py-2 text-sm font-medium text-primary bg-primary/10 hover:bg-primary/20 border border-primary/20 hover:border-primary/40 rounded-md transition-all duration-200 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2"
                      >
                        More Info →
                      </button> */}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExperienceTimeline;
