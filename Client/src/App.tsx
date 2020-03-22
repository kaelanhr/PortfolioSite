import React, { Component } from 'react';
import './App.scss';
import {
	Router,
} from "react-router";
import RoutPages from './Components/Routing/RoutPages';
import { createBrowserHistory } from 'history';
import MainApp from './MainApp';
import { store } from './Components/store';

export default class App extends Component {
	constructor(props: any) {
		super(props);
		store.history = createBrowserHistory();
	}
	render() {
		return (
			<>
				<Router history={store.history}>
					<MainApp >
						<RoutPages />
					</MainApp>
				</Router>
			</>
		)
	}
}
