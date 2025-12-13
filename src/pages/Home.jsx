import React from "react";
import Navbar from "../components/Navbar";
import Introduction from "../components/Introduction";
import Clickables01 from "../components/Clickables01";
import History from "../components/History";

const Home = () => {
  return (
    <div className="bg-black text-white flex flex-col overflow-x-hidden">
      <Navbar />
      <main className="flex-1 pt-24">
        <Introduction />
        <Clickables01 />
        <History />
      </main>
    </div>
  );
};

export default Home;
