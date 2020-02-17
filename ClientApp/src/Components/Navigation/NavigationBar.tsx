import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';

interface NavItemProps {
	linkUrl: string
	displayName: string
	isDisplayed: boolean
}

interface IState {
	isAuthenticated: boolean
	isLoading: boolean
}

interface NavBarProps {
	displayNavBar: boolean
}

export default class NavigationBar extends Component<NavBarProps, IState> {
	constructor(props) {
		super(props);
		this.state = {
			isAuthenticated: false,
			isLoading: true,
			//	displayNavBar: true
		};
	}

	async componentDidMount() {
		let res = await axios.get('/Identity/Account/me')
			.then(res => {
				this.setState({ isAuthenticated: true });
			})
			.catch(error => {
				this.setState({ isAuthenticated: false });
				//Perform action based on error
			}).finally(() => {
				this.setState({ isLoading: false });
			});
	}

	render() {
		if (this.state.isLoading) {
			return null
		}

		let navClassName = "sidebar"
		if (!this.props.displayNavBar) {
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