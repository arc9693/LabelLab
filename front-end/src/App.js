import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Home from "./components/Home/Home"

function App() {
  return (
    <Router>
      <div>
      <nav class="navbar navbar-light bg-dark">
        <Link to="/" className="navbar-brand text-light">LabelLab</Link>
      </nav>
        <Route exact path="/" component={Home} />
      </div>
    </Router>
  );
}

export default App;
