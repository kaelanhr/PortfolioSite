import { observer } from "mobx-react";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { store } from "../../store";

interface NavItemProps {
	linkUrl: string;
	displayName: string;
	isDisplayed: boolean;
}

interface IState {
	isAuthenticated: boolean;
	isLoading: boolean;
}

interface NavBarProps {
	displayNavBar: boolean;
	displayHeader: boolean;
}

@observer
export default class NavigationBar extends Component<NavBarProps, IState> {
	constructor(props: any) {
		super(props);
		this.state = {
			isAuthenticated: false,
			isLoading: true,
			//	displayNavBar: true
		};
	}

	render() {
		let navClassName = "nav-bar";
		if (!this.props.displayNavBar) {
			navClassName += " collapsed";
		}
		let navItems: NavItemProps[] = [
			{ linkUrl: "projects", displayName: "Projects", isDisplayed: true },
			{ linkUrl: "blog", displayName: "Blog", isDisplayed: true },
			{ linkUrl: "about", displayName: "About", isDisplayed: true },
			{ linkUrl: "", displayName: "Home", isDisplayed: true },
			{
				linkUrl: "admin",
				displayName: "Admin",
				isDisplayed: store.hasBackendAccess,
			},
			{
				linkUrl: "logout",
				displayName: "Logout",
				isDisplayed: store.isLoggedIn,
			},
		];
		const htmlLinks = navItems
			.filter((link) => link.isDisplayed)
			.map((link) => (
				<NavigationItem
					displayName={link.displayName}
					linkUrl={link.linkUrl}
					isDisplayed={link.isDisplayed}
				/>
			));
		return (
			<>
				<div className={navClassName}>
					<h1>{this.props.displayHeader ? "Kaelan Reece" : ""}</h1>
					<ul>{htmlLinks}</ul>
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
	);
}
