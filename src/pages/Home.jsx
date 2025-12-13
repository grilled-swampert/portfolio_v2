import React from "react";
import Navbar from "../components/Navbar";
import Introduction from "../components/Introduction";
import Clickables01 from "../components/Clickables01";
import History from "../components/History";
import FooterBar from "../components/FooterBar";
import ProjectSection from "../components/ProjectSection";

const Home = () => {
  return (
    <div className=" bg-black text-white flex flex-col overflow-x-hidden">
      <Navbar />
      <main className="flex-1 min-w-5xl pt-24">
        <Introduction />
        <Clickables01 />
        <History />
        <ProjectSection />
      </main>
      <FooterBar />
    </div>
  );
};

export default Home;
