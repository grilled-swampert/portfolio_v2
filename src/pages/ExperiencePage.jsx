import React from "react";
import Navbar from "../components/layout/Navbar";
import ExperienceLanding from "../components/experience/ExperienceLanding";
import ContactLayout from "../components/layout/ContactLayout";

const ExperiencePage = () => {
  return (
    <div className="w-full h-full bg-slate-200">
      <Navbar />
      <section className="min-h-fit w-full ">
        <ExperienceLanding />
      </section>
      <section className="h-screen w-full">
        <ContactLayout />
      </section>
    </div>
  );
};

export default ExperiencePage;
