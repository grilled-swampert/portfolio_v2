import React, { useState, useRef } from "react";
import { TiLocationArrow } from "react-icons/ti";
import { useNavigate } from "react-router-dom";

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

    const tiltX = (relativeY - 0.5) * 2;
    const tiltY = (relativeX - 0.5) * -2;

    const newTransform = `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(.95, .95, .95)`;
    setTransformStyle(newTransform);
  };

  const handleMouseLeave = () => {
    setTransformStyle("");
  };

  const handleRedirect = () => {
    console.log("src:", src);
    navigate(src);
    window.scrollTo(0, 0);
  };

  return (
    <div
      ref={itemRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleRedirect}
      style={{ transform: transformStyle }}
    >
      {children}
    </div>
  );
};

export const BentoCard = ({
  src,
  title,
  description,
  isComingSoon,
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
    <div className="relative size-full">
      <div className="relative z-10 flex size-full flex-col justify-between p-5 text-black">
        <div>
          <h1 className="bento-title font-medium special-font">{title}</h1>
          {description && (
            <p className="mt-3 mb-5 font-poppins font-normal max-w-64 text-base md:text-lg">
              {description}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-3">
          {/* GitHub and Demo Links */}
          {(githubLink || demoLink) && (
            <div className="flex gap-2">
              {(githubLink || demoLink) && (
                <div className="flex gap-2">
                  {githubLink && (
                    <button
                      onClick={(e) => handleLinkClick(e, githubLink)}
                      className="px-2 py-1 text-base border border-black text-black bg-white hover:text-white hover:bg-black duration-500 hover:border-gray-400 transition-colors"
                    >
                      GitHub
                    </button>
                  )}
                  {demoLink && (
                    <button
                      onClick={(e) => handleLinkClick(e, demoLink)}
                      className="px-2 py-1 text-base border border-black text-black bg-white hover:text-white hover:bg-black duration-500 transition-colors"
                    >
                      Demo
                    </button>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Check Project Button */}
          {isComingSoon && (
            <div
              ref={hoverButtonRef}
              onMouseMove={handleMouseMove}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onClick={handleCheckProject}
              className="border-hsla relative flex w-fit cursor-pointer items-center gap-1 overflow-hidden rounded-full bg-black px-5 py-2 text-xs uppercase text-white/20"
            >
              <div
                className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
                style={{
                  opacity: hoverOpacity,
                  background: `radial-gradient(100px circle at ${cursorPosition.x}px ${cursorPosition.y}px, #656fe288, #00000026)`,
                }}
              />
              <TiLocationArrow className="relative z-20 text-white" />
              <p className="relative z-20 text-white">CHECK DOCUMENTATION</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const ProjectsLayout = () => (
  <section className="bg-gradient-to-b from-zinc-800 via-black to-gray-800 pb-52">
    <div className="container mx-auto px-3 md:px-10">
      <div className="px-5 py-32">
        <p className="text-5xl md:text-6xl font-light tracking-tight text-white mb-5 pt-[10rem] flex justify-center">
          PROJECTS
        </p>
      </div>
      <div className="grid md:h-[90vh] w-full grid-cols-2 grid-rows-4 md:grid-rows-2 gap-7 font-zentry">
        <BentoTilt className="bg-white bento-tilt_1 row-span-1 md:col-span-1 md:row-span-1">
          <BentoCard
            src="videos/feature-2.mp4"
            title={<>Crypto ETL Pipeline</>}
            description="Automated crypto market data ingestion and transformation with Airflow and PySpark for scalable analytics."
            isComingSoon
            projectId="crypto-etl-pipeline"
            githubLink="https://github.com/grilled-swampert/crypto-data-pipeline"
            demoLink=""
          />
        </BentoTilt>

        <BentoTilt className="bg-white bento-tilt_1 row-span-1 col-span-2 md:col-span-1 md:ms-0">
          <BentoCard
            src="videos/feature-3.mp4"
            title={<>E-Commerce Microservices</>}
            description="Cloud-native microservices platform with Kubernetes, Docker, and CI/CD pipelines for scalable deployments."
            isComingSoon
            projectId="ecommerce-microservices"
            githubLink="https://github.com/grilled-swampert/ecommerce-microservices"
            demoLink=""
          />
        </BentoTilt>

        <BentoTilt className="bg-white bento-tilt_1 row-span-1 col-span-2 md:col-span-1 md:me-0">
          <BentoCard
            src="videos/feature-4.mp4"
            title={<>Slateboard</>}
            description="Real-time collaborative whiteboard built with WebSockets, enabling seamless multi-user drawing sessions."
            isComingSoon
            projectId="slateboard"
            githubLink="https://github.com/grilled-swampert/slate-board"
            demoLink="https://slate-board-sigma.vercel.app/"
          />
        </BentoTilt>

        <BentoTilt className="bg-white bento-tilt_1 row-span-1 col-span-2 md:col-span-1" src={"/projects"}>
          <div className="flex size-full flex-col justify-between bg-black p-5 border-white border-4">
            <h1 className="bento-title special-font max-w-64 text-white">
              Other Projects.
            </h1>
            <TiLocationArrow className="m-16 scale-[5] self-end" />
          </div>
        </BentoTilt>
      </div>
    </div>
  </section>
);

export default ProjectsLayout;
