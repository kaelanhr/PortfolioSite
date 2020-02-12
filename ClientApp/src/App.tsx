import React from 'react';
import logo from './logo.svg';
import './App.css';
import HelloWorld from './Components/W3-Components/HelloWorld';
import HelloUser from './Components/W3-Components/HelloUser';
import Todo from './Components/ReactJS-Components/Todo';
import MarkdownEditor from './Components/ReactJS-Components/MarkdownEditor';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link
} from "react-router-dom";
import SimpleNavigationItem from './Components/SimpleNavigationItem';
import About from './Components/About';
import Contact from './Components/Contact';
import Blog from './Components/Blog';
import Admin from './Components/Admin';
import Login from './Components/Login';
import Portfolio from './Components/Portfolio';

const App: React.FC = () => {
	return (
		<>
			<Router>
				<ul>
					<SimpleNavigationItem linkUrl="" />
					<SimpleNavigationItem linkUrl="about" />
					<SimpleNavigationItem linkUrl="blog" />
					<SimpleNavigationItem linkUrl="portfolio" />
					<SimpleNavigationItem linkUrl="contact-me" />
				</ul>
				<Switch>
					<Route exact path="/">
						<div className="App">
							<header className="App-header">
								<img src={logo} className="App-logo" alt="logo" />
								<p>My name is Kaelan Reece</p>
								<p>
									Welcome to my portfolio website
								</p>
								<h2>What is left to do</h2>
								<ul>
									<li>donate/support me?</li>
									<li>Proper sidebar for navigation</li>
									<li>Add Login</li>
									<li>Crud on portfolio</li>
									<li>Add admin section (about and other content)</li>
									<li>styling</li>
									<li>contact me</li>
									<li>deploy on web server</li>
									<li>mobile responsiveness</li>
									<li>blog posting</li>
								</ul>
							</header>
						</div>
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