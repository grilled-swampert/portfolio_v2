import React from "react";
import DownButton from "../ui/DownButton";

const ExperienceLanding = () => {
  return (
    <div className="flex justify-center items-center w-full h-full bg-gradient-to-b from-green-900 to-white">
      <div
        className="relative flex justify-start flex-col align-middle items-center w-11/12 gap-10 rounded-3xl bg-gradient-to-b from-black to-gray-800 shadow-2xl"
        style={{
          height: "calc(20vh)",
          boxShadow: "0 20px 60px rgba(0, 0, 0, 0.5)",
        }}
      >
        <div
          className="bg-grid absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)
            `,
            backgroundSize: "30px 30px",
          }}
        ></div>
        <div
          className="absolute inset-0 rounded-3xl pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at center, rgba(0,0,0,0.8), rgba(128,128,128,0.2))",
            filter: "blur(80px)",
            zIndex: -1,
          }}
        ></div>

        <div className="flex justify-between items-center align-middle w-full h-full px-8 font-poppins">
            <div className="text-5xl flex justify-between items-center tracking-tighter">experiences.</div>
        </div>
      </div>
    </div>
  );
};

export default ExperienceLanding;
