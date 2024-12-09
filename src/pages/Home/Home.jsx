import React from "react";
import Slider from "./Slider/Slider";
import Card from "./Card";
import Newcard from "./Newcard";

function Home() {
  return (
    <div className=" flex flex-col justify-center">
      {/* <Slider /> */}
      <Newcard />
      <Card />
    </div>
  );
}

export default Home;
