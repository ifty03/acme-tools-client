import React from "react";
import Tool from "./Tool";

const Tools = () => {
  return (
    <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-7 w-11/12 mx-auto mt-16">
      <Tool />
      <Tool />
      <Tool />
      <Tool />
      <Tool />
      <Tool />
    </div>
  );
};

export default Tools;
