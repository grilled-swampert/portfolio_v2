import React from "react";
import HomeLayout from "../components/layout/HomeLayout";
import ExperienceLayout from "../components/layout/ExperienceLayout";
import ProjectsLayout from "../components/layout/ProjectsLayout";
import ContactLayout from "../components/layout/ContactLayout";
import Navbar from "../components/layout/Navbar";
import AboutPage from "./AboutPage";

const HomePage = () => {
  return (
    <div className="w-full h-full bg-slate-200">
      <Navbar />
      <section className="h-screen w-full">
        <HomeLayout />
      </section>
      <AboutPage />
      <ExperienceLayout />
      <ProjectsLayout />
      <section className="h-screen w-full">
        <ContactLayout />
      </section>
    </div>
  );
};

export default HomePage;
