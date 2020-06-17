import { observer } from "mobx-react";
import React, { Component } from "react";
import SocialMediaLinks from "../Components/Links/SocialMediaLinks";
import { NavLink } from "react-router-dom";
import HeaderContent from '../Components/Header/Header';

@observer
export default class Home extends Component {
	constructor(props: any) {
		super(props);
	}

	render() {
		return (
			<>
				<HeaderContent name="home">
					<div className="welcome-text">
						<h1>Hi, I'm Kaelan Reece</h1>
						<br />
						<h2>Senior Software Engineer from Brisbane, I specialise</h2>
						<h2>in Web development</h2>
						<SocialMediaLinks />
					</div>
				</HeaderContent>
			</>
		);
	}
}

