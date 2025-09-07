import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ExperiencePage from "./pages/ExperiencePage";
import ProjectsPage from "./pages/ProjectsPage";

const App = () => {
  return (
    <BrowserRouter>
      <div className="h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 text-white text-4xl">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/experience" element={<ExperiencePage />} />
          <Route path="/projects" element={<ProjectsPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
