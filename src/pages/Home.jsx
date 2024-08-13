import React from "react";
import Navbar from "../components/Navbar";
import Announcements from "../components/Announcements";
import Slider from "../components/Slider";

const Home = () => {
  return (
    <div>
      <Announcements />
      <Navbar />
      <Slider />
    </div>
  );
};

export default Home;
