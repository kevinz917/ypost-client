import React, { useEffect } from "react";
import "../styles/layout.css";

const PaperCard = React.forwardRef(
  ({ children, maxWidth = 500, frameImage }, ref) => {
    return (
      <div className="paperCardContainer fade-in">
        <div
          ref={ref}
          className="paperCard"
          style={{
            maxWidth: maxWidth,
            backgroundImage: "url(" + `${frameImage}` + ")",
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div>
            <div
              style={{
                background: "white",
                padding: "12px",
                borderRadius: "4px",
              }}
            >
              {children}
            </div>
          </div>
        </div>
      </div>
    );
  }
);

export default PaperCard;
