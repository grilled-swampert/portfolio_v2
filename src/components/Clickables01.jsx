import { useEffect, useState } from "react";
import RightMapCard from "./RightMapCard";

const NAMESPACE = "portfolio-crisplettuce.vercel.app";
const KEY = "total-clicks";
const BASE = "https://abacus.jasoncameron.dev";

// A per-site key for this browser
const LOCAL_KEY = `${NAMESPACE}:${KEY}:localClicks`;

export default function Clickables01() {
  const [count, setCount] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize from localStorage (persists across refresh + browser restarts)
  const [localClicks, setLocalClicks] = useState(() => {
    if (typeof window === "undefined") return 0; // safety for SSR
    const raw = window.localStorage.getItem(LOCAL_KEY);
    const n = raw ? Number(raw) : 0;
    return Number.isFinite(n) ? n : 0;
  });

  async function refresh() {
    setLoading(true);
    const res = await fetch(`${BASE}/get/${NAMESPACE}/${KEY}`);
    const data = await res.json();
    setCount(data.value);
    setLoading(false);
  }

  async function onClickCount() {
    const res = await fetch(`${BASE}/hit/${NAMESPACE}/${KEY}`);
    const data = await res.json();
    setCount(data.value);

    setLocalClicks((c) => {
      const next = c + 1;
      window.localStorage.setItem(LOCAL_KEY, String(next));
      return next;
    });
  }

  useEffect(() => {
    refresh();
  }, []);

  return (
    <div className="w-full bg-transparent px-4 sm:px-6 py-4 sm:py-6">
      {/* Responsive Grid: 1 column mobile, 2 columns tablet+ [web:21][web:25] */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 place-items-stretch">
        {/* Click Counter Card - Responsive Sizing */}
        <div className="w-full h-full min-h-[280px] sm:min-h-[320px] flex justify-center items-center">
          <div className="relative w-full h-full rounded-2xl sm:rounded-3xl bg-slate-50 border border-slate-200 shadow-lg sm:shadow-xl p-6 sm:p-8 flex flex-col justify-center items-center">
            {/* Counter Display - Responsive Typography [web:27] */}
            <div className="text-theme-400 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-wide">
              {loading
                ? "…"
                : typeof count === "number"
                ? count.toLocaleString()
                : "—"}
            </div>

            {/* Button - Responsive Sizing [web:26][web:29] */}
            <div className="mt-4 sm:mt-6">
              <button
                onClick={onClickCount}
                className="px-6 py-2.5 sm:px-10 sm:py-3 rounded-xl sm:rounded-2xl bg-theme-400 text-xl sm:text-2xl lg:text-3xl text-white font-extrabold tracking-wide sm:tracking-widest shadow-md sm:shadow-lg shadow-theme-600/50 hover:bg-theme-500 active:scale-[0.98] transition-all duration-200 w-full sm:w-auto"
              >
                CLICK ME
              </button>
            </div>

            {/* Local Counter - Responsive Text [web:27] */}
            <div className="mt-4 sm:mt-6 text-xs sm:text-xs text-slate-500 tracking-wide sm:tracking-widest">
              you&apos;ve clicked {localClicks} {localClicks === 1 ? "time" : "times"}
            </div>
          </div>
        </div>

        {/* Right Map Card - Inherits responsive grid behavior [web:21][web:30] */}
        <RightMapCard />
      </div>
    </div>
  );
}
