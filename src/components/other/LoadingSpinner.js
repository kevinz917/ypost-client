import React from "react";
import SpinnerImg from "../../assets/loading.svg";
import "../../styles/animation.css";

const Spinner = () => {
  return (
    <img
      src={SpinnerImg}
      className="rotate-fast spinner"
      alt="loading spinner"
    />
  );
};

export { Spinner };
