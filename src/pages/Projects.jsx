import React from "react";
import {
  StarIcon,
  CodeBracketIcon,
  ArrowTopRightOnSquareIcon,
} from "@heroicons/react/24/solid";
import Navbar from "../components/Navbar";
import FooterBar from "../components/FooterBar";

const projects = [
  {
    name: "Crypto Data Pipeline",
    repoLabel: "grilled-swampert / crypto-data-pipeline",
    tagline:
      "Automated ETL pipeline built for extracting, transforming, and loading cryptocurrency market data.",
    stars: 0,
    contributorsText: "grilled-swampert",
    description:
      "A scalable data engineering solution leveraging Apache Airflow and Spark for real-time cryptocurrency data processing. Features automated data extraction from multiple crypto APIs, transformation workflows, and PostgreSQL storage with Docker containerization.",
    tags: ["airflow", "apache-spark", "docker", "postgresql", "python", "etl"],
    previewImage:
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1600&auto=format&fit=crop",
    githubUrl: "https://github.com/grilled-swampert/crypto-data-pipeline",
    liveUrl: null,
    avatars: ["G"],
    private: false,
    fork: false,
    special: true,
  },
  {
    name: "Data Science Tableau Story",
    repoLabel: "grilled-swampert / data-science-tableau-story",
    tagline:
      "An interactive data visualization project built using Tableau based on Weather database.",
    stars: 0,
    contributorsText: "grilled-swampert",
    description:
      "Interactive weather analytics dashboard showcasing data visualization techniques using Tableau. Features comprehensive weather pattern analysis, trend identification, and storytelling through data-driven insights.",
    tags: ["data-visualization", "datascience", "tableau", "analytics"],
    previewImage:
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1600&auto=format&fit=crop",
    githubUrl: "https://github.com/grilled-swampert/data-science-tableau-story",
    liveUrl: null,
    avatars: ["G"],
    private: false,
    fork: false,
  },
  {
    name: "Ecommerce Microservices",
    repoLabel: "grilled-swampert / ecommerce-microservices",
    tagline:
      "A distributed microservices architecture for e-commerce operations with Kubernetes orchestration.",
    stars: 0,
    contributorsText: "grilled-swampert",
    description:
      "Microservices architecture implementing e-commerce functionalities with service mesh, container orchestration, and comprehensive monitoring using Prometheus and Grafana dashboards for observability.",
    tags: [
      "docker",
      "grafana-dashboard",
      "javascript",
      "kubernetes",
      "microservices",
      "prometheus",
      "devops",
    ],
    previewImage:
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1600&auto=format&fit=crop",
    githubUrl: "https://github.com/grilled-swampert/ecommerce-microservices",
    liveUrl: null,
    avatars: ["G"],
    private: false,
    fork: false,
  },
  {
    name: "Honors Minors Application",
    repoLabel: "grilled-swampert / honors-minors-application",
    tagline:
      "Application for streamlining the process for students enrolling in minors and honors courses.",
    stars: 0,
    contributorsText: "grilled-swampert",
    description:
      "Full-stack MERN application automating the course enrollment process for honors and minor programs, featuring student registration, course selection workflows, and administrative management with role-based access control.",
    tags: ["expressjs", "javascript", "mern-stack", "reactjs", "mongodb"],
    previewImage:
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1600&auto=format&fit=crop",
    githubUrl: "https://github.com/grilled-swampert/honors-minors-application",
    liveUrl: "https://honors-minors-application.vercel.app",
    avatars: ["G"],
    private: false,
    fork: false,
  },
  {
    name: "Credence - Fact Checking System",
    repoLabel: "grilled-swampert / MainMumbaiHacks",
    tagline:
      "Hackathon project submission for Mumbai-based coding competition.",
    stars: 0,
    contributorsText: "grilled-swampert",
    description:
      "an end-to-end AI-powered fact-checking platform that verifies user claims via multi-agent reasoning, semantic retrieval, and transparent evidence-based reports.",
    tags: ["FastAPI", "LangChain", "Groq", "ReactJS", "ELK"],
    previewImage:
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1600&auto=format&fit=crop",
    githubUrl: "https://github.com/grilled-swampert/MainMumbaiHacks",
    liveUrl: null,
    avatars: ["G"],
    private: false,
    fork: true,
    special: true,
  },
  {
    name: "MCP Coding Test Reminder",
    repoLabel: "grilled-swampert / mcp-coding-test-reminder",
    tagline:
      "A coding contest reminder system that fetches upcoming contests from multiple platforms, stores them in a local database, and syncs them to Google Calendar with automated notifications.",
    stars: 0,
    contributorsText: "grilled-swampert",
    description:
      "Automated notification system aggregating competitive programming contests from Codeforces, LeetCode, and CodeChef. Features SQLite storage, Google Calendar API integration, and intelligent reminder scheduling to help competitive programmers never miss a contest.",
    tags: [
      "google-calendar-api",
      "mcp-server",
      "python",
      "automation",
      "competitive-programming",
    ],
    previewImage:
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1600&auto=format&fit=crop",
    githubUrl: "https://github.com/grilled-swampert/mcp-coding-test-reminder",
    liveUrl: null,
    avatars: ["G"],
    private: false,
    fork: false,
  },
  {
    name: "Memory Card Game",
    repoLabel: "grilled-swampert / Memory-Card-Game",
    tagline:
      "A simple memory card game application where you have to pick up identical cards as per the symbols.",
    stars: 0,
    contributorsText: "grilled-swampert",
    description:
      "Browser-based memory matching game built with vanilla JavaScript, HTML, and CSS. Features card flipping animations, score tracking, and responsive design for an engaging cognitive training experience.",
    tags: ["css", "html", "javascript", "game"],
    previewImage:
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1600&auto=format&fit=crop",
    githubUrl: "https://github.com/grilled-swampert/Memory-Card-Game",
    liveUrl: "https://memory-card-game-p5td.vercel.app/",
    avatars: ["G"],
    private: false,
    fork: false,
  },
  {
    name: "Polyline Blender Addon",
    repoLabel: "grilled-swampert / polyline-blender-addon",
    tagline: "Blender add-on for generating and managing polylines.",
    stars: 0,
    contributorsText: "grilled-swampert",
    description:
      "Python-based Blender extension for creating, manipulating, and managing polyline geometries within the 3D viewport, streamlining workflows for architectural visualization and technical illustrations.",
    tags: ["blender-addon", "python", "3d-graphics"],
    previewImage:
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1600&auto=format&fit=crop",
    githubUrl: "https://github.com/grilled-swampert/polyline-blender-addon",
    liveUrl: null,
    avatars: ["G"],
    private: false,
    fork: false,
  },
  {
    name: "RAG Automation QA Bot",
    repoLabel: "grilled-swampert / rag-automation-qa-bot",
    tagline:
      "A Retrieval-Augmented Generation (RAG) system that answers questions by retrieving relevant context from a document store and generating accurate responses using an LLM.",
    stars: 0,
    contributorsText: "grilled-swampert",
    description:
      "AI-powered question-answering system combining vector search with large language models for product recommendations. Implements semantic search over document embeddings and context-aware response generation for accurate, grounded answers.",
    tags: ["Python", "rag", "llm", "nlp", "vector-search"],
    previewImage:
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1600&auto=format&fit=crop",
    githubUrl: "https://github.com/grilled-swampert/rag-automation-qa-bot",
    liveUrl: null,
    avatars: ["G"],
    private: false,
    fork: false,
  },
  {
    name: "Reverse Proxy Implementation",
    repoLabel: "grilled-swampert / reverse_proxy_implementation",
    tagline:
      "Custom reverse proxy server implementation for load balancing and traffic management.",
    stars: 0,
    contributorsText: "grilled-swampert",
    description:
      "Backend infrastructure project implementing a reverse proxy server from scratch, demonstrating understanding of network protocols, request forwarding, and load distribution patterns.",
    tags: ["networking", "reverse-proxy", "c++"],
    previewImage:
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1600&auto=format&fit=crop",
    githubUrl:
      "https://github.com/grilled-swampert/reverse_proxy_implementation",
    liveUrl: null,
    avatars: ["G"],
    private: true,
    fork: false,
  },
  {
    name: "Slate Board",
    repoLabel: "grilled-swampert / slate-board",
    tagline:
      "A real-time collaborative whiteboard application that allows multiple users to draw, write, and collaborate together in shared rooms.",
    stars: 0,
    contributorsText: "grilled-swampert",
    description:
      "WebSocket-based collaborative drawing platform enabling real-time multi-user interaction.",
    tags: [
      "socket-io",
      "tailwindcss",
      "typescript",
      "real-time",
      "collaboration",
    ],
    previewImage:
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1600&auto=format&fit=crop",
    githubUrl: "https://github.com/grilled-swampert/slate-board",
    liveUrl: "https://slate-board-sigma.vercel.app",
    avatars: ["G"],
    private: false,
    fork: false,
  },
];

