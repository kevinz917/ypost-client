import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { fetchAllFeedback } from "../api/feedback";

const Inbox = () => {
  const history = useHistory();
  const userInfo = useSelector((state) => state.state.userInfo);
  const groupInfo = useSelector((state) => state.groupReducer);

  const [fetchedLetters, setFetchedLetters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const onMount = async () => {
      if (userInfo.role !== "admin") {
        history.push("/");
      } else {
        setIsLoading(true);
        let fetchedFeedback = await fetchAllFeedback(groupInfo.groupId);
        setFetchedLetters(fetchedFeedback.data.data.feedback);
        setIsLoading(false);
      }
    };
    onMount();
  }, [userInfo]);

  return (
    <div className="paperCardContainer fade-in">
      <br />
      <div className="header2">Feedback inbox</div>
      <div className="body textMain">
        Feedback collected anonymously from your team
      </div>
      <br />
      <div style={{ width: "500px" }} />
      {isLoading ? (
        <div>Loading ... </div>
      ) : (
        <div>
          {fetchedLetters.map((letter) => {
            return (
              <div className="paperCard fade-in" key={letter._id}>
                {letter.content}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Inbox;
