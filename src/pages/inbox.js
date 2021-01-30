import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { fetchAllFeedback, removeFeedback } from "../api/feedback";
import { Spinner } from "../components/other/LoadingSpinner";
import { Button, Modal } from "react-bootstrap";

const Inbox = () => {
  const history = useHistory();
  const userInfo = useSelector((state) => state.state.userInfo);
  const groupInfo = useSelector((state) => state.groupReducer);

  const [show, setShow] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState(null);

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
  }, []);

  // const selectRemove = (email) => {
  //   setSelectedEmail(email);
  //   setShow(true);
  // };

  // const confirmRemove = async () => {
  //   setShow(false);
  //   await removeFeedback(selectedFeedback);
  // };

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
        <Spinner />
      ) : (
        <div className="paperCard fade-in">
          {fetchedLetters.map((letter) => {
            return (
              <>
                <div
                  key={letter._id}
                  className="w-100 d-flex flex-row justify-content-between"
                >
                  <div>{letter.content}</div>
                  <div class="float-right deleteMarker">✖️</div>
                </div>
                <hr />
              </>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Inbox;

// <Modal show={show} onHide={handleClose}>
//   <Modal.Header closeButton>
//     <Modal.Title>Remove member</Modal.Title>
//   </Modal.Header>
//   <Modal.Body>Are you sure you want to remove this member?</Modal.Body>
//   <Modal.Footer>
//     <Button variant="secondary" onClick={() => setShow(false)}>
//       Close
//     </Button>
//     <Button
//       variant="primary"
//       onClick={async () => confirmRemove()}
//       style={{ color: "white" }}
//     >
//       Remove member
//     </Button>
//   </Modal.Footer>
// </Modal>;
