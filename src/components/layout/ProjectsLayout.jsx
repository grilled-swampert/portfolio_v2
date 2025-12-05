import React, { useState, useRef } from "react";
import { TiLocationArrow } from "react-icons/ti";
import { useNavigate } from "react-router-dom";
import { FaGithub, FaExternalLinkAlt, FaClock, FaCode } from "react-icons/fa";

export const BentoTilt = ({ src, children, className = "" }) => {
  const [transformStyle, setTransformStyle] = useState("");
  const itemRef = useRef(null);
  const navigate = useNavigate();

  const handleMouseMove = (event) => {
    if (!itemRef.current) return;

    const { left, top, width, height } =
      itemRef.current.getBoundingClientRect();

    const relativeX = (event.clientX - left) / width;
    const relativeY = (event.clientY - top) / height;

    const tiltX = (relativeY - 0.5) * 1;
    const tiltY = (relativeX - 0.5) * -1;

    const newTransform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(.98, .98, .98)`;
    setTransformStyle(newTransform);
  };

  const handleMouseLeave = () => {
    setTransformStyle("");
  };

  const handleRedirect = () => {
    if (src) {
      navigate(src);
      window.scrollTo(0, 0);
    }
  };

  return (
    <div
      ref={itemRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleRedirect}
      style={{ transform: transformStyle, transition: "transform 0.3s ease-out" }}
    >
      {children}
    </div>
  );
};

export const BentoCard = ({
  title,
  description,
  technologies,
  features,
  duration,
  status,
  projectId,
  githubLink,
  demoLink,
}) => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [hoverOpacity, setHoverOpacity] = useState(0);
  const hoverButtonRef = useRef(null);
  const navigate = useNavigate();

  const handleMouseMove = (event) => {
    if (!hoverButtonRef.current) return;
    const rect = hoverButtonRef.current.getBoundingClientRect();

    setCursorPosition({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    });
  };

  const handleMouseEnter = () => setHoverOpacity(1);
  const handleMouseLeave = () => setHoverOpacity(0);

  const handleCheckProject = (e) => {
    e.stopPropagation();
    if (projectId) {
      navigate(`/projects#${projectId}`);
    }
  };

  const handleLinkClick = (e, url) => {
    e.stopPropagation();
    if (url) {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div className="relative size-full group">
      <div className="relative z-10 flex size-full flex-col lg:flex-row gap-8 p-8 text-black">
        {/* Left Side - Main Info */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between mb-4">
              <h1 className="text-3xl md:text-4xl font-bold font-poppins">{title}</h1>
              {status && (
                <span className="px-3 py-1 text-xs font-mono bg-black text-white rounded-full">
                  {status}
                </span>
              )}
            </div>
            
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-6 font-poppins">
              {description}
            </p>

            {/* Duration */}
            {duration && (
              <div className="flex items-center gap-2 text-gray-600 mb-6">
                <FaClock />
                <span className="text-sm font-mono">{duration}</span>
              </div>
            )}

            {/* Key Features */}
            {features && features.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm font-mono text-gray-500 mb-3 flex items-center gap-2">
                  <FaCode />
                  KEY FEATURES
                </h3>
                <ul className="space-y-2">
                  {features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2 text-gray-700">
                      <span className="mt-1.5 w-1.5 h-1.5 bg-black rounded-full flex-shrink-0"></span>
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 mt-6">
            {githubLink && (
              <button
                onClick={(e) => handleLinkClick(e, githubLink)}
                className="flex items-center gap-2 px-6 py-3 text-sm font-medium border-2 border-black text-black bg-white hover:bg-black hover:text-white transition-all duration-300 rounded-xl group"
              >
                <FaGithub className="text-lg" />
                View Code
              </button>
            )}
            {demoLink && (
              <button
                onClick={(e) => handleLinkClick(e, demoLink)}
                className="flex items-center gap-2 px-6 py-3 text-sm font-medium bg-black text-white hover:bg-white hover:text-black border-2 border-black transition-all duration-300 rounded-xl"
              >
                <FaExternalLinkAlt />
                Live Demo
              </button>
            )}
            {projectId && (
              <button
                ref={hoverButtonRef}
                onMouseMove={handleMouseMove}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={handleCheckProject}
                className="relative flex items-center gap-2 px-6 py-3 text-sm font-medium bg-gray-800 text-white hover:bg-gray-900 transition-all duration-300 rounded-xl overflow-hidden"
              >
                <div
                  className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
                  style={{
                    opacity: hoverOpacity,
                    background: `radial-gradient(100px circle at ${cursorPosition.x}px ${cursorPosition.y}px, rgba(255,255,255,0.2), transparent)`,
                  }}
                />
                <TiLocationArrow className="relative z-20" />
                <span className="relative z-20">Documentation</span>
              </button>
            )}
          </div>
        </div>

        {/* Right Side - Technologies */}
        <div className="lg:w-80 flex flex-col gap-6">
          <div>
            <h3 className="text-sm font-mono text-gray-500 mb-4">TECH STACK</h3>
            <div className="flex flex-wrap gap-2">
              {technologies && technologies.map((tech, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-black/5 border border-black/10 rounded-lg text-sm font-medium text-gray-800 hover:bg-black hover:text-white hover:border-black transition-all duration-300 cursor-default"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Visual Accent */}
          <div className="hidden lg:block flex-1 relative">
            <div className="absolute inset-0 border-2 border-black/10 rounded-2xl group-hover:border-black/20 transition-colors duration-300">
              <div className="absolute top-4 right-4 w-16 h-16 border-2 border-black/5 rounded-full"></div>
              <div className="absolute bottom-4 left-4 w-12 h-12 border-2 border-black/5 rounded-full"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 border-2 border-black/5 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProjectsLayout = () => {
  const projects = [
    {
      title: "Crypto ETL Pipeline",
      description: "Automated crypto market data ingestion and transformation with Airflow and PySpark for scalable analytics.",
      technologies: ["Apache Airflow", "PySpark", "Python", "PostgreSQL", "Docker", "AWS S3"],
      features: [
        "Automated data ingestion from multiple crypto exchanges",
        "Real-time data transformation using PySpark",
        "Scalable architecture handling 1M+ records daily",
        "Comprehensive data quality checks and monitoring"
      ],
      duration: "3 months",
      status: "PRODUCTION",
      projectId: "crypto-etl-pipeline",
      githubLink: "https://github.com/grilled-swampert/crypto-data-pipeline",
      demoLink: "",
    },
    {
      title: "E-Commerce Microservices",
      description: "Cloud-native microservices platform with Kubernetes, Docker, and CI/CD pipelines for scalable deployments.",
      technologies: ["Kubernetes", "Docker", "Node.js", "MongoDB", "Redis", "Jenkins", "AWS"],
      features: [
        "Microservices architecture with API gateway",
        "Automated CI/CD pipeline with zero-downtime deployments",
        "Event-driven communication using message queues",
        "Horizontal scaling with Kubernetes orchestration"
      ],
      duration: "4 months",
      status: "PRODUCTION",
      projectId: "ecommerce-microservices",
      githubLink: "https://github.com/grilled-swampert/ecommerce-microservices",
      demoLink: "",
    },
    {
      title: "Slateboard",
      description: "Real-time collaborative whiteboard built with WebSockets, enabling seamless multi-user drawing sessions.",
      technologies: ["React", "Node.js", "Socket.io", "Canvas API", "Express", "MongoDB"],
      features: [
        "Real-time collaboration with multiple users",
        "Advanced drawing tools and shape recognition",
        "Session persistence and export functionality",
        "Responsive design for mobile and desktop"
      ],
      duration: "2 months",
      status: "LIVE",
      projectId: "slateboard",
      githubLink: "https://github.com/grilled-swampert/slate-board",
      demoLink: "https://slate-board-sigma.vercel.app/",
    },
  ];

  return (
    <section className="bg-gradient-to-b from-zinc-800 via-black to-gray-800 pb-32">
      <div className="container mx-auto px-4 md:px-10">
        <div className="px-5 py-32">
          <h2 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-4 pt-[8rem] flex justify-center">
            PROJECTS
          </h2>
          <p className="text-center text-gray-400 text-lg font-poppins">
            Building innovative solutions with modern technologies
          </p>
        </div>

        <div className="flex flex-col gap-8 font-poppins">
          {projects.map((project, index) => (
            <BentoTilt 
              key={index}
              className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-shadow duration-300 border border-white/10"
            >
              <BentoCard {...project} />
            </BentoTilt>
          ))}

          {/* View All Projects Card */}
          <BentoTilt 
            className="bg-white rounded-3xl border-4 border-black shadow-2xl min-h-[300px] cursor-pointer"
            src="/projects"
          >
            <div className="flex size-full flex-col justify-between p-10">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-black mb-4">
                  More Projects
                </h1>
                <p className="text-gray-600 text-lg">
                  Explore my complete portfolio
                </p>
              </div>
              <div className="flex justify-end items-end">
                <TiLocationArrow className="text-black text-6xl transform group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform duration-300" />
              </div>
            </div>
          </BentoTilt>
        </div>
      </div>
    </section>
  );
};

export default ProjectsLayout;