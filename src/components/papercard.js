import React from "react";
import "../styles/layout.css";

const PaperCard = ({ children, maxWidth = 450 }) => {
  return (
    <div className="paperCardContainer fade-in">
      <div className="paperCard" style={{ maxWidth: maxWidth }}>
        {children}
      </div>
    </div>
  );
};

export default PaperCard;
