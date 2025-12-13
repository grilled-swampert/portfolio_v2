import React from "react";
import {
  StarIcon,
  CodeBracketIcon,
  ArrowTopRightOnSquareIcon,
} from "@heroicons/react/24/solid";

const projects = [
  {
    "name": "Ecommerce Microservices",
    "repoLabel": "grilled-swampert / ecommerce-microservices",
    "tagline": "A distributed microservices architecture for e-commerce operations with Kubernetes orchestration.",
    "stars": 0,
    "contributorsText": "grilled-swampert",
    "description": "A distributed microservices architecture for e-commerce operations with Kubernetes orchestration.",
    "tags": [
      "docker",
      "grafana-dashboard",
      "javascript",
      "kuberenetes",
      "microservices",
      "prometheus"
    ],
    "previewImage": "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1600&auto=format&fit=crop",
    "githubUrl": "https://github.com/grilled-swampert/ecommerce-microservices",
    "liveUrl": null,
    "avatars": [
      "G"
    ],
    "private": false,
    "fork": false
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
];

const Tag = ({ children }) => (
  <span className="rounded-md bg-pink-200 px-2 py-1 text-xs font-medium text-slate-700 ring-1 ring-slate-200">
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
    <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
      {/* Top preview (image allowed) */}
      <div className="relative bg-slate-900">
        {/* Keep a stable ratio like the screenshot */}
        {/* <div className="aspect-video w-full overflow-hidden">
          {p.previewImage ? (
            <img
              src={p.previewImage}
              alt={`${p.name} preview`}
              loading="lazy"
              className="h-full w-full object-cover opacity-60"
            />
          ) : (
            <div className="h-full w-full bg-slate-900" />
          )}
        </div> */}

        {/* Dark overlay content */}
        {/* <div className="absolute inset-0 px-6 py-5 text-slate-200">
          <div className="flex items-start justify-between">
            <WindowDots />
          </div>

          <div className="mt-4 font-mono text-sm">
            <div className="text-fuchsia-300">{p.repoLabel}</div>
            <div className="mt-2 text-slate-50">{p.tagline}</div>
          </div>

          <div className="mt-6 flex items-end justify-between">
            <div className="flex -space-x-2">
              {(p.avatars || []).slice(0, 4).map((a) => (
                <Avatar key={a} label={a} />
              ))}
            </div>
            <div className="text-xs text-slate-200/70">{p.contributorsText}</div>
          </div>
        </div> */}
      </div>

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
    <section className="bg-transparent pt-12">
      <div className="mx-auto w-full max-w-4xl px-4">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-semibold text-zinc-200">
              Featured Projects
            </h2>
          </div>

          <a
            href="/projects"
            className="text-sm font-medium text-pink-400 hover:text-pink-200"
          >
            View all →
          </a>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {projects.map((p) => (
            <ProjectCard key={p.name} p={p} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectSection;
