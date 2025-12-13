import React from "react";
import { FiGithub, FiLinkedin, FiX, FiInstagram, FiSun } from "react-icons/fi";

export default function FooterBar() {
  return (
    <footer className="sticky bottom-0 z-50 w-full border-t border-black/10 bg-transparent backdrop-blur">
      <div className="mx-auto flex h-14 max-w-[1400px] items-center justify-between px-4 font-mono text-sm text-slate-600">
        {/* Left */}
        <div className="flex min-w-0 items-center gap-4">
          <span className="truncate opacity-85">© 2025 Jason Cameron</span>

          <span className="h-4 w-px bg-black/20" />

          <span className="inline-flex items-center gap-2 whitespace-nowrap">
            <span className="h-2.5 w-2.5 rounded-full bg-green-500 shadow-[0_0_0_4px_rgba(34,197,94,0.18)]" />
            <span className="opacity-85">All Services Nominal</span>
          </span>
        </div>

        {/* Right */}
        <div className="flex items-center gap-4">
          <span className="inline-flex items-center gap-2 whitespace-nowrap">
            <FiSun className="opacity-70" />
            <span className="opacity-85">8:37:45</span>
          </span>

          <span className="h-4 w-px bg-black/20" />
          <span className="whitespace-nowrap opacity-85">930,994 views</span>

          <span className="h-4 w-px bg-black/20" />
          <span className="whitespace-nowrap opacity-85">fc6bce4</span>

          <div className="ml-1 flex items-center gap-2">
            <a className="grid h-8 w-8 place-items-center rounded-lg text-slate-900/60 hover:bg-black/5 hover:text-slate-900"
               href="https://github.com/" aria-label="GitHub">
              <FiGithub />
            </a>
            <a className="grid h-8 w-8 place-items-center rounded-lg text-slate-900/60 hover:bg-black/5 hover:text-slate-900"
               href="https://linkedin.com/" aria-label="LinkedIn">
              <FiLinkedin />
            </a>
            <a className="grid h-8 w-8 place-items-center rounded-lg text-slate-900/60 hover:bg-black/5 hover:text-slate-900"
               href="https://x.com/" aria-label="X">
              <FiX />
            </a>
            <a className="grid h-8 w-8 place-items-center rounded-lg text-slate-900/60 hover:bg-black/5 hover:text-slate-900"
               href="https://instagram.com/" aria-label="Instagram">
              <FiInstagram />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
