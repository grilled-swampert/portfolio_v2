import React from "react";

const Introduction = () => {
  return (
    <section className="bg-transparent px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 text-left text-slate-700">
      <div className="mx-auto w-full max-w-5xl">
        {/* Title - Responsive Typography [web:11][web:13] */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-tight">
          hey! I&apos;m <span className="text-pink-400">Swap</span>
        </h1>
        <div className="text-sm sm:text-base mt-2">aka crisplettuce</div>

        {/* Body - Responsive Text Sizes [web:15][web:18] */}
        <p className="mt-6 sm:mt-8 max-w-3xl text-base sm:text-lg lg:text-xl leading-7 sm:leading-8 text-slate-600">
          I&apos;m currently working as a SWE Intern @{" "}
          <span className="text-pink-400 font-medium">CitiusCloud LLP</span>.
          <br />
          <span className="text-zinc-400">
            Backend by focus, full-stack by execution.
          </span>
          <br />
          <br />
          Seeing code I wrote actually help people at scale is what keeps me
          building. Currently building AI that helps people articulate their
          ideas and share them at scale.
        </p>

        {/* Footer links - Responsive Layout [web:16][web:17] */}
        <div className="mt-8 sm:mt-10 flex flex-col xs:flex-row flex-wrap items-start xs:items-center gap-3 sm:gap-4 text-slate-600">
          {/* Resume button - Responsive Sizing [web:20] */}

          {/* Social Icons - Responsive Spacing and Size [web:18] */}
          <div className="flex items-center gap-4 sm:gap-5 w-full xs:w-auto">
            <a
              href="https://drive.google.com/file/d/1PYeu5RQ7j1iIo1yBSMnffvjR8B-DtpG-/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-pink-400 px-5 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base font-medium text-white hover:bg-pink-500 transition-colors duration-200 w-2/6 xs:w-auto"
            >
              <svg
                className="h-4 w-4 sm:h-5 sm:w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              Resume
            </a>
            <a
              href="https://github.com/grilled-swampert"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              title="GitHub"
              className="hover:text-slate-800 transition-colors duration-200 active:scale-95"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-6 w-6 sm:h-5 sm:w-5"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12 .5C5.73.5.75 5.64.75 12c0 5.1 3.29 9.42 7.86 10.95.58.11.79-.26.79-.57v-2c-3.2.72-3.88-1.4-3.88-1.4-.52-1.36-1.27-1.72-1.27-1.72-1.04-.73.08-.72.08-.72 1.15.08 1.76 1.2 1.76 1.2 1.02 1.78 2.68 1.27 3.33.97.1-.76.4-1.27.73-1.56-2.55-.3-5.23-1.3-5.23-5.8 0-1.28.45-2.33 1.19-3.15-.12-.3-.52-1.53.11-3.18 0 0 .97-.32 3.18 1.2a10.7 10.7 0 0 1 2.9-.4c.98 0 1.96.13 2.9.4 2.2-1.52 3.17-1.2 3.17-1.2.64 1.65.24 2.88.12 3.18.74.82 1.19 1.87 1.19 3.15 0 4.51-2.68 5.5-5.24 5.79.41.36.78 1.08.78 2.18v3.23c0 .32.21.69.8.57A11.27 11.27 0 0 0 23.25 12C23.25 5.64 18.27.5 12 .5z" />
              </svg>
            </a>

            <a
              href="https://www.linkedin.com/in/swapnil-ranadive-crispy/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              title="LinkedIn"
              className="hover:text-slate-800 transition-colors duration-200 active:scale-95"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-6 w-6 sm:h-5 sm:w-5"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M20.45 20.45h-3.55v-5.56c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.44-2.13 2.94v5.66H9.37V9h3.41v1.56h.05c.48-.9 1.65-1.85 3.39-1.85 3.62 0 4.28 2.38 4.28 5.47v6.27zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z" />
              </svg>
            </a>

            <a
              href="mailto:swapnil.ranadive101@gmail.com"
              aria-label="Email"
              title="Email"
              className="hover:text-slate-800 transition-colors duration-200 active:scale-95"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-6 w-6 sm:h-5 sm:w-5"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Introduction;
