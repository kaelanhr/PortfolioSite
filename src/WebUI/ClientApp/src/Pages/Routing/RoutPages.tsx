import About from "Pages/About";
import Admin from "Pages/Admin";
import Blogs from "Pages/Blogs";
import Home from "Pages/Home";
import Login from "Pages/Login";
import Logout from "Pages/Logout";
import Projects from "Pages/Projects";
import React, { Component } from "react";
import { Route, Switch } from "react-router";
import { store } from "store";

export default class RoutPages extends Component {
	render() {
		store.CheckUserSession();
		return (
			<Switch>
				<Route exact path="/">
					<Home />
				</Route>
				<Route>
					<Switch>
						<Route path="/about" component={About} />
						<Route path="/Blogs" component={Blogs} />
						<Route exact path="/admin" component={Admin} />
						<Route exact path="/login" component={Login} />
						<Route exact path="/logout" component={Logout} />
						<Route path="/projects" component={Projects} />
						<Route component={NotFound} />
					</Switch>
				</Route>
			</Switch>
		);
	}
}

function NotFound() {
	return (
		<div id="not-found">
			<h1>The Page you were looking for was not found</h1>
		</div>
	);
}
