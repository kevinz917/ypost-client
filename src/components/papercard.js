import React from "react";
import "../styles/layout.css";

const PaperCard = ({ children }) => {
  return (
    <div className="paperCardContainer fade-in">
      <div className="paperCard">{children}</div>
    </div>
  );
};

export default PaperCard;
