import { createBrowserHistory } from "history";
import React, { Component } from "react";
import { Router } from "react-router";
import "./App.scss";
import MainApp from "./MainApp";
import RoutPages from "./Pages/Routing/RoutPages";
import { store } from "./store";

export default class App extends Component {
	constructor(props: any) {
		super(props);
		store.history = createBrowserHistory();
	}
	render() {
		return (
			<>
				<Router history={store.history}>
					<MainApp>
						<RoutPages />
					</MainApp>
				</Router>
			</>
		);
	}
}
