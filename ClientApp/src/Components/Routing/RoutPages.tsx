import React, { Component } from 'react'
import { Switch, Route } from 'react-router'
import Home from '../Pages/Home'
import About from '../Pages/About'
import Blog from '../Pages/Blog'
import BlogEntity from '../Blog/BlogEntity'
import Admin from '../Pages/Admin'
import Login from '../Pages/Login'
import Logout from '../Pages/Logout'
import Portfolio from '../Pages/Portfolio'
import Contact from '../Pages/Contact'
import Register from '../Pages/Register'

export default class RoutPages extends Component {
	render() {
		return (
			<Switch>
				<Route exact path="/">
					<Home />
				</Route>
				<Route exact path="/about">
					<About />
				</Route>
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
				<Route exact path="/register">
					<Register />
				</Route>				
				<Route exact path="/portfolio">
					<Portfolio />
				</Route>
				<Route exact path="/contact-me">
					<Contact />
				</Route>
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
