import React, { useEffect, useState, useRef } from "react";
import { HexColorPicker } from "react-colorful";

function hexToHSL(hex) {
  let r = 0, g = 0, b = 0;
  if (hex.length === 4) {
    r = "0x" + hex[1] + hex[1];
    g = "0x" + hex[2] + hex[2];
    b = "0x" + hex[3] + hex[3];
  } else if (hex.length === 7) {
    r = "0x" + hex[1] + hex[2];
    g = "0x" + hex[3] + hex[4];
    b = "0x" + hex[5] + hex[6];
  }
  r /= 255; g /= 255; b /= 255;
  let cmin = Math.min(r, g, b), cmax = Math.max(r, g, b), delta = cmax - cmin, h = 0, s = 0, l = 0;
  if (delta === 0) h = 0;
  else if (cmax === r) h = ((g - b) / delta) % 6;
  else if (cmax === g) h = (b - r) / delta + 2;
  else h = (r - g) / delta + 4;
  h = Math.round(h * 60);
  if (h < 0) h += 360;
  l = (cmax + cmin) / 2;
  s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
  s = +(s * 100).toFixed(1);
  l = +(l * 100).toFixed(1);
  return { h, s, l };
}

export default function ThemePicker() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeHex, setActiveHex] = useState("#ec4899");
  const [lastUpdated, setLastUpdated] = useState("Never");
  const popoverRef = useRef(null);

  useEffect(() => {
    let savedHex = localStorage.getItem("app-theme-hex");
    if (!savedHex || !savedHex.startsWith("#")) {
      savedHex = "#ec4899";
    }
    const savedTime = localStorage.getItem("app-theme-updated") || "Never";
    
    setActiveHex(savedHex);
    setLastUpdated(savedTime);
    applyHex(savedHex);

    const handleClickOutside = (event) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const applyHex = (hex) => {
    const { h, s, l } = hexToHSL(hex);
    document.documentElement.style.setProperty("--color-theme-200", `hsl(${h}, ${s}%, ${Math.min(90, l + 30)}%)`);
    document.documentElement.style.setProperty("--color-theme-400", `hsl(${h}, ${s}%, ${Math.min(85, l + 12)}%)`);
    document.documentElement.style.setProperty("--color-theme-500", hex);
    document.documentElement.style.setProperty("--color-theme-600", `hsl(${h}, ${s}%, ${Math.max(10, l - 15)}%)`);
  };

  const handleColorChange = (hex) => {
    setActiveHex(hex);
    applyHex(hex);
    
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' ' + now.toLocaleDateString();
    setLastUpdated(timeString);
    
    localStorage.setItem("app-theme-hex", hex);
    localStorage.setItem("app-theme-updated", timeString);
  };

  return (
    <div className="flex items-center gap-3 pr-4 sm:pr-0 relative" ref={popoverRef}>
      <div className="hidden lg:block text-[10px] text-white/50 font-medium tracking-wide text-right leading-[1.1] mr-1 uppercase">
        Theme updated<br />
        <span className="text-white/80">{lastUpdated}</span>
      </div>
      
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="text-white text-sm font-medium tracking-wide uppercase cursor-pointer hover:text-white/80 transition-colors hidden sm:block"
      >
        Theme
      </div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border-[1.5px] border-white/60 hover:scale-110 transition-transform shadow-[0_0_12px_var(--color-theme-500)]"
        style={{ backgroundColor: activeHex }}
        aria-label="Open color picker"
      />
      
      {isOpen && (
        <div className="absolute top-full mt-6 right-0 sm:left-1/2 sm:-translate-x-1/2 z-[100] p-5 w-64 rounded-[2rem] border border-white/20 bg-black/85 backdrop-blur-3xl shadow-[0_20px_60px_rgba(0,0,0,0.8)] flex flex-col items-center">
          <div className="w-full flex justify-center">
            <HexColorPicker color={activeHex} onChange={handleColorChange} style={{ width: '100%', height: '200px' }} />
          </div>
        </div>
      )}
    </div>
  );
}
