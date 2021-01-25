import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SET_VAL } from "./redux/masterReducer";
import { validateCookie } from "./api/user";
import Cookies from "universal-cookie";
import PrivateRoute from "./components/routing/privateRoute";
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
import Memories from "./pages/memories";
import Notfound from "./pages/notfound";
import Profile from "./pages/profile/profile";
import Login from "./pages/public/login";

import "./styles/layout.css";
// import Ticker from "react-ticker";
const cookies = new Cookies();

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const onMount = async () => {
      dispatch(SET_VAL("isLoading", true));

      if (document.cookie.indexOf("ypostUser") !== -1) {
        let res = await validateCookie(cookies.get("ypostUser").accessToken);
        console.log(res);
        if (res) {
          dispatch(SET_VAL("auth", 1));
          dispatch(SET_VAL("isLoading", false));
        }
      } else {
        dispatch(SET_VAL("auth", -1));
      }
    };
    onMount();
  }, []);

  return (
    <div className="backgroundLayout">
      <Router>
        <Navigation />
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/about" component={About} />
          <Route exact path="/user/:id" component={Memories} />
          <Route exact path="/test" component={Test} />
          <PrivateRoute exact path="/me" component={Profile} />
          <PrivateRoute exact path="/write" component={Write} />
          <PrivateRoute exact path="/done" component={Done} />
          <PrivateRoute exact path="/letter/:id" component={Open} />
          <Route exact path="/" component={Landing} />
          <Route exact={false} component={Notfound} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
