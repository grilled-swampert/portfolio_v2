"use client"

import React, { useState } from "react"

const ProjectsList = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null)

  const projects = [
    {
      title: "E-Commerce Platform",
      category: "Full Stack",
      year: "2024",
      tech: ["React", "Node.js", "PostgreSQL"],
      description:
        "A comprehensive e-commerce solution with real-time inventory management, payment processing, and advanced analytics dashboard.",
      details:
        "Built with microservices architecture, implemented Redis caching for improved performance, and integrated with multiple payment gateways including Stripe and PayPal.",
      status: "Live",
    },
    {
      title: "AI Content Generator",
      category: "Machine Learning",
      year: "2024",
      tech: ["Python", "TensorFlow", "FastAPI"],
      description:
        "An AI-powered content generation tool that creates marketing copy, blog posts, and social media content using advanced language models.",
      details:
        "Trained custom models on domain-specific data, implemented rate limiting and user authentication, deployed on AWS with auto-scaling capabilities.",
      status: "Beta",
    },
    {
      title: "Task Management App",
      category: "Mobile",
      year: "2023",
      tech: ["React Native", "Firebase", "TypeScript"],
      description:
        "A cross-platform mobile application for team collaboration and project management with real-time synchronization.",
      details:
        "Features include drag-and-drop task boards, push notifications, offline support, and integration with popular calendar applications.",
      status: "Live",
    },
    {
      title: "Data Visualization Dashboard",
      category: "Frontend",
      year: "2023",
      tech: ["Vue.js", "D3.js", "WebGL"],
      description:
        "Interactive dashboard for visualizing complex datasets with custom charts, filters, and real-time data streaming.",
      details:
        "Optimized for handling large datasets with virtual scrolling, implemented custom WebGL renderers for smooth animations at 60fps.",
      status: "Live",
    },
    {
      title: "Blockchain Voting System",
      category: "Blockchain",
      year: "2022",
      tech: ["Solidity", "Web3.js", "IPFS"],
      description:
        "Decentralized voting platform ensuring transparency and immutability using smart contracts on Ethereum blockchain.",
      details:
        "Implemented zero-knowledge proofs for voter privacy, gas optimization techniques, and comprehensive security audits.",
      status: "Prototype",
    },
  ]

  return (
    <div className="min-h-screen bg-background text-foreground py-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="relative">
          {/* Background stack effect */}
          <div className="absolute inset-0 flex justify-center">
            {projects.map((_, index) => (
              <div
                key={index}
                className="absolute w-80 h-32 bg-muted/10 rounded-lg border border-border/20"
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
                className="relative w-full group cursor-pointer"
                style={{
                  zIndex: projects.length - index,
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Card shadow layers */}
                <div
                  className="absolute inset-0 bg-muted/20 rounded-lg transform translate-x-1 translate-y-1 transition-all duration-300"
                  style={{
                    transform:
                      hoveredIndex === index ? "translateX(2px) translateY(2px)" : "translateX(1px) translateY(1px)",
                  }}
                />
                <div
                  className="absolute inset-0 bg-muted/10 rounded-lg transform translate-x-2 translate-y-2 transition-all duration-300"
                  style={{
                    transform:
                      hoveredIndex === index ? "translateX(4px) translateY(4px)" : "translateX(2px) translateY(2px)",
                  }}
                />

                {/* Main card */}
                <div
                  className={`
                    relative bg-card border-2 border-border rounded-lg p-6 
                    transition-all duration-500 ease-out backdrop-blur-sm
                    ${
                      hoveredIndex === index
                        ? "shadow-2xl scale-110 -translate-y-4 bg-card/95"
                        : "shadow-lg hover:shadow-xl"
                    }
                  `}
                  style={{
                    height: hoveredIndex === index ? "auto" : "140px",
                    minHeight: hoveredIndex === index ? "280px" : "140px",
                  }}
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-balance leading-tight">{project.title}</h3>
                      <div className="flex items-center gap-3 mt-2">
                        <span className="text-sm text-muted-foreground font-medium">{project.category}</span>
                        <span className="text-sm text-primary font-bold">{project.year}</span>
                      </div>
                    </div>
                    <div
                      className={`
                      px-2 py-1 rounded-full text-xs font-medium border
                      ${
                        project.status === "Live"
                          ? "bg-green-100 text-green-800 border-green-200"
                          : project.status === "Beta"
                            ? "bg-yellow-100 text-yellow-800 border-yellow-200"
                            : "bg-blue-100 text-blue-800 border-blue-200"
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
                        className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Description */}
                  <p className="text-sm hidden text-muted-foreground leading-relaxed text-pretty mb-4">
                    {project.description}
                  </p>

                  {/* Expanded content */}
                  <div
                    className={`
                      transition-all duration-500 ease-out overflow-hidden
                      ${hoveredIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}
                    `}
                  >
                    <div className="border-t border-border pt-4 mt-4">
                      <h4 className="text-sm font-semibold mb-2 text-foreground">Technical Details</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed text-pretty">{project.details}</p>
                    </div>
                  </div>

                  {/* Hover indicator */}
                  <div
                    className={`
                      absolute bottom-4 right-4 transition-all duration-300
                      ${hoveredIndex === index ? "opacity-100 scale-100" : "opacity-0 scale-75"}
                    `}
                  >
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectsList
