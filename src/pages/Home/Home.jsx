import React from "react";
import Slider from "./Slider/Slider";
import Card from "./Card";
import Newcard from "./Newcard";
import Tezkunda from "../Tezkunda";
import Trailer from "../Trailer";

function Home() {
  return (
    <div className=" flex flex-col justify-center">
      {/* <Slider /> */}
      <Tezkunda />
      <Trailer />
      <Newcard />
      <Card />
    </div>
  );
}

export default Home;
