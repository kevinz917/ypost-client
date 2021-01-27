import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllFeedback } from "../api/feedback";

const Inbox = () => {
  const history = useHistory();
  const userInfo = useSelector((state) => state.state.userInfo);
  const groupInfo = useSelector((state) => state.groupReducer);

  const [fetchedLetters, setFetchedLetters] = useState([]);

  useEffect(() => {
    const onMount = async () => {
      if (userInfo.role !== "admin") {
        history.push("/");
      } else {
        let fetchedFeedback = await fetchAllFeedback(groupInfo.groupId);
        setFetchedLetters(fetchedFeedback.data.data.feedback);
      }
    };
    onMount();
  }, [userInfo]);

  return (
    <div className="paperCardContainer fade-in">
      <div className="header2">Feedback inbox</div>
      <div style={{ width: "500px" }} />
      {fetchedLetters.map((letter) => {
        return (
          <div className="paperCard" key={letter._id}>
            {letter.content}
          </div>
        );
      })}
    </div>
  );
};

export default Inbox;
