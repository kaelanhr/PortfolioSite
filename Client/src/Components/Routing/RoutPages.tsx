import React, { Component } from 'react'
import { Switch, Route } from 'react-router'
import Home from '../Pages/Home'
import About from '../Pages/About'
import Blog from '../Pages/Blog'
import BlogEntity from '../Blog/BlogEntity'
import Admin from '../Pages/Admin'
import Login from '../Pages/Login'
import Logout from '../Pages/Logout'
import Projects from '../Pages/Projects'
import { store } from '../store';
import SocialMediaLinks from '../Links/SocialMediaLinks'
import { HashLink as Link } from 'react-router-hash-link';

export default class RoutPages extends Component {
	render() {
		store.CheckUserSession();
		return (
			<Switch>

				<Route exact path="/">
					<div id="home-slide">
						<Home />
						<Link to="/#about-content"><img className="expand-icon" src="/Icons/Expand.svg" /></Link>
					</div>
					<div id="about-slide">
						<div className="home-page-content">
							<About />
						</div>
					</div>
				</Route>

				<div className="page-content">
					<Route path="/blog">
						<Route component={Blog} />
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
					<Route exact path="/projects">
						<Projects />
					</Route>
				</div>
				<Route component={NotFound} />

			</Switch>
		)
	}
}

function NotFound() {
	return (
		<p>
			The Page you were looking for was not found
		</p>
	)
}
