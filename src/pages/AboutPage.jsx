import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

const AboutPage = () => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 10,
        y: (e.clientY / window.innerHeight - 0.5) * 10,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
    });

    const containerWidth = 400;
    const containerHeight = 400;
    renderer.setSize(containerWidth, containerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    // Create torus knot geometry
    const geometry = new THREE.TorusKnotGeometry(1.5, 0.5, 128, 32);
    const material = new THREE.MeshStandardMaterial({
      color: 0x000000,
      metalness: 0.7,
      roughness: 0.2,
      wireframe: false,
    });
    const torusKnot = new THREE.Mesh(geometry, material);
    scene.add(torusKnot);

    // Add edges for wireframe effect
    const edges = new THREE.EdgesGeometry(geometry);
    const lineMaterial = new THREE.LineBasicMaterial({ color: 0x333333, linewidth: 1 });
    const wireframe = new THREE.LineSegments(edges, lineMaterial);
    torusKnot.add(wireframe);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight1 = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight1.position.set(5, 5, 5);
    scene.add(directionalLight1);

    const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.3);
    directionalLight2.position.set(-5, -5, -5);
    scene.add(directionalLight2);

    camera.position.z = 6;

    let frameId;
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      
      torusKnot.rotation.x += 0.005;
      torusKnot.rotation.y += 0.005;
      
      camera.position.x = mousePosition.x * 0.05;
      camera.position.y = -mousePosition.y * 0.05;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(frameId);
      geometry.dispose();
      material.dispose();
      lineMaterial.dispose();
      renderer.dispose();
    };
  }, [mousePosition]);

  const skills = [
    { category: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "GSAP"] },
    { category: "Backend", items: ["Node.js", "Express", "MongoDB", "PostgreSQL"] },
    { category: "Tools", items: ["Git", "Figma", "VS Code", "Docker"] },
  ];

  const timeline = [
    { year: "2024", title: "Current Position", description: "Building amazing projects" },
    { year: "2023", title: "Previous Role", description: "Developed key features" },
    { year: "2022", title: "Started Journey", description: "Began coding adventure" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-zinc-600 to-black overflow-hidden">
      <div
        ref={containerRef}
        className="relative flex justify-start flex-col items-center w-11/12 mx-auto my-20 gap-12 rounded-3xl overflow-hidden"
        style={{
          minHeight: "calc(90vh)",
          background: "linear-gradient(135deg, #ffffff 0%, #f5f5f5 50%, #fafafa 100%)",
          boxShadow: "0 25px 80px rgba(0, 0, 0, 0.1), 0 0 100px rgba(0, 0, 0, 0.05)",
          border: "1px solid rgba(0, 0, 0, 0.05)",
        }}
      >
        {/* Animated Grid Background */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 0, 0, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 0, 0, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        ></div>

        {/* Glowing Orbs - Dark themed for white background */}
        <div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(0, 0, 0, 0.05) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        ></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(0, 0, 0, 0.03) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        ></div>

        {/* Parallax Dots */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            transform: `translate(${-mousePosition.x}px, ${-mousePosition.y}px)`,
            transition: "transform 0.3s ease-out",
          }}
        >
          <div className="absolute top-20 left-20 w-2 h-2 bg-black rounded-full opacity-20"></div>
          <div className="absolute top-40 right-32 w-3 h-3 bg-gray-800 rounded-full opacity-15"></div>
          <div className="absolute bottom-32 left-40 w-2 h-2 bg-black rounded-full opacity-25"></div>
        </div>

        {/* Header */}
        <div className="flex flex-col items-center w-full px-8 mt-12 z-10">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-black tracking-tight mb-4">
            About Me
          </h1>
          <div className="h-1 w-24 bg-black rounded-full"></div>
        </div>

        {/* Main Content - Two Columns */}
        <div className="w-full px-8 flex flex-col lg:flex-row gap-12 lg:gap-16 z-10">
          {/* Left Column - 3D Model and Intro */}
          <div className="flex-1 flex flex-col items-center gap-8">
            {/* 3D Model Container */}
            <div className="relative w-full max-w-md">
              <div className="absolute inset-0 bg-black rounded-3xl blur-2xl opacity-5"></div>
              <div className="relative bg-white/50 backdrop-blur-sm border-2 border-black/10 rounded-3xl p-8 flex justify-center items-center"
                style={{ boxShadow: "0 10px 40px rgba(0, 0, 0, 0.1)" }}>
                <canvas ref={canvasRef} className="w-full h-full" />
              </div>
            </div>

            {/* Intro Text */}
            <div className="text-center lg:text-left max-w-md">
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                I'm a passionate developer and designer who loves creating beautiful, 
                functional digital experiences. With a keen eye for detail and a drive 
                for innovation, I turn ideas into reality.
              </p>
              <p className="text-base text-gray-600 leading-relaxed">
                Currently focused on building modern web applications with cutting-edge 
                technologies and best practices.
              </p>
            </div>
          </div>

          {/* Right Column - Skills and Timeline */}
          <div className="flex-1 flex flex-col gap-10">
            {/* Skills Section */}
            <div>
              <h2 className="text-3xl font-bold text-black mb-6">Skills & Technologies</h2>
              <div className="space-y-6">
                {skills.map((skillGroup) => (
                  <div key={skillGroup.category} className="group">
                    <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center gap-2">
                      <span className="w-2 h-2 bg-black rounded-full"></span>
                      {skillGroup.category}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {skillGroup.items.map((skill) => (
                        <span
                          key={skill}
                          className="px-4 py-2 bg-black/5 border border-black/10 rounded-xl text-gray-700 text-sm font-medium hover:bg-black hover:text-white transition-all duration-300 cursor-default"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Timeline Section */}
            <div>
              <h2 className="text-3xl font-bold text-black mb-6">Journey</h2>
              <div className="space-y-6 relative pl-8 border-l-2 border-black/20">
                {timeline.map((item, index) => (
                  <div key={index} className="relative group">
                    <div className="absolute -left-10 top-0 w-4 h-4 bg-black rounded-full border-4 border-white group-hover:scale-125 transition-transform duration-300"></div>
                    <div className="bg-white/50 backdrop-blur-sm border border-black/10 rounded-2xl p-6 hover:border-black/30 hover:shadow-lg transition-all duration-300">
                      <div className="text-sm font-mono text-gray-500 mb-2">{item.year}</div>
                      <h3 className="text-xl font-bold text-black mb-2">{item.title}</h3>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="w-full px-8 pb-12 z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { number: "50+", label: "Projects Completed" },
              { number: "3+", label: "Years Experience" },
              { number: "100%", label: "Client Satisfaction" },
              { number: "∞", label: "Coffee Consumed" },
            ].map((stat, index) => (
              <div
                key={index}
                className="bg-white/50 backdrop-blur-sm border border-black/10 rounded-2xl p-6 text-center hover:border-black/30 hover:shadow-lg transition-all duration-300 group"
              >
                <div className="text-4xl font-bold text-black mb-2 group-hover:scale-110 transition-transform duration-300">
                  {stat.number}
                </div>
                <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Gradient */}
        <div
          className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
          style={{
            background: "linear-gradient(to top, rgba(255,255,255,0.3), transparent)",
          }}
        ></div>
      </div>
    </div>
  );
};

export default AboutPage;