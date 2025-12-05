import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

const AboutPage = () => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [modelLoaded, setModelLoaded] = useState(false);

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

    // Placeholder for external model
    let model = null;

    // You can load your external 3D model here
    // Example with GLTFLoader (you'll need to import it):
    // import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
    // const loader = new GLTFLoader();
    // loader.load('/path/to/your/panda.gltf', (gltf) => {
    //   model = gltf.scene;
    //   scene.add(model);
    //   setModelLoaded(true);
    // });

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight1 = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight1.position.set(5, 5, 5);
    scene.add(directionalLight1);

    const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.3);
    directionalLight2.position.set(-5, -5, -5);
    scene.add(directionalLight2);

    camera.position.z = 5;

    let frameId;
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      
      // Rotate model if loaded
      if (model) {
        model.rotation.y += 0.008;
      }
      
      camera.position.x = mousePosition.x * 0.05;
      camera.position.y = -mousePosition.y * 0.05;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(frameId);
      renderer.dispose();
    };
  }, [mousePosition]);

  const skills = [
    { category: "Languages", items: ["Python", "JavaScript", "C++", "SQL"] },
    { category: "Frameworks", items: ["React", "ExpressJS", "Flask", "Socket.IO"] },
    { category: "Databases", items: ["PostgreSQL", "MongoDB"] },
    { category: "DevOps & Tools", items: ["Docker", "Kubernetes", "OpenShift", "Git", "Postman"] },
    { category: "Technologies", items: ["Airflow", "PySpark", "TensorFlow", "Scikit-learn"] },
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

        {/* Glowing Orbs */}
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
                {!modelLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-gray-400 text-center">
                      <div className="text-6xl mb-4">🐼</div>
                      <div className="text-sm">Load your 3D model here</div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Intro Text */}
            <div className="text-center lg:text-left max-w-md">
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                I'm a Software Development Engineer and Electronics & Computer Engineering student 
                at K.J. Somaiya College (CGPA: 9.61/10) with Honors in Data Science. I specialize 
                in building scalable systems, automating workflows, and crafting modern web applications.
              </p>
              <p className="text-base text-gray-600 leading-relaxed">
                Currently working on DevOps automation, microservices architecture, and distributed 
                systems. Passionate about competitive programming with 150+ problems solved on LeetCode.
              </p>
            </div>
          </div>

          {/* Right Column - Skills */}
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
          </div>
        </div>

        {/* Stats Section */}
        <div className="w-full px-8 pb-12 z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { number: "Mumbai, IN", label: "Open to Work", link: null },
              { number: "150+", label: "LeetCode Problems", link: "https://leetcode.com/u/grilled-swampert/" },
              { number: "Full-Stack & Deployment", label: "Development", link: null },
              { number: "MLOps", label: "Learning", link: null },
            ].map((stat, index) => (
              stat.link ? (
                <a
                  key={index}
                  href={stat.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/50 backdrop-blur-sm border border-black/10 rounded-2xl p-6 text-center hover:border-black hover:shadow-2xl transition-all duration-300 group cursor-pointer relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/0 via-orange-500/0 to-red-500/0 group-hover:from-yellow-400/10 group-hover:via-orange-500/10 group-hover:to-red-500/10 transition-all duration-500"></div>
                  <div className="relative z-10">
                    <div className="text-4xl font-bold text-black mb-2 group-hover:scale-125 transition-transform duration-300">
                      {stat.number}
                    </div>
                    <div className="text-sm text-gray-600 font-medium group-hover:text-black group-hover:font-bold transition-all duration-300">
                      {stat.label}
                    </div>
                    <div className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="text-xs font-mono text-orange-600">→ View Profile</span>
                    </div>
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full opacity-0 group-hover:opacity-20 blur-xl transition-all duration-500 group-hover:scale-150"></div>
                </a>
              ) : (
                <div
                  key={index}
                  className="bg-white/50 backdrop-blur-sm border border-black/10 rounded-2xl p-6 text-center hover:border-black/30 hover:shadow-lg transition-all duration-300 group"
                >
                  <div className="text-4xl font-bold text-black mb-2 group-hover:scale-110 transition-transform duration-300">
                    {stat.number}
                  </div>
                  <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
                </div>
              )
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