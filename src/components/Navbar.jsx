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
  const mobileMenuRef = useRef(null);
  const hamburgerRef = useRef(null);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Projects", path: "/projects" },
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

  // GSAP matchMedia for responsive animations [web:10]
  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Desktop animations (768px and above) [web:6]
      mm.add("(min-width: 768px)", () => {
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
      });

      // Mobile animations (below 768px)
      mm.add("(max-width: 767px)", () => {
        gsap.from(navRef.current, {
          y: -50,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
        });
      });
    }, navRef);

    return () => ctx.revert();
  }, []);

  // Mobile menu animation [web:1][web:2]
  useEffect(() => {
    if (!mobileMenuRef.current) return;

    if (isMobileMenuOpen) {
      gsap.to(mobileMenuRef.current, {
        height: "auto",
        opacity: 1,
        duration: 0.4,
        ease: "power2.out",
      });

      gsap.from(navItemsRef.current, {
        opacity: 0,
        x: -20,
        duration: 0.3,
        stagger: 0.08,
        ease: "power2.out",
      });
    } else {
      gsap.to(mobileMenuRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
      });
    }
  }, [isMobileMenuOpen]);

  const handleNavItemHover = (e) => {
    gsap.to(e.currentTarget, {
      y: -2,
      color: "#EC407A",
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

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleMobileLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-transparent"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        {/* Desktop and Mobile Header [web:3] */}
        <div className="flex items-center justify-between">
          {/* Logo with Tooltip */}
          <div className="relative group flex flex-col justify-center items-center">
            <a
              href="#home"
              className="text-lg sm:text-xl font-semibold text-white tracking-tight no-underline"
              aria-describedby="logo-tooltip"
            >
              {logoWord}
            </a>

            {/* Tooltip - hidden on mobile [web:9] */}
            <div
              id="logo-tooltip"
              role="tooltip"
              className="
                pointer-events-none absolute left-1/2 top-full z-50 mt-2 
                w-64 sm:w-72 -translate-x-1/2
                origin-top scale-0 opacity-0
                rounded-md bg-black/80 px-3 py-2 text-xs text-white
                shadow-lg ring-1 ring-white/10 backdrop-blur
                transition-all duration-150
                hidden sm:group-hover:scale-100 sm:group-hover:opacity-100 sm:block
              "
            >
              {logoTooltip}
            </div>

            <div
              className="
                pointer-events-none absolute left-1/2 top-full z-50 mt-1 
                h-2 w-2 -translate-x-1/2 rotate-45
                scale-0 bg-black/80 ring-1 ring-white/10 transition-all duration-150
                hidden sm:group-hover:scale-100 sm:block
              "
            />
          </div>

          {/* Desktop Navigation - hidden on mobile [web:6] */}
          <div className="hidden md:flex items-center gap-8 lg:gap-12">
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

          {/* Hamburger Button - visible only on mobile [web:1][web:2] */}
          <button
            ref={hamburgerRef}
            onClick={toggleMobileMenu}
            className="md:hidden flex flex-col justify-center items-center w-8 h-8 focus:outline-none"
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            <span
              className={`bg-white block h-0.5 w-6 rounded-sm transition-all duration-300 ease-out ${
                isMobileMenuOpen ? "rotate-45 translate-y-1.5" : "-translate-y-1"
              }`}
            ></span>
            <span
              className={`bg-white block h-0.5 w-6 rounded-sm my-1 transition-all duration-300 ease-out ${
                isMobileMenuOpen ? "opacity-0" : "opacity-100"
              }`}
            ></span>
            <span
              className={`bg-white block h-0.5 w-6 rounded-sm transition-all duration-300 ease-out ${
                isMobileMenuOpen ? "-rotate-45 -translate-y-1.5" : "translate-y-1"
              }`}
            ></span>
          </button>
        </div>

        {/* Mobile Menu [web:1][web:2] */}
        <div
          ref={mobileMenuRef}
          className="md:hidden overflow-hidden h-0 opacity-0"
        >
          <div className="pt-4 pb-2 space-y-1">
            {navItems.map((item, index) => (
              <a
                key={index}
                href={item.path}
                ref={(el) => (navItemsRef.current[index] = el)}
                onClick={handleMobileLinkClick}
                className="block px-4 py-3 text-white text-base font-medium tracking-wide uppercase hover:bg-white/10 rounded-md transition-colors"
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
