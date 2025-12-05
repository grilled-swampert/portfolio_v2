import React, { useEffect } from "react";
import Experience01Picture from "../../assets/exp01.png";
import Experience02Picture from "../../assets/exp02.png";
import { FaCalendarAlt, FaMapMarkerAlt, FaCode, FaCheckCircle } from "react-icons/fa";

const experiences = [
  {
    name: "Citius Cloud LLP",
    stack:
      "Kubernetes, ReactJS, PostresSQL, Digital Ocean, Vault, Cypress, Openshift",
    description:
      "Designing and implementing automation solutions for VM provisioning, software installation workflows, and integrations. Supporting development of a containerized PERN stack product.",
    title: "DevOps Engineer Intern",
    location: "Remote",
    githubLink: "",
    image: Experience02Picture,
    status: "Current",
    time: "May 2025 - Present",
    keyAchievements: [
      "Automated VM provisioning reducing setup time by 60%",
      "Implemented CI/CD pipelines for containerized applications",
      "Integrated HashiCorp Vault for secure credential management",
      "Developed React dashboards for infrastructure monitoring"
    ],
    responsibilities: [
      "Infrastructure automation and orchestration",
      "Container deployment and management",
      "Security implementation and monitoring",
      "Full-stack development support"
    ]
  },
  {
    name: "FOSSEE, IIT Bombay",
    stack: "Python, Blender",
    description:
      "Developed a Blender addon to automate generation of OpenFOAM dictionaries for geometry creation. Implemented tools for arcs, polylines, and splines with dynamic parameter editing, enhancing CFD workflow efficiency.",
    title: "Summer Fellowship",
    location: "Mumbai, India",
    githubLink: "",
    image: Experience01Picture,
    status: "Completed",
    time: "March 2024 - July 2024",
    keyAchievements: [
      "Created custom Blender addon for CFD geometry generation",
      "Reduced manual geometry creation time by 75%",
      "Implemented dynamic parameter editing system",
      "Contributed to open-source CFD toolchain"
    ],
    responsibilities: [
      "Python addon development for Blender",
      "OpenFOAM dictionary automation",
      "User interface design and implementation",
      "Documentation and testing"
    ]
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
    <main className="w-full bg-gradient-to-b from-black to-zinc-800">
      <p className="text-5xl md:text-6xl font-light tracking-tight text-white mb-5 pt-[10rem] flex justify-center">
        EXPERIENCE
      </p>

      <div className="sticky_parent h-[200vh]">
        <div className="sticky top-0 h-screen overflow-hidden">
          <div className="scroll_section absolute top-0 h-full w-[200vw] will-change-transform flex justify-between items-center px-[5vw] md:px-[9vw] gap-8">
            {experiences.map((experience, index) => (
              <div
                key={index}
                className="w-[85vw] h-[90vh] flex flex-col md:flex-row justify-start items-start text-left text-white bg-gradient-to-br from-zinc-900 to-black border border-white/10 p-8 md:p-10 rounded-3xl shadow-2xl overflow-y-auto"
              >
                {/* Left Side - Image and Basic Info */}
                <div className="w-full md:w-[35%] flex flex-col items-center md:items-start mb-6 md:mb-0 md:mr-8">
                  {/* Image */}
                  {experience.image && (
                    <div className="relative mb-6">
                      <div className="absolute inset-0 bg-white/10 rounded-2xl blur-xl"></div>
                      <img
                        src={experience.image}
                        alt={experience.name}
                        className="relative w-48 h-48 md:w-56 md:h-56 object-cover rounded-2xl border-2 border-white/20 shadow-lg hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}

                  {/* Company Info */}
                  <div className="w-full text-center md:text-left">
                    <h2 className="text-3xl md:text-4xl font-bold mb-2">
                      {experience.name}
                    </h2>
                    <p className="text-lg text-gray-300 mb-3 italic font-medium">
                      {experience.title}
                    </p>

                    {/* Meta Info */}
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-gray-400 justify-center md:justify-start">
                        <FaCalendarAlt className="text-sm" />
                        <span className="text-sm">{experience.time}</span>
                      </div>
                      {experience.location && (
                        <div className="flex items-center gap-2 text-gray-400 justify-center md:justify-start">
                          <FaMapMarkerAlt className="text-sm" />
                          <span className="text-sm">{experience.location}</span>
                        </div>
                      )}
                      {experience.status && (
                        <div className="inline-block px-3 py-1 bg-white/10 border border-white/20 rounded-full text-xs font-mono mt-2">
                          {experience.status}
                        </div>
                      )}
                    </div>

                    {/* Tech Stack */}
                    <div className="mt-6">
                      <div className="flex items-center gap-2 text-gray-400 mb-3 justify-center md:justify-start">
                        <FaCode className="text-sm" />
                        <span className="text-xs font-mono">TECH STACK</span>
                      </div>
                      <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                        {experience.stack.split(", ").map((tech, idx) => (
                          <span
                            key={idx}
                            className="text-xs bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg hover:bg-white/10 transition-colors duration-200"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Side - Detailed Content */}
                <div className="w-full md:w-[65%] flex flex-col space-y-6">
                  {/* Description */}
                  <div>
                    <h3 className="text-xl font-semibold mb-3 text-white">Overview</h3>
                    <p className="text-base text-gray-300 leading-relaxed">
                      {experience.description}
                    </p>
                  </div>

                  {/* Key Achievements */}
                  {experience.keyAchievements && experience.keyAchievements.length > 0 && (
                    <div>
                      <h3 className="text-xl font-semibold mb-3 text-white flex items-center gap-2">
                        <FaCheckCircle className="text-green-400" />
                        Key Achievements
                      </h3>
                      <ul className="space-y-2">
                        {experience.keyAchievements.map((achievement, idx) => (
                          <li key={idx} className="flex items-start gap-3 text-gray-300">
                            <span className="mt-1.5 w-1.5 h-1.5 bg-green-400 rounded-full flex-shrink-0"></span>
                            <span className="text-sm leading-relaxed">{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Responsibilities */}
                  {experience.responsibilities && experience.responsibilities.length > 0 && (
                    <div>
                      <h3 className="text-xl font-semibold mb-3 text-white">Responsibilities</h3>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {experience.responsibilities.map((responsibility, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-gray-300">
                            <span className="mt-1.5 w-1.5 h-1.5 bg-white rounded-full flex-shrink-0"></span>
                            <span className="text-sm">{responsibility}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* GitHub Link if available */}
                  {experience.githubLink && (
                    <div>
                      <a
                        href={experience.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 border border-white/20 hover:bg-white hover:text-black text-white rounded-xl transition-all duration-300 text-sm font-medium"
                      >
                        View on GitHub →
                      </a>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <section className="h-full flex justify-center py-32">
        <div className="container w-full p-20 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-light mb-4">
            Mining for my next adventure...
          </h1>
        </div>
      </section>
    </main>
  );
};

export default ExperienceLayout;