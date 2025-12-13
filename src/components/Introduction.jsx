import React from "react";

const Introduction = () => {
  return (
    <section className="bg-transparent px-6 py-2 text-left text-slate-700">
      <div className="mx-auto w-full max-w-5xl">
        {/* Title */}
        <h1 className="text-4xl font-semibold tracking-tight sm:text-6xl">
          hey! I&apos;m <span className="text-pink-400">Swap</span>
        </h1>
        <div className="text-base mt-2">aka crisplettuce</div>

        {/* Body */}
        <p className="mt-8 max-w-3xl text-lg leading-8 text-slate-600 sm:text-xl">
          I&apos;m currently working as a SWE Intern @{" "}
          <span className="text-pink-400">CitiusCloud LLP</span>.
          <br />
          <span className="text-zinc-400">Backend by focus, full-stack by execution.</span>.
          {/* <a
            href="#"
            className="text-pink-400 underline decoration-pink-300 underline-offset-4 hover:text-pink-500"
          >
            The United Nations
          </a>
          ,{" "}
          <a
            href="#"
            className="text-pink-400 underline decoration-pink-300 underline-offset-4 hover:text-pink-500"
          >
            The Linux Foundation
          </a>
          ,{" "}
          <a
            href="#"
            className="text-pink-400 underline decoration-pink-300 underline-offset-4 hover:text-pink-500"
          >
            Arch Linux
          </a>
          ,{" "}
          <a
            href="#"
            className="text-pink-400 underline decoration-pink-300 underline-offset-4 hover:text-pink-500"
          >
            GNOME
          </a>
          ,{" "}
          <a
            href="#"
            className="text-pink-400 underline decoration-pink-300 underline-offset-4 hover:text-pink-500"
          >
            Valve
          </a>
          ,{" "}
          <a
            href="#"
            className="text-pink-400 underline decoration-pink-300 underline-offset-4 hover:text-pink-500"
          >
            FFmpeg
          </a>{" "}
          and many others. */}
          <br />
          <br />
          Seeing code I wrote actually help people at scale is what keeps me
          building. Currently building AI that helps people articulate their
          ideas and share them at scale.
        </p>

        {/* Footer links */}
        <div className="mt-10 flex flex-wrap items-center gap-4 text-slate-600">
          {/* Resume button (first) */}
          <a
            href="#"
            className="inline-flex items-center gap-2 rounded-md bg-pink-400 px-4 py-2 text-sm font-medium text-white hover:bg-pink-500"
          >
            Resume
          </a>

          {/* Icon links */}
          <a
            href="#"
            aria-label="GitHub"
            title="GitHub"
            className="hover:text-slate-800"
          >
            {/* GitHub icon */}
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M12 .5C5.73.5.75 5.64.75 12c0 5.1 3.29 9.42 7.86 10.95.58.11.79-.26.79-.57v-2c-3.2.72-3.88-1.4-3.88-1.4-.52-1.36-1.27-1.72-1.27-1.72-1.04-.73.08-.72.08-.72 1.15.08 1.76 1.2 1.76 1.2 1.02 1.78 2.68 1.27 3.33.97.1-.76.4-1.27.73-1.56-2.55-.3-5.23-1.3-5.23-5.8 0-1.28.45-2.33 1.19-3.15-.12-.3-.52-1.53.11-3.18 0 0 .97-.32 3.18 1.2a10.7 10.7 0 0 1 2.9-.4c.98 0 1.96.13 2.9.4 2.2-1.52 3.17-1.2 3.17-1.2.64 1.65.24 2.88.12 3.18.74.82 1.19 1.87 1.19 3.15 0 4.51-2.68 5.5-5.24 5.79.41.36.78 1.08.78 2.18v3.23c0 .32.21.69.8.57A11.27 11.27 0 0 0 23.25 12C23.25 5.64 18.27.5 12 .5z" />
            </svg>
          </a>

          <a
            href="#"
            aria-label="LinkedIn"
            title="LinkedIn"
            className="hover:text-slate-800"
          >
            {/* LinkedIn icon */}
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M20.45 20.45h-3.55v-5.56c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.44-2.13 2.94v5.66H9.37V9h3.41v1.56h.05c.48-.9 1.65-1.85 3.39-1.85 3.62 0 4.28 2.38 4.28 5.47v6.27zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z" />
            </svg>
          </a>

          <a href="#" aria-label="X" title="X" className="hover:text-slate-800">
            {/* X icon */}
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M18.9 2H22l-6.77 7.73L23.2 22h-6.3l-4.94-6.84L5.98 22H2.9l7.25-8.3L.8 2h6.46l4.47 6.3L18.9 2zm-1.1 18h1.75L6.2 3.9H4.37L17.8 20z" />
            </svg>
          </a>

          <a
            href="#"
            aria-label="More about me"
            title="More about me"
            className="hover:text-slate-800"
          >
            {/* Arrow icon */}
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M13.5 5l7 7-7 7-1.4-1.4 4.6-4.6H3v-2h13.7l-4.6-4.6L13.5 5z" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Introduction;
