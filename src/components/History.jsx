import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import CitiusCloudLogo from "../assets/citiuscloud.png";
import FosseeLogo from "../assets/fossee.png";
import SomaiyaLogo from "../assets/somaiya.png";

const workData = [
  {
    id: "citiuscloud",
    range: "May 2025 - Present",
    org: "CitiusCloud Services LLP",
    role: "Software Development Engineer",
    logoUrl: CitiusCloudLogo,
    bullets: [
      "Automated OpenShift CI/CD using Postman, k6, and Cypress to cut manual regression effort by 80% and standardize release quality gates.",
      "Refactored legacy backend components by extracting business logic into microservices to improve maintainability, enable independent deployments, and increase code reuse across services.",
      "Improved production readiness by adding DevSecOps + observability (Trivy, SonarQube, Prometheus, Grafana) to catch vulnerabilities earlier and speed up incident detection and recovery (lower MTTR).",
    ],
  },
  {
    id: "fossee",
    range: "Mar 2024 - Jun 2024",
    org: "FOSSEE, IIT Bombay",
    role: "Software Development Fellow",
    logoUrl: FosseeLogo,
    bullets: [
      "Automated CAD polyline modeling using a Python Blender add-on to programmatically generate and manipulate geometry for workflow optimization.",
    ],
  },
];

const eduData = [
  {
    id: "edu1",
    range: "2022 - 2026",
    org: "KJ Somaiya College of Engineering",
    role: "B.Tech in Electronics and Computer Engineering",
    logoUrl: SomaiyaLogo,
    cgpa: "9.61 / 10",
    bullets: [
      "Pursuing a Honors in Data Science and Analytics (CGPA: 9.00 / 10)",
      "Finalist at Mumbai Hacks 2025, Pune AgriTech Hackathon 2024 and Smart India Hackathon 2024",
      "Operations Member & Literature Head at E-CESA KJSCE, the official ECE student body",
    ],
  },
];

function SegmentedTabs({ tab, setTab }) {
  return (
    <div className="w-full rounded-xl bg-black text-white p-1">
      <div className="grid grid-cols-2 gap-1">
        <button
          type="button"
          onClick={() => setTab("work")}
          className={[
            "rounded-lg px-4 py-2 text-sm font-semibold transition",
            tab === "work"
              ? "bg-white text-black shadow ring-1 ring-white/10"
              : "text-gray-500 hover:bg-slate-900/40",
          ].join(" ")}
        >
          Work
        </button>
        <button
          type="button"
          onClick={() => setTab("education")}
          className={[
            "rounded-lg px-4 py-2 text-sm font-semibold transition",
            tab === "education"
              ? "bg-white text-black shadow ring-1 ring-white/10"
              : "text-gray-500 hover:bg-slate-900/40",
          ].join(" ")}
        >
          Education
        </button>
      </div>
    </div>
  );
}

function TimelineItem({ item, isLast }) {
  return (
    <li className="relative pl-14">
      {/* vertical line */}
      {!isLast && (
        <span className="absolute left-6 top-12 h-[calc(100%-1.25rem)] w-px bg-white/10" />
      )}

      {/* dot */}
      <span className="absolute left-[22px] top-9 h-2.5 w-2.5 rounded-full bg-white shadow-[0_0_0_4px_rgba(255,255,255,0.08)]" />

      {/* logo */}
      <div className="absolute left-0 top-5 h-12 w-12 overflow-hidden rounded-full bg-slate-900 ring-1 ring-white/10">
        <img
          src={item.logoUrl}
          alt={`${item.org} logo`}
          className="h-full w-full object-contain object-center"
        />
      </div>

      {/* card */}
      {/* card */}
      <div className="rounded-xl bg-slate-900/60 p-4 ring-1 ring-white/10">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="text-xs text-slate-300">{item.range}</div>
            <div className="mt-1 text-lg font-extrabold text-white">
              {item.org}
            </div>
            <div className="text-sm text-slate-300">{item.role}</div>
          </div>

          {item.cgpa && (
            <span className="shrink-0 rounded-lg bg-white/10 px-3 py-1 text-xs font-semibold text-white ring-1 ring-white/10">
              CGPA: {item.cgpa}
            </span>
          )}
        </div>

        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-slate-100/90">
          {item.bullets.map((b, idx) => (
            <li key={idx}>{b}</li>
          ))}
        </ul>
      </div>
    </li>
  );
}

export default function History() {
  const [tab, setTab] = useState("work");
  const data = tab === "work" ? workData : eduData;

  return (
    <div className="mx-auto w-full max-w-4xl rounded-2xl bg-zinc-950 p-4 sm:p-6">
      <SegmentedTabs tab={tab} setTab={setTab} />

      <AnimatePresence mode="wait">
        <motion.ul
          key={tab}
          className="mt-5 space-y-5"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
        >
          {data.map((item, idx) => (
            <TimelineItem
              key={item.id}
              item={item}
              isLast={idx === data.length - 1}
            />
          ))}
        </motion.ul>
      </AnimatePresence>
    </div>
  );
}
