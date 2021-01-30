import React from "react";
import SpinnerImg from "../../assets/loading.svg";
import "../../styles/animation.css";

const Spinner = () => {
  return (
    <div className="w-100 d-flex flex-row justify-content-center">
      <img
        src={SpinnerImg}
        className="rotate-fast spinner mt-4"
        alt="loading spinner"
      />
    </div>
  );
};

export { Spinner };
