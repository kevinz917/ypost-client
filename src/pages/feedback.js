import { useState } from "react";

const Feedback = () => {
  const [writtenFeedback, setWrittenFeedback] = useState("");

  const onFeedbackSubmit = () => {
    console.log("submitting feedback");
  };

  return (
    <div className="paperCardContainer">
      <div className="paperCard">
        <div className="header2">Feedback page</div>
        <div className="textMain body">Write anonymous feedback here </div>
        <br />
        <textarea
          style={{ minHeight: "100px" }}
          className="inputMain"
          placeholder="anonymous feedback"
          value={writtenFeedback}
          onChange={(e) => setWrittenFeedback(e.target.value)}
        />
        <button className="buttonMain buttonRecord" onClick={onFeedbackSubmit}>
          Submit anonymously
        </button>
      </div>
    </div>
  );
};

export default Feedback;
