import { useState } from "react";
import { addFeedback } from "../api/feedback";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

const Feedback = () => {
  let history = useHistory();

  const [writtenFeedback, setWrittenFeedback] = useState("");
  const stateVal = useSelector((state) => state.state);
  const groupVal = useSelector((state) => state.groupReducer);

  const onFeedbackSubmit = async () => {
    const newFeedback = {
      userId: stateVal.userInfo.userId,
      content: writtenFeedback,
      groupId: groupVal.groupId,
    };

    await addFeedback(newFeedback);
    toast.success("Feedback submitted");
    history.push("/");
  };

  return (
    <div className="paperCardContainer fade-in">
      <div className="paperCard">
        <div className="header2">Feedback</div>
        <div className="textMain body">Share anything anonymously </div>
        <br />
        <textarea
          style={{ minHeight: "100px" }}
          className="inputMain"
          placeholder="I feel that ..."
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
