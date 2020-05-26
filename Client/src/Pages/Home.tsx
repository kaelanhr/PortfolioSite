import { observer } from "mobx-react";
import React, { Component } from "react";
import SocialMediaLinks from "../Components/Links/SocialMediaLinks";

@observer
export default class Home extends Component {
	constructor(props: any) {
		super(props);
	}

	render() {
		return (
			<>
				<h1>
					<i>Kaelan Reece</i>
				</h1>
				<div className="subtitle">
					<span>
						I am a Software Developer & Project Manager from Australia
					</span>
					<br />
					<SocialMediaLinks />
				</div>
			</>
		);
	}
}
