import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Home from "./components/Home"

function App() {
  return (
    <Router>
      <div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
      </ul>
        <Route exact path="/" component={Home} />
      </div>
    </Router>
  );
}

export default App;
