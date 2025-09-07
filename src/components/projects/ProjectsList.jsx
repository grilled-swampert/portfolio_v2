"use client";

import React, { useState, useEffect } from "react";

const ProjectsList = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const projects = [
    {
      id: "crypto-etl-pipeline",
      title: "Crypto ETL Pipeline",
      category: "Data Engineering",
      year: null,
      tech: ["Airflow", "PySpark", "PostgreSQL", "Python"],
      description:
        "Automated data orchestration workflows to ingest cryptocurrency market data from multiple APIs, enabling structured historical analysis for downstream analytics.",
      details:
        "Designed distributed processing for large-scale transformations and implemented robust workflows for scalable and reliable data ingestion.",
      status: "Ongoing Enhancements",
      github: "https://github.com/grilled-swampert/crypto-data-pipeline",
      demo: null,
    },
    {
      id: "ecommerce-microservices",
      title: "E-commerce Microservices Platform",
      category: "Backend / DevOps",
      year: null,
      tech: ["Kubernetes", "Docker", "PostgreSQL", "NodeJS"],
      description:
        "A scalable microservices-based e-commerce platform with container orchestration and fault tolerance patterns.",
      details:
        "Implemented distributed tracing, service mesh patterns, and automated CI/CD pipelines for seamless deployment and reliability.",
      status: "Ongoing Enhancements",
      github: "https://github.com/grilled-swampert/ecommerce-microservices",
      demo: null,
    },
    {
      id: "slateboard",
      title: "Slateboard – Real-Time Whiteboard",
      category: "Realtime Collaboration Tool",
      year: null,
      tech: ["React", "Socket.IO", "TypeScript", "NodeJS"],
      description:
        "A real-time collaborative whiteboard platform with seamless multi-user interaction and synchronized canvas state.",
      details:
        "Built using event-driven architecture with WebSocket connections and session-based access control for secure collaboration.",
      status: "Live",
      github: "https://github.com/grilled-swampert/slate-board",
      demo: "https://slate-board-sigma.vercel.app/",
    },
  ];

  // Handle hash-based navigation
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.substring(1);
      if (hash) {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          // Optionally expand the project card
          const projectIndex = projects.findIndex(project => project.id === hash);
          if (projectIndex !== -1) {
            setHoveredIndex(projectIndex);
            // Auto-collapse after 3 seconds
            setTimeout(() => setHoveredIndex(null), 3000);
          }
        }
      }
    };

    // Handle initial load
    handleHashChange();

    // Handle hash changes
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <div className="min-h-screen text-white py-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="relative">
          {/* Background stack effect */}
          <div className="absolute inset-0 flex justify-center">
            {projects.map((_, index) => (
              <div
                key={index}
                className="absolute w-80 h-32 bg-slate-800/20 rounded-lg border border-slate-700/30"
                style={{
                  transform: `translateY(${index * 8}px) translateX(${index * 2}px) rotate(${index * 0.5}deg)`,
                  zIndex: projects.length - index - 10,
                }}
              />
            ))}
          </div>

          {/* Main project cards */}
          <div className="relative flex flex-col w-full items-center space-y-4">
            {projects.map((project, index) => (
              <div
                key={index}
                id={project.id} // Add ID for hash navigation
                className="relative w-full group cursor-pointer scroll-mt-20" // Add scroll-mt for better positioning
                style={{
                  zIndex: projects.length - index,
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Card shadow layers */}
                <div
                  className="absolute inset-0 rounded-lg transform translate-x-1 translate-y-1 transition-all duration-300"
                  style={{
                    transform:
                      hoveredIndex === index
                        ? "translateX(2px) translateY(2px)"
                        : "translateX(1px) translateY(1px)",
                  }}
                />
                <div
                  className="absolute inset-0 rounded-lg transform translate-x-2 translate-y-2 transition-all duration-300"
                  style={{
                    transform:
                      hoveredIndex === index
                        ? "translateX(4px) translateY(4px)"
                        : "translateX(2px) translateY(2px)",
                  }}
                />

                {/* Main card */}
                <div
                  className={`
                    relative border-2 border-white rounded-lg p-6 
                    transition-all duration-1000 ease-out
                    ${
                      hoveredIndex === index
                        ? "shadow-2xl bg-black border-slate-600 duration-1000"
                        : "shadow-lg hover:shadow-xl"
                    }
                  `}
                  style={{
                    height: hoveredIndex === index ? "350px" : "140px",
                  }}
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-balance leading-tight text-white">
                        {project.title}
                      </h3>
                      <div className="flex items-center gap-3 mt-2">
                        <span className="text-sm text-slate-300 font-medium">
                          {project.category}
                        </span>
                        <span className="text-sm text-white font-bold">
                          {project.year}
                        </span>
                      </div>
                    </div>
                    <div
                      className={`
                      px-2 py-1 rounded-full text-xs font-medium border
                      ${
                        project.status === "Live"
                          ? "bg-green-900/50 text-green-300 border-green-700"
                          : project.status === "Beta"
                            ? "bg-yellow-900/50 text-yellow-300 border-yellow-700"
                            : "bg-blue-900/50 text-blue-300 border-blue-700"
                      }
                    `}
                    >
                      {project.status}
                    </div>
                  </div>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-2 py-1 bg-slate-700 text-slate-300 text-xs rounded-md font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Description - always visible when expanded */}
                  <div
                    className={`
                      transition-all duration-500 ease-out overflow-hidden
                      ${hoveredIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}
                    `}
                  >
                    <p className="text-sm text-slate-300 leading-relaxed mb-4">
                      {project.description}
                    </p>

                    <div className="border-t border-slate-700 pt-4">
                      <h4 className="text-sm font-semibold mb-2 text-white">
                        Technical Details
                      </h4>
                      <p className="text-sm text-slate-300 leading-relaxed mb-4">
                        {project.details}
                      </p>

                      {/* Links */}
                      <div className="flex gap-4">
                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm font-medium text-blue-400 hover:text-blue-300 hover:underline transition-colors"
                          >
                            GitHub
                          </a>
                        )}
                        {project.demo && (
                          <a
                            href={project.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm font-medium text-blue-400 hover:text-blue-300 hover:underline transition-colors"
                          >
                            Live Demo
                          </a>
                        )}
                      </div>

                      <div className="text-lg py-5">Documentation will be added soon.</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectsList;