import React, { useEffect } from "react";
import "../styles/layout.css";

const PaperCard = React.forwardRef(
  ({ children, maxWidth = 500, frameImage }, ref) => {
    useEffect(() => {
      console.log(frameImage);
    }, [frameImage]);

    return (
      <div className="paperCardContainer fade-in">
        <div ref={ref} className="paperCard" style={{ maxWidth: maxWidth }}>
          <div
            style={{
              backgroundImage: "url(" + `${frameImage}` + ")",
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              padding: "20px",
              borderRadius: "8px",
            }}
          >
            <div style={{ background: "white" }}>{children}</div>
          </div>
        </div>
      </div>
    );
  }
);

export default PaperCard;

// `url${frameImage}`
