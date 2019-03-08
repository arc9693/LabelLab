import React from "react";
import { BrowserRouter as Router, Route, Link,Switch } from "react-router-dom";
import Home from "./components/Home/Home"
import DisplayImage from "./components/DisplayImage/DisplayImage"
import LabelImage from "./components/LabelImage/LabelImage"
import NotFound from "./components/NotFound/NotFound"
import './App.css'
function App() {
	return (
		<Router>
			<div>
				<nav className="navbar navbar-light bg-dark">
					<Link to="/" className="navbar-brand text-light"><span className="upper">LABEL</span><br></br><span className="lower">LAB</span></Link>
				</nav>
				<Switch>
					<Route exact path="/" component={Home} />
					<Route exact path="/:id" component={DisplayImage} />
					<Route exact path="/label/:id" component={LabelImage} />
					<Route path="*" component={NotFound} />
				</Switch>
			</div>
		</Router>
	);
}

export default App;
