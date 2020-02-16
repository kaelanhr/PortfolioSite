import React from 'react';
import './App.css';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link
} from "react-router-dom";
import NavigationBar from './Components/Navigation/NavigationBar';
import About from './Components/Pages/About';
import Contact from './Components/Pages/Contact';
import Blog from './Components/Pages/Blog';
import Admin from './Components/Pages/Admin';
import Login from './Components/Pages/Login';
import Portfolio from './Components/Pages/Portfolio';
import Home from './Components/Pages/Home';
import Logout from './Components/Pages/Logout';
import BlogEntity from './Components/Blog/BlogEntity';
import { EntityAdminAction } from './Components/Blog/BlogEntity';

const App: React.FC = () => {
	return (
		<>
			<Router>
				<NavigationBar />
				<div className="main">
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
						<Route exact path="/blog/create">
							<BlogEntity entityAction={"Create"} />
						</Route>
						<Route exact path="/blog/update">
							<BlogEntity entityAction={"Update"} />
						</Route>
						<Route exact path="/admin">
							<Admin />
						</Route>
						<Route exact path="/login">
							<Login />
						</Route>
						<Route exact path="/logout">
							<Logout />
						</Route>
						<Route exact path="/portfolio">
							<Portfolio />
						</Route>
						<Route exact path="/contact-me">
							<Contact />
						</Route>
						<Route component={NotFound} />
					</Switch>
				</div>
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