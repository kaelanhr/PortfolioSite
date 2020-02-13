import React, { Component } from 'react'
import { Link } from 'react-router-dom';

interface NavItemProps {
	linkUrl: string
	displayName: string
	isDisplayed: boolean
}

export default class NavigationBar extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		let navItems: NavItemProps[];
		navItems = [
			{ linkUrl: "", displayName: "Home", isDisplayed: true },
			{ linkUrl: "admin", displayName: "Admin", isDisplayed: false },
			{ linkUrl: "login", displayName: "Login", isDisplayed: false },
			{ linkUrl: "logout", displayName: "Logout", isDisplayed: false },
			{ linkUrl: "about", displayName: "About", isDisplayed: true },
			{ linkUrl: "blog", displayName: "Blog", isDisplayed: true },
			{ linkUrl: "portfolio", displayName: "Portfolio", isDisplayed: true },
			{ linkUrl: "contact-me", displayName: "Contact Me", isDisplayed: true },
		]

		const htmlLinks = navItems
			.filter(link => link.isDisplayed ? link.isDisplayed : false)
			.map((link) => <SimpleNavigationItem
				displayName={link.displayName}
				linkUrl={link.linkUrl}
				isDisplayed={link.isDisplayed}
			/>
			);

		return (
			<div>
				{htmlLinks}
			</div>
		)
	}
}

class SimpleNavigationItem extends Component<NavItemProps> {
	constructor(props) {
		super(props);

	}

	render() {
		let displayName;

		// get the display name by removing the dashes and then capitalizing each word
		let wordArray = this.props.linkUrl.split("-");

		if (this.props.linkUrl.length > 0) {
			displayName = wordArray.map(
				x => (x[0].toUpperCase() + x.substring(1, x.length))
			).join(" ");
		} else {
			displayName = "Home"
		}
		return (
			<li>
				<Link to={"/" + this.props.linkUrl}>{displayName}</Link>
			</li>
		)
	}
}