import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';

interface NavItemProps {
	linkUrl: string
	displayName: string
	isDisplayed: boolean
}

interface IState {
	isAuthenticated: any
	displayNavBar: boolean
}

export default class NavigationBar extends Component<{}, IState> {
	constructor(props) {
		super(props);
		if (this.isLoggedIn()) {
			this.state = {
				isAuthenticated: true,
				displayNavBar: true
			};
		} else {
			this.state = {
				isAuthenticated: false,
				displayNavBar: true
			};
		}
	}

	isLoggedIn = async () => {
		let authentication = false;
		let res = await axios.get('/Identity/Account/me')
			.then(function (res) {
				if (res.status == 200) {
					authentication = true;
				}
			})
			.catch(function (error) {
				authentication = false
				//Perform action based on error
			});

		this.setState({ isAuthenticated: authentication });
	};

	render() {
		let navClassName = "sidebar"
		if (!this.state.displayNavBar) {
			navClassName += " collapsed"
		}
		let navItems: NavItemProps[] = [
			{ linkUrl: "", displayName: "Home", isDisplayed: true },
			{ linkUrl: "admin", displayName: "Admin", isDisplayed: this.state.isAuthenticated },
			{ linkUrl: "logout", displayName: "Logout", isDisplayed: this.state.isAuthenticated },
			{ linkUrl: "about", displayName: "About", isDisplayed: true },
			{ linkUrl: "blog", displayName: "Blog", isDisplayed: true },
			{ linkUrl: "portfolio", displayName: "Portfolio", isDisplayed: true },
			{ linkUrl: "contact-me", displayName: "Contact Me", isDisplayed: true },
		]
		const htmlLinks = navItems
			.filter(link => link.isDisplayed)
			.map((link) => <NavigationItem
				displayName={link.displayName}
				linkUrl={link.linkUrl}
				isDisplayed={link.isDisplayed}
			/>
			);

		return (
			<>
				<button className="main" onClick={() => this.setState({ displayNavBar: !this.state.displayNavBar })}> Toggle Nav bar</button>
				<div className={navClassName}>
					<ul>
						{htmlLinks}
					</ul>
				</div>
			</>
		);
	}
}

function NavigationItem(props: NavItemProps) {
	return (
		<li className="nav-item">
			<Link to={"/" + props.linkUrl}>{props.displayName}</Link>
		</li>
	)
}