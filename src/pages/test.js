import React, { useState, useEffect } from "react";
import PaperCard from "../components/papercard";
import { Base } from "../util/base";
import { casCheck } from "../util/api";

const Test = () => {
  const [logged_in, setLoggedIn] = useState("");
  useEffect(() => {
    const onMount = async () => {
      const auth = await casCheck();
      // console.log(auth);
      if (!auth || !auth.data.auth || !auth.data.user) {
        setLoggedIn("");
      } else {
        setLoggedIn(auth.data.user.netId);
      }
    };
    onMount();
  }, []);
  return (
    <PaperCard>
      {logged_in !== "" ? (
        <div>{logged_in} logged in</div>
      ) : (
        <button
          className="buttonMain buttonRecord"
          onClick={() => {
            window.location.href = `${Base}/auth/cas`;
          }}
        >
          Login with CAS
        </button>
      )}
    </PaperCard>
  );
};

export default Test;
