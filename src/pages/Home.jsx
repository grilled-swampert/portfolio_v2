import React from "react";
import { Github, Linkedin, Twitter, ExternalLink } from "lucide-react";
import Navbar from "../components/Navbar";

const Home = () => {
  const projects = [
    {
      title: "Anubis",
      description: "Weighs the soul of incoming HTTP requests to help AI chatbots and other web crawlers behave.",
      tags: ["golang", "security", "ai", "ratelimit", "openapi", "proof-of-work"],
      image: "/api/placeholder/400/200",
      imageAlt: "Anubis Project Preview"
    },
    {
      title: "Abacus",
      description: "Abacus at its core is a simple counter. However, it was designed from the ground up to be scalable, secure and easy to use.",
      tags: ["golang", "api", "nextjs", "redis", "statistics"],
      image: "/api/placeholder/400/200",
      imageAlt: "Abacus Project Preview"
    }
  ];

  const themes = [
    { name: "Latte", colors: ["#dc8a78", "#ea76cb", "#8839ef", "#1e66f5"] },
    { name: "Frappe", colors: ["#ef9f76", "#f4b8e4", "#ca9ee6", "#85c1dc"] },
    { name: "Macchiato", colors: ["#f0c6c6", "#f5bde6", "#c6a0f6", "#8aadf4"] },
    { name: "Mocha", colors: ["#f38ba8", "#f5c2e7", "#cba6f7", "#89b4fa"] },
  ];

  const recentCommits = [
    { repo: "GraHms/Anubis", message: "initial commit", time: "2 weeks ago" },
    { repo: "Jason.dev/compiler/katala", message: "Katala: Merge pull request #4 from jason.dev/compiler/ka...", time: "2 weeks ago" },
    { repo: "Jason.dev/compiler/katala", message: "Katala: Add author license to GetVehicleFuelConsumpt", time: "2 weeks ago" },
  ];

  const latestPosts = [
    { title: "Achieving Deadlock-resistant Debugging", date: "Nov 26, 2025" },
    { title: "AWS CDK Credentials Part", date: "Oct 19, 2025" },
    { title: "Stop Burning CPU on Usep(<API> timeout", date: "Jul 01, 2025" },
  ];

  return (
    <div className="bg-black text-white">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-6">
        {/* Header Section */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">
            Hey! I'm <span className="text-pink-500">Jason Cameron</span>
          </h1>
          <p className="text-gray-400 mb-4">
            I'm currently working as a Senior SWE @ <span className="text-blue-400">Stripe</span>. I've written
            software that is trusted by{" "}
            <span className="text-blue-400">The United Nations</span>,{" "}
            <span className="text-blue-400">the Cloud Foundary</span>,{" "}
            <span className="text-blue-400">ARPA-E/DOE</span>,{" "}
            <span className="text-blue-400">GitHub</span>,{" "}
            <span className="text-blue-400">Xalver</span>,{" "}
            <span className="text-blue-400">FTracy</span> and many others.
          </p>
          <p className="text-gray-400 mb-6">
            Building open-source developer tools at Scale is what keeps me building.
            Currently building AI that helps articulate their ideas and share them at Scale.
          </p>
          <div className="flex gap-4 items-center">
            <a href="#" className="flex items-center gap-2 text-gray-400 hover:text-white transition">
              <Github size={20} />
              <span>Stats</span>
            </a>
            <a href="#" className="flex items-center gap-2 text-gray-400 hover:text-white transition">
              <Linkedin size={20} />
              <span>LinkedIn</span>
            </a>
            <a href="#" className="flex items-center gap-2 text-gray-400 hover:text-white transition">
              <Twitter size={20} />
              <span>X</span>
            </a>
          </div>
        </div>

        {/* Featured Projects */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <span className="text-pink-500">☆</span> Featured Projects
            </h2>
            <a href="#" className="text-pink-500 text-sm hover:underline">view all</a>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((project, idx) => (
              <div key={idx} className="bg-gray-900 rounded-lg border border-gray-800 overflow-hidden">
                <div className="bg-gray-800 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <span className="text-gray-500 text-xs ml-auto">100% ●</span>
                  </div>
                  <pre className="text-green-400 text-xs font-mono">
                    <code>{`$ cat README.md\n${project.description}`}</code>
                  </pre>
                  <div className="mt-4 flex gap-2">
                    <img src="/api/placeholder/32/32" alt="avatar" className="w-8 h-8 rounded-full" />
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className="text-gray-400 text-sm mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, i) => (
                      <span key={i} className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-xs border border-gray-700">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Themes */}
          <div className="bg-gray-900 rounded-lg border border-gray-800 p-6">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <span className="text-pink-500">☆</span> Themes
            </h3>
            <div className="space-y-4">
              {themes.map((theme, idx) => (
                <div key={idx}>
                  <div className="text-sm text-gray-400 mb-2">{theme.name}</div>
                  <div className="grid grid-cols-4 gap-2">
                    {theme.colors.map((color, i) => (
                      <div key={i} className="aspect-square rounded" style={{ backgroundColor: color }}></div>
                    ))}
                  </div>
                </div>
              ))}
              <div className="text-xs text-gray-500 mt-4">Background: #eff1f5 - off</div>
            </div>
          </div>

          {/* Let's Connect */}
          <div className="bg-gray-900 rounded-lg border border-gray-800 p-6">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <span className="text-pink-500">☆</span> Let's Connect
            </h3>
            <p className="text-gray-400 text-sm mb-4">
              I love meeting interesting people, projects and opportunities!
            </p>
            <button className="w-full bg-gray-800 hover:bg-gray-700 text-white py-2 px-4 rounded transition border border-gray-700">
              📧 Book a Chat
            </button>
          </div>

          {/* Currently Based In */}
          <div className="bg-gray-900 rounded-lg border border-gray-800 p-6 flex flex-col items-center justify-center">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <span className="text-pink-500">☆</span> Currently Based In <span className="text-red-500">📍</span>
            </h3>
            <div className="bg-black rounded-lg p-6 w-full">
              <div className="text-gray-400 text-sm mb-2">Toronto, ON</div>
            </div>
          </div>

          {/* Stats */}
          <div className="bg-gray-900 rounded-lg border border-gray-800 p-6 flex flex-col items-center justify-center">
            <div className="text-5xl font-bold text-pink-500 mb-2">743,770</div>
            <button className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-6 rounded-lg transition mb-2">
              CLAIM 🎁
            </button>
            <p className="text-gray-400 text-xs">I'm a lines of code</p>
          </div>

          {/* Recent Commits */}
          <div className="bg-gray-900 rounded-lg border border-gray-800 p-6 col-span-full lg:col-span-2">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <span className="text-pink-500">☆</span> Recent Commits
            </h3>
            <div className="space-y-3">
              {recentCommits.map((commit, idx) => (
                <div key={idx} className="flex items-start justify-between text-sm">
                  <div className="flex-1">
                    <span className="text-blue-400">{commit.repo}</span>
                    <span className="text-gray-400">: {commit.message}</span>
                  </div>
                  <span className="text-red-400 text-xs whitespace-nowrap ml-4">{commit.time}</span>
                </div>
              ))}
              <div className="mt-4 h-2 rounded-full bg-gray-800 overflow-hidden">
                <div className="h-full" style={{ 
                  background: 'linear-gradient(to right, #ef9f76 0%, #f4b8e4 25%, #ca9ee6 50%, #85c1dc 75%, #a6d189 100%)',
                  width: '100%'
                }}></div>
              </div>
            </div>
          </div>

          {/* Latest Posts */}
          <div className="bg-gray-900 rounded-lg border border-gray-800 p-6 col-span-full lg:col-span-2">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <span className="text-pink-500">☆</span> Latest Posts
            </h3>
            <div className="space-y-3">
              {latestPosts.map((post, idx) => (
                <div key={idx} className="flex items-start justify-between text-sm">
                  <span className="text-gray-300 flex-1">{post.title}</span>
                  <span className="text-gray-500 text-xs whitespace-nowrap ml-4">{post.date}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;