import React, { useRef, useEffect, useMemo, useState } from "react";
import { gsap } from "gsap";

// Random word (needs key) [web:1]
const RANDOM_WORD_URL = "https://api.api-ninjas.com/v1/randomword";
const API_NINJAS_KEY = import.meta?.env?.VITE_API_NINJAS_KEY;

// Definitions (no key) [web:12]
const DICT_BASE = "https://api.dictionaryapi.dev/api/v2/entries/en/";

function dayKeyUTC() {
  const d = new Date();
  return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}-${String(
    d.getUTCDate()
  ).padStart(2, "0")}`;
}

async function getRandomWord() {
  if (!API_NINJAS_KEY)
    throw new Error("API Ninjas key not set in env variables.");
  const res = await fetch(RANDOM_WORD_URL, {
    headers: { "X-Api-Key": API_NINJAS_KEY },
  });
  console.log(res);
  if (!res.ok) throw new Error(`RandomWord API failed: ${res.status}`);
  const data = await res.json();
  return data.word;
}

async function getDefinition(word) {
  const res = await fetch(DICT_BASE + encodeURIComponent(word));
  if (!res.ok) throw new Error(`Dictionary API failed: ${res.status}`);
  const data = await res.json();

  const meaning0 = data?.[0]?.meanings?.[0];
  const def0 = meaning0?.definitions?.[0]?.definition;

  return {
    partOfSpeech: meaning0?.partOfSpeech ?? "",
    definition: def0 ?? "No definition found.",
  };
}

const Navbar = () => {
  const navRef = useRef(null);
  const navItemsRef = useRef([]);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Projects", path: "/projects" },
    { name: "Blog", path: "/blog" },
    { name: "Contact", path: "/contact" },
  ];

  // --- Word-of-the-day state ---
  const storageKey = useMemo(() => `logoWord:${dayKeyUTC()}`, []);
  const [logoWord, setLogoWord] = useState("Loading...");
  const [logoTooltip, setLogoTooltip] = useState("Loading meaning...");

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const cached = localStorage.getItem(storageKey);

        // If cached for today, reuse it; else fetch & store
        const word = cached || (await getRandomWord());
        if (!cached) localStorage.setItem(storageKey, word);

        const { partOfSpeech, definition } = await getDefinition(word);

        if (!cancelled) {
          setLogoWord(word);
          setLogoTooltip(
            `${partOfSpeech ? `(${partOfSpeech}) ` : ""}${definition}`
          );
        }
      } catch (err) {
        console.error(err);
        if (!cancelled) {
          setLogoWord("Error");
          setLogoTooltip("Could not load meaning.");
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [storageKey]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(navRef.current, {
        y: -100,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      gsap.from(navItemsRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.6,
        stagger: 0.1,
        ease: "back.out(1.7)",
        delay: 0.3,
      });
    }, navRef);

    return () => ctx.revert();
  }, []);

  const handleNavItemHover = (e) => {
    gsap.to(e.currentTarget, {
      y: -2,
      color: "#FE7743",
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleNavItemLeave = (e) => {
    gsap.to(e.currentTarget, {
      y: 0,
      color: "#FFFFFF",
      duration: 0.3,
      ease: "power2.out",
    });
  };

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-transparent"
      >
        <div className="max-w-4xl mx-auto px-8 py-6 flex items-center justify-between">
          <div className="relative group justify-center items-center flex flex-col">
            <a
              href="#home"
              className="text-xl font-semibold text-white tracking-tight no-underline"
              aria-describedby="logo-tooltip"
            >
              {logoWord}
            </a>

            {/* Tooltip bubble */}
            <div
              id="logo-tooltip"
              role="tooltip"
              className="
      pointer-events-none absolute left-1/2 top-full z-50 mt-2 w-72 -translate-x-1/2
      origin-top scale-0 opacity-0
      rounded-md bg-black/80 px-3 py-2 text-xs text-white
      shadow-lg ring-1 ring-white/10 backdrop-blur
      transition-all duration-150
      group-hover:scale-100 group-hover:opacity-100
    "
            >
              {logoTooltip}
            </div>

            {/* Tooltip arrow */}
            <div
              className="
      pointer-events-none absolute left-1/2 top-full z-50 mt-1 h-2 w-2 -translate-x-1/2 rotate-45
      scale-0 bg-black/80 ring-1 ring-white/10 transition-all duration-150
      group-hover:scale-100
    "
            />
          </div>

          <div className="flex items-center gap-12">
            {navItems.map((item, index) => (
              <a
                key={index}
                href={item.path}
                ref={(el) => (navItemsRef.current[index] = el)}
                onMouseEnter={handleNavItemHover}
                onMouseLeave={handleNavItemLeave}
                className="text-white text-sm font-medium tracking-wide no-underline cursor-pointer transition-colors uppercase"
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
