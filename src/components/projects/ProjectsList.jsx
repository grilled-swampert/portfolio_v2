"use client";

import React, { useState, useEffect } from "react";

const ProjectsList = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const projects = [
    {
      // map matching
      id: "map-matching-gnss",
      title: "Map Matching for Vehicle GNSS Data",
      category: "SIH 2024 Finalist Project",
      year: 2024,
      tech: ["Python", "Pandas", "NumPy", "Folium", "Scikit-learn"],
      description:
        "Processed raw GNSS data for vehicles, applied map-matching algorithms to improve positioning accuracy, and visualized routes on interactive maps.",
      details:
        "Implemented filtering and correction techniques, integrated ML models for anomaly detection, and visualized matched paths for performance evaluation.",
      status: "Completed",
      github: null,
      demo: null,
    },
    {
      // blender python addons
      id: "blender-python-addons",
      title: "Blender Python Addons",
      category: "FOSSEE Internship",
      year: 2024,
      tech: ["Python", "Blender API", "OpenFOAM"],
      description:
        "Developed Blender addons to automate generation of geometries (arcs, polylines, splines) and manipulate them programmatically for simulations.",
      details:
        "Created interactive panels, dynamic property updates, and integration with CFD tools like OpenFOAM for engineering workflows.",
      status: "Completed",
      github: null,
      demo: null,
    },
    {
      // crypto etl pipeline
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
      // ecommerce microservices
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
      // slateboard
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
    {
      // mern elective project
      id: "mern-elective-project",
      title: "MERN Stack Elective Project",
      category: "Web Development",
      year: null,
      tech: ["MongoDB", "ExpressJS", "React", "NodeJS"],
      description:
        "A full-stack web application built for an elective course, focusing on dynamic CRUD operations, authentication, and responsive UI.",
      details:
        "Implemented JWT-based authentication, role-based access control, and optimized data fetching with MongoDB aggregations.",
      status: "Completed",
      github: null,
      demo: null,
    },
    // {
    //   // coding ai agent
    //   id: "coding-ai-agent",
    //   title: "Coding AI Agent",
    //   category: "Artificial Intelligence",
    //   year: null,
    //   tech: ["Python", "OpenAI API", "LangChain", "FastAPI"],
    //   description:
    //     "An AI agent capable of understanding coding queries, generating solutions, and interacting via a REST API or chat interface.",
    //   details:
    //     "Integrated language model APIs with code execution environment, added conversational memory, and automated code testing and suggestions.",
    //   status: "Beta",
    //   github: null,
    //   demo: null,
    // },
    // {
    //   // cybersecurity agent
    //   id: "cybersecurity-agent",
    //   title: "Real-Time Adaptive Cybersecurity Agent",
    //   category: "AI for Security",
    //   year: null,
    //   tech: ["Python", "Scikit-learn", "Kafka", "FastAPI", "ELK Stack"],
    //   description:
    //     "Developed an AI-driven security agent that learns normal network traffic patterns and flags anomalies in real time.",
    //   details:
    //     "Implemented online anomaly detection models, streaming data ingestion, and an interactive dashboard for threat monitoring.",
    //   status: "In Progress",
    //   github: null,
    //   demo: null,
    // },
    // {
    //   // autonomous research assistant
    //   id: "autonomous-research-assistant",
    //   title: "Autonomous Research Assistant",
    //   category: "Applied AI / Knowledge Graphs",
    //   year: null,
    //   tech: ["Python", "LangChain", "Neo4j", "OpenAI API", "FastAPI"],
    //   description:
    //     "Built an agent that reads academic papers, extracts key insights, and creates a knowledge graph for domain-specific Q&A.",
    //   details:
    //     "Integrated RAG pipelines with embeddings, automated knowledge extraction from PDFs, and graph ML for link prediction.",
    //   status: "In Progress",
    //   github: null,
    //   demo: null,
    // },
    // {
    //   // causal inference
    //   id: "causal-inference-engine",
    //   title: "Causal Inference Engine for Business Decisions",
    //   category: "Data Science",
    //   year: null,
    //   tech: ["Python", "EconML", "DoWhy", "Pandas", "Scikit-learn"],
    //   description:
    //     "Developed a framework to estimate the causal impact of interventions such as promotions or pricing strategies.",
    //   details:
    //     "Applied causal forests and treatment effect estimation to separate correlation from causation, enabling data-driven decision-making.",
    //   status: "In Progress",
    //   github: null,
    //   demo: null,
    // },
    // {
    //   // bias fairness auditing
    //   id: "bias-fairness-audit",
    //   title: "Bias & Fairness Auditing Toolkit",
    //   category: "Responsible AI",
    //   year: null,
    //   tech: ["Python", "Pandas", "Scikit-learn", "SHAP", "LIME"],
    //   description:
    //     "Created a toolkit to audit ML models for fairness, bias, and explainability across demographic groups.",
    //   details:
    //     "Implemented fairness metrics, visual dashboards, and bias mitigation strategies with interpretability layers.",
    //   status: "In Progress",
    //   github: null,
    //   demo: null,
    // },
    // {
    //   // anomaly detection streaming
    //   id: "streaming-anomaly-detection",
    //   title: "Real-Time Anomaly Detection in Streaming Data",
    //   category: "Data Science / Streaming ML",
    //   year: null,
    //   tech: ["Python", "Kafka", "PyTorch", "Scikit-learn"],
    //   description:
    //     "Built a streaming ML system to detect anomalies in financial transactions and IoT sensor data in real time.",
    //   details:
    //     "Integrated online learning models with drift detection, deployed on a scalable message queue pipeline, and visualized alerts in dashboards.",
    //   status: "In Progress",
    //   github: null,
    //   demo: null,
    // },
  ];

  // Handle hash-based navigation
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.substring(1);
      if (hash) {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "center" });
          // Optionally expand the project card
          const projectIndex = projects.findIndex(
            (project) => project.id === hash
          );
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
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  // Fixed number of background elements (you can adjust this number)
  const backgroundStackCount = 5;

  return (
    <div className="min-h-screen text-white py-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="relative">
          {/* Background stack effect - Fixed number */}
          <div className="absolute inset-0 flex justify-center">
            {Array.from({ length: backgroundStackCount }, (_, index) => (
              <div
                key={index}
                className="absolute w-80 h-32 bg-slate-800/20 rounded-lg border border-slate-700/30"
                style={{
                  transform: `translateY(${index * 8}px) translateX(${index * 2}px) rotate(${index * 0.5}deg)`,
                  zIndex: backgroundStackCount - index - 10,
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
                              relative border-2 border-white rounded-lg p-4 sm:p-5 md:p-6
                              transition-all duration-500 ease-out
                              ${
                                hoveredIndex === index
                                  ? "shadow-2xl bg-black border-slate-600"
                                  : "shadow-lg hover:shadow-xl"
                              }
                            `}
                  style={{ maxWidth: "100%" }}
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
                            : project.status === "Completed"
                              ? "bg-purple-900/50 text-purple-300 border-purple-700"
                              : project.status === "Ongoing Enhancements"
                                ? "bg-blue-900/50 text-blue-300 border-blue-700"
                                : "bg-gray-900/50 text-gray-300 border-gray-700"
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

                      <div className="text-lg py-5">
                        Documentation will be added soon.
                      </div>
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