import React, { useEffect, useState } from "react";
import { ButtonGroup, ToggleButton } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { fetchCount } from "../util/api";
import { SET_VAL } from "../redux/masterReducer";
import { Link } from "react-router-dom";
import Select from "react-select";
import { sendAmplitudeData } from "../util/amplitude";
import { fetchMembers } from "../api/group";
import { fetchAllCards } from "../api/user";
import MemoryLetter from "../components/memoryLetter";

import "../styles/color.css";
import "../styles/layout.css";
import "../styles/typography.css";
import "../styles/animation.css";
import Hero from "../assets/hero.png";

const Landing = () => {
  const dispatch = useDispatch();
  const stateVal = useSelector((state) => state.state);
  const groupVal = useSelector((state) => state.groupReducer);
  const [isLoading, setIsLoading] = useState(false);

  const [radioValue, setRadioValue] = useState("1");

  const radios = [
    { name: "Sent", value: "1" },
    { name: "Received", value: "2" },
  ];

  // on mount
  useEffect(() => {
    const onMount = async () => {
      setIsLoading(true);
      sendAmplitudeData("Visited home page");

      // fetch students in same group
      if (stateVal.auth && stateVal.studentList.length < 2) {
        let userList = await fetchMembers(groupVal.groupId);
        dispatch(SET_VAL("studentList", userList));
      }

      await fetchAllCards();

      if (stateVal.letterCount === null) {
        const letterCount = await fetchCount();
        dispatch(SET_VAL("letterCount", letterCount.data.count));
      }
      setIsLoading(false);
    };

    if (stateVal.auth === 1) {
      onMount();
    }
  }, []);

  // input change for async select
  const onInputChange = (e) => {
    dispatch(SET_VAL("email", e ? e.value : ""));
    dispatch(SET_VAL("selectedStudent", e ? e.label : ""));
  };

  return isLoading === 0 ? null : (
    <div className="paperCardContainer fade-in">
      <div className="paperCard">
        <div className="d-flex flex-row align-items-center">
          <div>
            <img
              src={Hero}
              style={{ width: "70px", height: "auto" }}
              alt="hero"
              className="mr-3"
            />
          </div>
          <div>
            <div className="d-flex flex-column header2 textMain">
              Send a note
            </div>
            <div className="body textMain">
              Send delightful cards to show gratitude
            </div>
          </div>
        </div>
        <hr />
        {stateVal.auth !== -1 && (
          <React.Fragment>
            <Select
              options={stateVal.studentList}
              placeholder="Type in recipient name"
              autoFocus
              onChange={onInputChange}
              isClearable={true}
              value={
                stateVal.email
                  ? {
                      value: stateVal.email,
                      label: stateVal.selectedStudent,
                    }
                  : null
              }
            />
            <Link to="/write" className="link">
              <button className="buttonMain buttonPrimary">
                <div>Send a note</div>
              </button>
            </Link>
          </React.Fragment>
        )}
        {stateVal.auth === -1 ? (
          <Link to="/login" className="link">
            <button className="buttonMain buttonRecord">Log in here</button>
          </Link>
        ) : null}
      </div>
      {stateVal.auth === 1 ? (
        <div className="paperCardContainer fade-in">
          <br />
          <div className="header2 textMain">Your cards</div>
          <ButtonGroup toggle style={{ width: "100%" }}>
            {radios.map((radio, idx) => (
              <ToggleButton
                key={idx}
                type="radio"
                variant="outline-secondary"
                name="radio"
                value={radio.value}
                checked={radioValue === radio.value}
                onChange={(e) => setRadioValue(e.currentTarget.value)}
              >
                {radio.name}
              </ToggleButton>
            ))}
          </ButtonGroup>
          {isLoading ? (
            <div className="w-100 d-flex flex-row justify-content-center">
              <br />
              Loading letters ...
            </div>
          ) : radioValue === "1" ? (
            <React.Fragment>
              {stateVal.userInfo.sentCards.length > 0 ? (
                <div>
                  {stateVal.userInfo.sentCards.map((card) => (
                    <MemoryLetter letterContent={card} />
                  ))}
                </div>
              ) : null}
            </React.Fragment>
          ) : radioValue === "2" ? (
            <React.Fragment>
              {stateVal.userInfo.receivedCards.length > 0 ? (
                <div>
                  {stateVal.userInfo.receivedCards.map((card) => (
                    <MemoryLetter letterContent={card} />
                  ))}
                </div>
              ) : null}
            </React.Fragment>
          ) : null}
        </div>
      ) : null}
    </div>
  );
};

export default Landing;

// {stateVal.auth === 1 ? (
//   <Link to="/feedback" className="link">
//     <div className="paperCard">
//       <div className="header3 textMain">Share your thoughts →</div>
//       <div className="textMain body">
//         speak up and share feedback anonymously to your lead
//       </div>
//     </div>
//   </Link>
// ) : null}

// <div className="paperCard">
//   <div className="w-100 d-flex flex-column align-items-center">
//     <img src={Hero} style={{ width: "90%", height: "auto" }} alt="hero" />
//   </div>
//   <hr />
//   <div className="header2 textMain">YPost 📬 </div>
//   <br />
//   <div className="body textMain">
//     Send simple and delightful cards to your teammates. Show your gratitude and
//     build a better team, together ~
//   </div>
//   <br />
//   <div className={styles.letter_cnt_container + " body textMain fade-in"}>
//     {stateVal.letterCount === null ? (
//       <span className={styles.letter_cnt_label}>Loading...</span>
//     ) : (
//       <div className="fade-in">
//         <span className={styles.letter_cnt_label}>total notes sent: </span>
//         <span className={styles.letter_cnt_val}>{stateVal.letterCount}</span>
//       </div>
//     )}
//   </div>
//   <br />
//   {stateVal.auth !== -1 && (
//     <React.Fragment>
//       <Select
//         options={stateVal.studentList}
//         placeholder="Type in recipient name"
//         autoFocus
//         onChange={onInputChange}
//         isClearable={true}
//         value={
//           stateVal.email
//             ? {
//                 value: stateVal.email,
//                 label: stateVal.selectedStudent,
//               }
//             : null
//         }
//       />
//       <Link to="/write" className="link">
//         <button className="buttonMain buttonPrimary">
//           <div>Send a note</div>
//         </button>
//       </Link>
//       <Link to={`/user/${stateVal.userInfo.userId}`} className="link">
//         <button className="buttonMain buttonSecondary">
//           <div>View your cards </div>
//         </button>
//       </Link>
//     </React.Fragment>
//   )}
//   {stateVal.auth === -1 ? (
//     <Link to="/login" className="link">
//       <button className="buttonMain buttonRecord">Log in here</button>
//     </Link>
//   ) : null}
// </div>;
