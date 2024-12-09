import React from "react";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Animation from "../pages/Home/Slider/Slider";

function Rotlayout() {
  return (
    <div>
      <Animation />
      <Outlet />
      <Footer />
    </div>
  );
}

export default Rotlayout;
