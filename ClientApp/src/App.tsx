import React from 'react';
import './App.css';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link
} from "react-router-dom";
import NavigationBar from './Components/NavigationBar';
import About from './Components/About';
import Contact from './Components/Contact';
import Blog from './Components/Blog';
import Admin from './Components/Admin';
import Login from './Components/Login';
import Portfolio from './Components/Portfolio';
import Home from './Components/Home';

const App: React.FC = () => {
	return (
		<>
			<Router>
				<NavigationBar />
				<Switch>
					<Route exact path="/">
						<Home />
					</Route>
					<Route exact path="/about">
						<About />
					</Route>
					<Route exact path="/blog">
						<Blog />
					</Route>
					<Route exact path="/admin">
						<Admin />
					</Route>
					<Route exact path="/login">
						<Login />
					</Route>
					<Route exact path="/portfolio">
						<Portfolio />
					</Route>
					<Route exact path="/contact-me">
						<Contact />
					</Route>
					<Route component={NotFound} />
				</Switch>
			</Router>
		</>
	);
}

function NotFound() {
	return (
		<p>
			The Page you were looking for was not found
		</p>
	)
}

export default App;