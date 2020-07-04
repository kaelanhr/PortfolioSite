import { observer } from "mobx-react";
import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { store } from "../../store";

interface NavItemProps {
	linkUrl: string;
	displayName: string;
	isDisplayed: boolean;
}

export interface NavBarProps {
	displayHeader: boolean;
}

@observer
export default class NavigationBar extends Component<NavBarProps> {
	constructor(props: any) {
		super(props);
	}

	render() {
		let navItems: NavItemProps[] = [
			{
				linkUrl: "logout",
				displayName: "Logout",
				isDisplayed: store.isLoggedIn,
			},
			// {
			// 	linkUrl: "admin",
			// 	displayName: "Admin",
			// 	isDisplayed: store.hasBackendAccess,
			// },
			{ linkUrl: "Blogs", displayName: "Blog", isDisplayed: true },
			{ linkUrl: "projects", displayName: "Projects", isDisplayed: true },
			{ linkUrl: "about", displayName: "About", isDisplayed: true },
			{ linkUrl: "", displayName: "Home", isDisplayed: true },
		];

		const htmlLinks = navItems
			.filter((link) => link.isDisplayed)
			.map((link) => (
				<NavigationItem
					displayName={link.displayName}
					linkUrl={link.linkUrl}
					isDisplayed={link.isDisplayed}
					key={link.displayName}
				/>
			));

		return (
			<>
				<div className="navigation">
					<h1>{this.props.displayHeader ? "Kaelan Reece" : ""}</h1>
					<ul>{htmlLinks}</ul>
				</div>
			</>
		);
	}
}

function NavigationItem(props: NavItemProps) {
	let useExactPath = false;
	if (props.linkUrl === "") {
		useExactPath = true;
	}
	return (
		<li className="nav-item">
			<NavLink
				exact={useExactPath}
				to={"/" + props.linkUrl}
				activeClassName="active"
			>
				{props.displayName}
			</NavLink>
		</li>
	);
}
