import React from "react";
import {
  StarIcon,
  CodeBracketIcon,
  ArrowTopRightOnSquareIcon,
} from "@heroicons/react/24/solid";

const projects = [
  {
    name: "Anubis",
    repoLabel: "TecharoHQ / anubis",
    tagline: "Weighs the soul of incoming HTTP requests to stop AI crawlers",
    stars: 14732,
    contributorsText: "146 Contributors",
    description:
      "Weighs the soul of incoming HTTP requests using proof-of-work and stop AI crawlers and other malicious bots.",
    tags: ["golang", "security", "ai", "anti-bot", "defense", "proof-of-work"],

    // NEW
    previewImage:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1600&auto=format&fit=crop",
    githubUrl: "https://github.com/TecharoHQ/anubis",
    liveUrl: null,
    avatars: ["A", "B", "C", "D"],
  },
  {
    name: "Abacus",
    repoLabel: "jasonlovesdoggo / abacus",
    tagline: ":abacus: A highly-scalable and stateless counting API",
    stars: 25,
    contributorsText: "JasonLovesDoggo",
    description:
      "Abacus at its core is a simple counter. However, it was designed from the ground up to be scalable, secure and easy...",
    tags: ["golang", "gin", "docker", "redis", "analytics"],

    // NEW
    previewImage:
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1600&auto=format&fit=crop",
    githubUrl: "https://github.com/jasonlovesdoggo/abacus",
    liveUrl: "https://example.com",
    avatars: ["J"],
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
        <div className="aspect-video w-full overflow-hidden">
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
        </div>

        {/* Dark overlay content */}
        <div className="absolute inset-0 px-6 py-5 text-slate-200">
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
        </div>
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
