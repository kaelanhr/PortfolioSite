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
			.map((link) => <NavigationItem
				displayName={link.displayName}
				linkUrl={link.linkUrl}
				isDisplayed={link.isDisplayed}
			/>
			);

		return (
			<ul>
				{htmlLinks}
			</ul>
		)
	}
}

function NavigationItem(props: NavItemProps) {
	return (
		<li>
			<Link to={"/" + props.linkUrl}>{props.displayName}</Link>
		</li>
	)
}