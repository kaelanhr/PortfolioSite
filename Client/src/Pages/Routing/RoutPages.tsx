import React, { Component } from "react";
import { Route, Switch } from "react-router";
import NavigationBar from "../../Components/Navigation/NavigationBar";
import About from "../../Pages/About";
import Admin from "../../Pages/Admin";
import Blog from "../../Pages/Blog/Blog";
import Home from "../../Pages/Home";
import Login from "../../Pages/Login";
import Logout from "../../Pages/Logout";
import Projects from "../../Pages/Projects";
import { store } from "../../store";

export default class RoutPages extends Component {
	render() {
		store.CheckUserSession();
		return (
			<Switch>
				<Route exact path="/">
					<NavigationBar displayNavBar={true} displayHeader={false} />
					<div id="home-slide">
						<Home />
					</div>
				</Route>
				<Route>
					<NavigationBar displayNavBar={true} displayHeader={true} />
					<Switch>
						<div className="page-content">
							<Route path="/about">
								<Route component={About} />
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
							<Route exact path="/projects">
								<Projects />
							</Route>
						</div>
					</Switch>
					<Route component={NotFound} />
				</Route>
			</Switch>
		);
	}
}

function NotFound() {
	return <p>The Page you were looking for was not found</p>;
}
