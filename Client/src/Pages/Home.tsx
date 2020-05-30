import { observer } from "mobx-react";
import React, { Component } from "react";
import SocialMediaLinks from "../Components/Links/SocialMediaLinks";
import { NavLink } from "react-router-dom";

@observer
export default class Home extends Component {
	constructor(props: any) {
		super(props);
	}

	render() {
		return (
			<>
				<h1>
					<NavLink to="/about">
						<i>Kaelan Reece</i>
					</NavLink>
				</h1>
				<div className="subtitle">
					<span>
						I am a Software Developer & Project Manager from Australia
					</span>
				</div>
				<SocialMediaLinks />
			</>
		);
	}
}
