import { Mail } from "lucide-react";
import React, { useEffect, useState } from "react";
import { FiGithub, FiLinkedin, FiX, FiInstagram, FiSun, FiMail } from "react-icons/fi";

const NAMESPACE = "portfolio-crisplettuce.vercel.app";
const KEY = "total-views";

export default function FooterBar() {
  const [views, setViews] = useState(null);

  useEffect(() => {
    fetch(`https://abacus.jasoncameron.dev/hit/${NAMESPACE}/${KEY}`)
      .then((r) => r.json())
      .then((data) => setViews(data.value))
      .catch(() => setViews(null));
  }, []);

  return (
    <footer className="sticky bottom-0 z-50 w-full border-t border-black/10 bg-transparent backdrop-blur">
      <div className="mx-auto flex h-14 max-w-[1400px] items-center justify-between px-4 font-mono text-sm text-white">
        <div className="flex min-w-0 items-center gap-4">
          <span className="truncate opacity-85">© 2026 crisplettuce</span>
          <span className="h-4 w-px bg-white" />
        </div>

        <div className="flex items-center gap-4">
          <span className="inline-flex items-center gap-2 whitespace-nowrap">
            {/* <FiSun className="opacity-70" /> */}
            {/* <span className="opacity-85 text-white ">8:37:45</span> */}
          </span>

          <span className="h-4 w-px bg-white" />
          <span className="whitespace-nowrap opacity-85">
            {views === null ? "— views" : `${views.toLocaleString()} views`}
          </span>

          <span className="h-4 w-px bg-white" />

          <div className="ml-1 flex items-center gap-2">
            <a 
              className="grid h-8 w-8 place-items-center rounded-lg text-white hover:text-pink-400 transition-colors" 
              href="https://github.com/grilled-swampert" 
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <FiGithub />
            </a>
            <a 
              className="grid h-8 w-8 place-items-center rounded-lg text-white hover:text-pink-400 transition-colors" 
              href="https://www.linkedin.com/in/swapnil-ranadive-crispy/" 
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <FiLinkedin />
            </a>
            <a 
              className="grid h-8 w-8 place-items-center rounded-lg text-white hover:text-pink-400 transition-colors" 
              href="mailto:swapnil.ranadive101@gmail.com" 
              aria-label="Email"
            >
              <FiMail />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