const Tag = ({ children }) => (
  <span className="rounded-md bg-theme-200 px-2 py-1 text-xs font-medium text-slate-700 ring-1 ring-slate-200">
    {children}
  </span>
);

const WindowDots = () => (
  <div className="flex items-center gap-2">
    <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
    <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
    <span className="h-2.5 w-2.5 rounded-full bg-emerald-300" />
  </div>
);

const Avatar = ({ label }) => (
  <div className="grid h-9 w-9 place-items-center rounded-full bg-slate-600 text-xs font-semibold text-white ring-2 ring-slate-800">
    {label}
  </div>
);

const ProjectLinks = ({ githubUrl, liveUrl }) => {
  if (!githubUrl && !liveUrl) return null;

  return (
    <div className="mt-4 flex flex-wrap gap-2">
      {githubUrl && (
        <a
          href={githubUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-3 py-2 text-xs font-semibold text-white hover:bg-slate-800"
        >
          <CodeBracketIcon className="h-4 w-4" />
          GitHub
        </a>
      )}

      {liveUrl && (
        <a
          href={liveUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-lg bg-white px-3 py-2 text-xs font-semibold text-slate-900 ring-1 ring-slate-200 hover:bg-slate-50"
        >
          <ArrowTopRightOnSquareIcon className="h-4 w-4" />
          Live
        </a>
      )}
    </div>
  );
};

const ProjectCard = ({ p }) => {
  return (
    <div
      className={`overflow-hidden rounded-2xl shadow-sm ring-1 ring-slate-200 ${
        p.special ? "bg-theme-200" : "bg-white"
      }`}
    >
      {" "}
      {/* Bottom details */}
      <div className="px-6 py-5">
        <h3 className="text-lg font-semibold text-slate-900">{p.name}</h3>

        <p className="mt-2 text-sm leading-relaxed text-slate-600">
          {p.description}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {p.tags.map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </div>

        {/* NEW: links */}
        <ProjectLinks githubUrl={p.githubUrl} liveUrl={p.liveUrl} />
      </div>
    </div>
  );
};

const ProjectSection = () => {
  return (
    <div className=" bg-black text-white flex flex-col overflow-x-hidden">
      <Navbar />
      <section className="bg-transparent pt-24">
        <div className="mx-auto w-full max-w-4xl px-4">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-semibold text-zinc-200">Projects</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {projects.map((p) => (
              <ProjectCard key={p.name} p={p} />
            ))}
          </div>
        </div>
      </section>
      <FooterBar />
    </div>
  );
};

export default ProjectSection;
