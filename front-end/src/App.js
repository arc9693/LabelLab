import React from "react";
import { BrowserRouter as Router, Route, Link,Switch } from "react-router-dom";
import Home from "./components/Home/Home"
import DisplayImage from "./components/DisplayImage/DisplayImage"
import LabelImage from "./components/LabelImage/LabelImage"
import NotFound from "./components/NotFound/NotFound"
import './App.css'

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import { createMuiTheme } from '@material-ui/core/styles';
import { MuiThemeProvider }  from '@material-ui/core/styles';
const theme = createMuiTheme({
	palette: {
		primary: {
			light: '#484848',
			main: '#212121',
			dark: '#000000',
			contrastText: '#fff',
		},
		secondary: {
			light: '#fff263',
			main: '#fbc02d',
			dark: '#c49000',
			contrastText: '#000',
		},
	},
});

function App() {
	return (
		<Router>
			<div>
				<React.Fragment>
					<MuiThemeProvider theme={theme}>
						<AppBar position="static">
							<Toolbar>
								<Typography variant="title" color="inherit" style={{flex: 1}}>
									<Link to="/" className="navbar-brand"><span className="upper">LABEL</span><br></br><span className="lower">LAB</span></Link>
								</Typography>
							</Toolbar>
						</AppBar>
						<Switch>
							<Route exact path="/" component={Home} />
							<Route exact path="/:id" component={DisplayImage} />
							<Route exact path="/label/:id" component={LabelImage} />
							<Route path="*" component={NotFound} />
						</Switch>
					</MuiThemeProvider>
				</React.Fragment>
			</div>
		</Router>
	);
}

export default App;
