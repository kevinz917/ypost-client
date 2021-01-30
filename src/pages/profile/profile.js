import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { logout } from "../../api/user";
import { Button, Modal } from "react-bootstrap";
import { removeMember, fetchMembers } from "../../api/group";

import "./profile.css";

const Profile = (props) => {
  const stateVal = useSelector((state) => state.state);
  const groupVal = useSelector((state) => state.groupReducer);
  const [show, setShow] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    const onMount = async () => {
      await fetchMembers();
    };

    onMount();
  }, []);

  const logOut = async () => {
    await logout();
    props.history.push("/");
  };

  const selectRemove = (email) => {
    setSelectedEmail(email);
    setShow(true);
  };

  const confirmRemove = async () => {
    setShow(false);
    await removeMember(selectedEmail);
    await fetchMembers();
  };

  return (
    <div className="profile-container fade-in">
      <div className="header2">My profile</div>
      <br />
      <div className="textMain body">Group ID: {groupVal.groupId}</div>
      <div className="textMain body">Role: {stateVal.userInfo.role}</div>
      <br />
      <Button onClick={logOut} style={{ color: "white" }}>
        Logout
      </Button>
      <br />
      <br />
      {stateVal.userInfo.role === "admin" ? (
        <div>
          <div className="header2">Members</div>
          <br />
          {stateVal.studentList.map((student) => (
            <div key={student.value}>
              {student.label}
              <span
                className="deleteMarker"
                onClick={() => selectRemove(student.value)}
              >
                ✖️
              </span>
            </div>
          ))}
        </div>
      ) : null}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Remove member</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to remove this member?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={async () => confirmRemove()}
            style={{ color: "white" }}
          >
            Remove member
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Profile;
