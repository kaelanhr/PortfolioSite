import React from 'react';
import './App.css';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link
} from "react-router-dom";
import NavigationBar from './Components/Navigation/NavigationBar';
import About from './Components/Pages/About';
import Contact from './Components/Pages/Contact';
import Blog from './Components/Pages/Blog';
import Admin from './Components/Pages/Admin';
import Login from './Components/Pages/Login';
import Portfolio from './Components/Pages/Portfolio';
import Home from './Components/Pages/Home';
import Logout from './Components/Pages/Logout';
import BlogEntity from './Components/Blog/BlogEntity';
import { EntityAdminAction } from './Components/Blog/BlogEntity';
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