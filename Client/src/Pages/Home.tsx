import { observer } from "mobx-react";
import React, { Component } from "react";

@observer
export default class Home extends Component {
	constructor(props: any) {
		super(props);
	}

	render() {
		return (
			<>
				<h1>Hey, I'm Kaelan Reece,</h1>
				<div>
					<span>Software Developer</span>
					<br />
					<span>& Project Manager</span>
				</div>
			</>
		);
	}
}
