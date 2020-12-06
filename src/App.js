import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Pages
import Landing from "./pages/landing";
import Write from "./pages/write";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/write" component={Write} />
        <Route path="/" component={Landing} />
      </Switch>
    </Router>
  );
}

export default App;
