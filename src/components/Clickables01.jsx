import { useEffect, useState } from "react";
import RightMapCard from "./RightMapCard";

const NAMESPACE = "portfolio-crisplettuce.vercel.app";
const KEY = "total-clicks";
const BASE = "https://abacus.jasoncameron.dev";

// Change these to your location
const LAT = 18.5204; // Pune
const LNG = 73.8567;

// bbox = minLon,minLat,maxLon,maxLat  (roughly ~2-3km view; adjust delta if needed)
const DELTA = 0.02;
const OSM_EMBED = `https://www.openstreetmap.org/export/embed.html?bbox=${LNG - DELTA}%2C${LAT - DELTA}%2C${LNG + DELTA}%2C${LAT + DELTA}&layer=mapnik&marker=${LAT}%2C${LNG}`;

export default function Clickables01() {
  const [count, setCount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [localClicks, setLocalClicks] = useState(0);

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
    setLocalClicks((c) => c + 1);
  }

  useEffect(() => {
    refresh();
  }, []);

  return (
    <div className="w-full bg-transparent p-6">
      <div className="grid grid-cols-2 gap-6 place-items-center">
        {/* LEFT COLUMN */}
        <div className="w-full h-full flex justify-center items-center">
          <div className="relative w-[340px] h-full rounded-3xl bg-slate-50 border border-slate-200 shadow-xl p-8 text-center justify-center items-center">
            <div className="text-pink-400 text-5xl font-extrabold tracking-wide">
              {loading
                ? "…"
                : typeof count === "number"
                  ? count.toLocaleString()
                  : "—"}
            </div>

            <div className="mt-6">
              <button
                onClick={onClickCount}
                className="px-10 py-3 rounded-2xl bg-pink-400 text-3xl text-white font-extrabold tracking-widest shadow-lg shadow-pink-600 hover:bg-pink-500 active:scale-[0.99] transition"
              >
                CLICK ME
              </button>
            </div>

            <div className="mt-6 text-xs text-slate-500 tracking-widest">
              you&apos;ve clicked {localClicks} times
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Situated at + map */}
        <RightMapCard />
      </div>
    </div>
  );
}
