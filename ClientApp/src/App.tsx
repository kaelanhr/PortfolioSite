import React from 'react';
import './App.scss';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link
} from "react-router-dom";
import RoutPages from './Components/Routing/RoutPages';
import MainApp from './MainApp';

const App: React.FC = () => {
	return (
		<>
			<Router>
				<MainApp >
					<RoutPages />
				</MainApp>
			</Router>
		</>
	);
}

export default App;