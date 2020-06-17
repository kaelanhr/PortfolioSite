import React, { Component } from "react";
import { Route, Switch } from "react-router";
import NavigationBar from "../../Components/Navigation/NavigationBar";
import About from "../../Pages/About";
import Admin from "../../Pages/Admin";
import Home from "../../Pages/Home";
import Login from "../../Pages/Login";
import Logout from "../../Pages/Logout";
import Projects from "../../Pages/Projects";
import { store } from "../../store";
import BlogPage from "../Blog/BlogListPage";
import NewNavigationBar from '../../Components/Navigation/NavigationBar';
import NavWrapper from '../../Components/Navigation/NavWrapper';

export default class RoutPages extends Component {
	render() {
		store.CheckUserSession();
		return (
			<Switch>
				<Route exact path="/">
					<NavWrapper displayHeader={false}>
						<Home />
					</NavWrapper>
				</Route>
				<Route>
						<Switch>
							<Route path="/about" component={About} />
							<Route path="/blog" component={BlogPage} />
							<Route exact path="/admin" component={Admin} />
							<Route exact path="/login" component={Login} />
							<Route exact path="/logout" component={Logout} />
							<Route exact path="/projects" component={Projects} />
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
