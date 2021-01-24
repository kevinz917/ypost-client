import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Snowfall from "react-snowfall";
import { useSelector, useDispatch } from "react-redux";
import { SET_VAL } from "./redux/masterReducer";
import axios from "axios";

// Footer
import Footer from "./components/footer";

// Pages
import Landing from "./pages/landing";
import Write from "./pages/write";
import Done from "./pages/done";
import Demo from "./pages/demo";
import Open from "./pages/open";
import About from "./pages/about";
import Test from "./pages/test";
import { casCheck } from "./util/api";
import Memories from "./pages/memories";

import "./styles/layout.css";
// import Ticker from "react-ticker";

function App() {
  const dispatch = useDispatch();
  axios.defaults.withCredentials = true;
  const isLoading = useSelector((state) => state.state.isLoading);

  useEffect(() => {
    const onMount = async () => {
      const auth = await casCheck();
      // console.log(auth);
      if (
        !auth ||
        !auth.data.auth ||
        !auth.data.user ||
        !auth.data.user.studentId
      ) {
        dispatch(SET_VAL("auth", null));
      } else {
        dispatch(SET_VAL("auth", auth.data.user));
      }
    };
    onMount();
  }, [dispatch]);

  return (
    <div className="backgroundLayout">
      <Router>
        <Switch>
          <Route exact path="/write" component={Write} />
          <Route exact path="/demo" component={Demo} />
          <Route exact path="/done" component={Done} />
          <Route exact path="/letter/:id" component={Open} />
          <Route exact path="/about" component={About} />
          <Route exact path="/user/:id" component={Memories} />
          <Route exact path="/test" component={Test} />
          <Route exact path="/" component={Landing} />
        </Switch>
      </Router>
      {isLoading ? null : <Footer />}
    </div>
  );
}

export default App;
