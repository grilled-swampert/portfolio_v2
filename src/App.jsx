import React from "react";
import Navbar from "./components/layout/Navbar";
import { BrowserRouter } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <div className="h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 text-white text-4xl">
        <Navbar />

      </div>
    </BrowserRouter>
  );
};

export default App;
