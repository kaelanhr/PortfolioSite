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
					<div className="page-content">
						<Switch>
							<Route path="/about" component={About} />
							<Route path="/blog" component={Blog} />
							<Route exact path="/admin" component={Admin} />
							<Route exact path="/login" component={Login} />
							<Route exact path="/logout" component={Logout} />
							<Route exact path="/projects" component={Projects} />
							<Route component={NotFound} />
						</Switch>
					</div>
				</Route>
			</Switch>
		);
	}
}

function NotFound() {
	return <p>The Page you were looking for was not found</p>;
}
