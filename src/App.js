import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import { SET_VAL } from "./redux/masterReducer";
import { validateCookie, fetchUserInfo } from "./api/user";
// import Cookies from "universal-cookie";
import { ToastContainer, Slide } from "react-toastify";
import PrivateRoute from "./components/routing/privateRoute";
import Navigation from "./components/nav/navigation";
import Help from "./components/help/help";
// import { QueryClient, QueryClientProvider } from "react-query";

import "./styles/layout.css";
import "react-toastify/dist/ReactToastify.css";

// pages
// import Memories from "./pages/memories";
import Landing from "./pages/landing";
import Write from "./pages/write/write";
import Done from "./pages/done";
import Open from "./pages/open";
import About from "./pages/about";
import Notfound from "./pages/public/notfound";
import Profile from "./pages/profile/profile";
import Login from "./pages/public/login";
import Feedback from "./pages/feedback";
import Inbox from "./pages/inbox";
import Wall from "./pages/wall";
import Test from "./pages/test";

function App() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const onMount = async () => {
      setIsLoading(true);

      if (document.cookie.indexOf("ypostUser") !== -1) {
        let res = await validateCookie();

        if (res) {
          dispatch(SET_VAL("auth", 1));
          await fetchUserInfo();
        }
      } else {
        dispatch(SET_VAL("auth", -1));
      }
      setIsLoading(false);
    };
    onMount();
  }, [dispatch]);

  return (
    <div className="backgroundLayout">
      {isLoading ? null : (
        <Router>
          <Navigation />
          <Switch>
            <PrivateRoute exact path="/feedback" component={Feedback} />
            <PrivateRoute exact path="/me" component={Profile} />
            <PrivateRoute exact path="/write" component={Write} />
            <PrivateRoute exact path="/done" component={Done} />
            <PrivateRoute exact path="/letter/:id" component={Open} />
            <PrivateRoute exact path="/wall" component={Wall} />
            <Route exact path="/inbox" component={Inbox} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/about" component={About} />
            <Route exact path="/" component={Landing} />
            <Route exact path="/test" component={Test} />
            <Route exact={false} component={Notfound} />
          </Switch>
          <ToastContainer
            transition={Slide}
            autoClose={2000}
            hideProgressBar={true}
          />
        </Router>
      )}
      <Help />
    </div>
  );
}

// <PrivateRoute exact path="/user/:id" component={Memories} />

export default App;
