import React from "react";
import RollingPanda from "../../assets/panda-rolling.gif";
import NextButton from "../ui/NextButton";
import DownButton from "../ui/DownButton";

const HomeLayout = () => {
  return (
    <div className="flex justify-center items-center w-full h-screen bg-gradient-to-b from-gray-400 to-white">
      <div
        className="relative flex justify-start flex-col items-center w-11/12 h-full mt-36 gap-10 rounded-3xl bg-gradient-to-b from-black to-gray-800 shadow-2xl"
        style={{
          boxShadow: "0 20px 60px rgba(0, 0, 0, 0.5)",
        }}
      >
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1.5) 1px, transparent 1px),
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
        <div className="flex justify-between items-center w-full px-8 font-poppins">
          <div>
            <div className="text-5xl tracking-tighter mb-5">crisplettuce</div>
            <div className="text-2xl font-light italic">Swapnil Ranadive</div>
          </div>
          <div>
            <img
              src={RollingPanda}
              alt="Rolling Panda"
              className="w-50 h-50 object-contain rounded-full"
            />
          </div>
        </div>
        <div className="font-poppins w-full px-8 mt-4 flex flex-row justify-between">
          <div className="flex">hello</div>
          <div className="flex-1 flex flex-col justify-center items-end space-y-6">
            <nav className="text-right space-y-4">
              {[
                "Experience",
                "Project",
                "Contact",
                "Resume",
                "GitHub",
                "LinkedIn",
              ].map((item) => (
                <div
                  key={item}
                  className="text-lg text-gray-400 hover:bg-white hover:text-black transition-colors cursor-pointer relative after:content-[''] after:block after:h-0.5 after:bg-white after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-200 after:origin-left px-3 py-1 rounded"
                >
                  {item}
                </div>
              ))}
            </nav>
          </div>
        </div>
        <DownButton text="SCROLL DOWN " />
      </div>
    </div>
  );
};

export default HomeLayout;
