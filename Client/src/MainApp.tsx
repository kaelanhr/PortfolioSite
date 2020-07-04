import React, { Component } from "react";
import Footer from "Components/Footer/Footer";

export default class MainApp extends Component<{}> {
	constructor(props: any) {
		super(props);
	}

	render() {
		return (
			<>
				<div className={"main"}>
					{this.props.children}
					<Footer />
				</div>
			</>
		);
	}
}
