import React from "react";
import Navbar from "../components/layout/Navbar";
import ExperienceLanding from "../components/experience/ExperienceLanding";

const ExperiencePage = () => {
  return (
    <div className="w-full h-full bg-slate-200">
      <Navbar />
      <section className="h-screen w-full">
        <ExperienceLanding />
      </section>
    </div>
  );
};

export default ExperiencePage;
