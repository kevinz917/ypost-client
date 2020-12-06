import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Footer
import Footer from "./components/footer";

// Pages
import Landing from "./pages/landing";
import Write from "./pages/write";
import Done from "./pages/done";
import Demo from "./pages/demo";

function App() {
  return (
    <div className="backgroundColor backgroundLayout">
      <Router>
        <Switch>
          <Route path="/demo" component={Demo} />
          <Route path="/done" component={Done} />
          <Route path="/write" component={Write} />
          <Route path="/" component={Landing} />
        </Switch>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
