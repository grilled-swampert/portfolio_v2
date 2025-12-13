import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const workData = [
  {
    id: "dbs",
    range: "Jul 2023 - Present",
    org: "DBS Bank",
    role: "Graduate Associate (SEED Programme)",
    logoUrl:
      "https://upload.wikimedia.org/wikipedia/en/thumb/6/63/DBS_Bank_logo.svg/256px-DBS_Bank_logo.svg.png",
    bullets: [
      "Developed the Java backend for a bank account servicing process with multiple channel integrations using Activiti workflow",
      "Built a custom database migration tool using Python and MariaDB and facilitated the migration of 1000+ processes from a vendor platform",
    ],
  },
  {
    id: "sit",
    range: "Apr 2023 - Jun 2023",
    org: "Singapore Institute of Technology",
    role: "Software Developer (Contract)",
    logoUrl:
      "https://upload.wikimedia.org/wikipedia/en/thumb/7/7b/Singapore_Institute_of_Technology_logo.svg/256px-Singapore_Institute_of_Technology_logo.svg.png",
    bullets: [
      "Built NFTVue, an NFT gallery website that allows students to connect their crypto wallets to view and verify their school event-issued NFTs",
    ],
  },
  {
    id: "dbs",
    range: "Jul 2023 - Present",
    org: "DBS Bank",
    role: "Graduate Associate (SEED Programme)",
    logoUrl:
      "https://upload.wikimedia.org/wikipedia/en/thumb/6/63/DBS_Bank_logo.svg/256px-DBS_Bank_logo.svg.png",
    bullets: [
      "Developed the Java backend for a bank account servicing process with multiple channel integrations using Activiti workflow",
      "Built a custom database migration tool using Python and MariaDB and facilitated the migration of 1000+ processes from a vendor platform",
    ],
  },
  {
    id: "sit",
    range: "Apr 2023 - Jun 2023",
    org: "Singapore Institute of Technology",
    role: "Software Developer (Contract)",
    logoUrl:
      "https://upload.wikimedia.org/wikipedia/en/thumb/7/7b/Singapore_Institute_of_Technology_logo.svg/256px-Singapore_Institute_of_Technology_logo.svg.png",
    bullets: [
      "Built NFTVue, an NFT gallery website that allows students to connect their crypto wallets to view and verify their school event-issued NFTs",
    ],
  },
];

const eduData = [
  {
    id: "edu1",
    range: "2022 - 2026",
    org: "KJ Somaiya College of Engineering",
    role: "B.Tech in Electronics and Computer Engineering",
    logoUrl: "https://via.placeholder.com/80",
    cgpa: "9.61 / 10",
    bullets: ["Pursuing a Honors in Data Science and Analytics (CGPA: 9.00 / 10)", ],
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
          className="h-full w-full object-cover"
        />
      </div>

      {/* card */}
      <div className="rounded-xl bg-slate-900/60 p-4 ring-1 ring-white/10">
        <div className="text-xs text-slate-300">{item.range}</div>
        <div className="mt-1 text-lg font-extrabold text-white">{item.org}</div>
        <div className="text-sm text-slate-300">{item.role}</div>

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
    <div className="mx-auto w-full max-w-3xl rounded-2xl bg-zinc-950 p-4 sm:p-6">
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
