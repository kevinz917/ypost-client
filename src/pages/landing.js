import React, { useEffect, useState } from "react";
import { ButtonGroup, ToggleButton, Button, Dropdown } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { fetchCount } from "../util/api";
import { SET_VAL } from "../redux/masterReducer";
import { Link } from "react-router-dom";
import Select from "react-select";
import { sendAmplitudeData } from "../util/amplitude";
import { fetchMembers, fetchPublicPosts } from "../api/group";
import { fetchAllCards } from "../api/user";
import MemoryLetter from "../components/memoryLetter";

import Hero from "../assets/hero.png";
import "../styles/color.css";
import "../styles/layout.css";
import "../styles/typography.css";
import "../styles/animation.css";
import "../styles/custom.scss";

const Landing = () => {
  const dispatch = useDispatch();
  const stateVal = useSelector((state) => state.state);
  const groupVal = useSelector((state) => state.groupReducer);
  const [isLoading, setIsLoading] = useState(false);

  const [radioValue, setRadioValue] = useState("1");

  const radios = { 1: "For me", 2: "From me", 3: "Public cards" };

  // on mount
  useEffect(() => {
    const onMount = async () => {
      sendAmplitudeData("Visited home page");

      // fetch students in same group
      if (stateVal.auth && stateVal.studentList.length < 2) {
        let userList = await fetchMembers(groupVal.groupId);
        dispatch(SET_VAL("studentList", userList));
      }

      setIsLoading(true);
      if (
        stateVal.userInfo.sentCards.length > 0 ||
        stateVal.userInfo.sentCards.length > 0
      ) {
        setIsLoading(false);
      }
      await fetchAllCards();
      await fetchPublicPosts(groupVal.groupId);

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
        <br />
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
              <button className="buttonMain buttonPrimary">Send a note</button>
            </Link>
          </React.Fragment>
        )}
        {stateVal.auth === -1 ? (
          <Link to="/login" className="link">
            <button className="buttonMain buttonPrimary">Log in here</button>
          </Link>
        ) : null}
      </div>
      <div style={{ height: "10px" }} />
      {stateVal.auth === 1 ? (
        <div className="paperCardContainer fade-in">
          <br />
          <div className="d-flex flex-row justify-content-between w-100 s">
            <div className="header2 textMain">Your cards</div>
            <Dropdown>
              <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                {radios[radioValue]}
              </Dropdown.Toggle>
              <Dropdown.Menu variant="secondary">
                {Object.keys(radios).map((selection) => (
                  <Dropdown.Item
                    onSelect={() => setRadioValue(`${selection}`)}
                    variant="secondary"
                  >
                    {radios[selection]}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </div>
          {isLoading ? (
            <div className="w-100 d-flex flex-row justify-content-center">
              <br />
              Loading letters ...
            </div>
          ) : radioValue === "1" ? (
            <React.Fragment>
              {stateVal.userInfo.receivedCards.map((card) => (
                <MemoryLetter letterContent={card} />
              ))}
            </React.Fragment>
          ) : radioValue === "2" ? (
            <React.Fragment>
              {stateVal.userInfo.sentCards.map((card) => (
                <MemoryLetter letterContent={card} />
              ))}
            </React.Fragment>
          ) : radioValue === "3" ? (
            <React.Fragment>
              {groupVal.cards.map((card) => (
                <MemoryLetter letterContent={card} status={"public"} />
              ))}
            </React.Fragment>
          ) : null}
        </div>
      ) : null}
    </div>
  );
};

export default Landing;

// <ButtonGroup toggle style={{ width: "100%" }}>
//   {radios.map((radio, idx) => (
//     <ToggleButton
//       key={idx}
//       type="radio"
//       name="radio"
//       variant="outline-secondary"
//       value={radio.value}
//       checked={radioValue === radio.value}
//       onChange={(e) => setRadioValue(e.currentTarget.value)}
//     >
//       {radio.name}
//     </ToggleButton>
//   ))}
// </ButtonGroup>;

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
