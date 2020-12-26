import React from "react";
import "../styles/layout.css";

const PaperCard = React.forwardRef(({ children, maxWidth = 450 }, ref) => {
  return (
    <div className="paperCardContainer fade-in">
      <div ref={ref} className="paperCard" style={{ maxWidth: maxWidth }}>
        {children}
      </div>
    </div>
  );
});

export default PaperCard;
