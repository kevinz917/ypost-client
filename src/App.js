import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import { SET_VAL } from "./redux/masterReducer";
import axios from "axios";

// footer + nav
// import Footer from "./components/footer";
import Navigation from "./components/nav/navigation";

// pages
import Landing from "./pages/landing";
import Write from "./pages/write";
import Done from "./pages/done";
import Open from "./pages/open";
import About from "./pages/about";
import Test from "./pages/test";
import { casCheck } from "./util/api";
import Memories from "./pages/memories";
import Notfound from "./pages/notfound";

import "./styles/layout.css";
// import Ticker from "react-ticker";

function App() {
  const dispatch = useDispatch();
  axios.defaults.withCredentials = true;
  // const isLoading = useSelector((state) => state.state.isLoading);

  useEffect(() => {
    const onMount = async () => {
      const auth = await casCheck();
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
        <Navigation />
        <Switch>
          <Route exact path="/write" component={Write} />
          <Route exact path="/done" component={Done} />
          <Route exact path="/letter/:id" component={Open} />
          <Route exact path="/about" component={About} />
          <Route exact path="/user/:id" component={Memories} />
          <Route exact path="/test" component={Test} />
          <Route exact path="/" component={Landing} />
          <Route exact={false} component={Notfound} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
