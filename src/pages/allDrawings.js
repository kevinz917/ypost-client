import React, { useEffect, useState } from "react";
import CanvasDraw from "react-canvas-draw";
import canvas_styles from "../pages/write.module.css";
import MemoryLetter from "../components/memoryLetter";
let allCards = require("../util/allCards.json");
allCards = allCards.filter((card) => card.drawing);
import Drawing from "../components/drawing";

const AllDrawings = () => {
  return (
    <div style={{ padding: "30px" }}>
      <div>All drawings</div>
    </div>
  );
};

export default AllDrawings;

// <div>
// {allCards.map((card) => {
//   return <Drawing letterContent={card} />;
// })}
// </div>
