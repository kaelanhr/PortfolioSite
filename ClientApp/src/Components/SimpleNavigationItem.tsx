import React, { Component } from 'react'
import { Link } from 'react-router-dom';

interface NavItemProps {
	linkUrl: string
	displayName: string
	isDisplayed: boolean
}

export default class SimpleNavigationItem extends Component<NavItemProps> {
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
