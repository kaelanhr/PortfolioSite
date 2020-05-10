import React, { Component } from "react";

export default class MainApp extends Component<{}> {
	constructor(props: any) {
		super(props);
	}

	render() {
		return (
			<>
				<div className={"main"}>{this.props.children}</div>
			</>
		);
	}
}
