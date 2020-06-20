import { observer } from "mobx-react";
import React, { Component } from "react";
import { store } from "../../store";

interface IProps {
	renderCondition: boolean;
}
export default class If extends Component<IProps> {
	render() {
		if (this.props.renderCondition) {
			return this.props.children;
		} else {
			return null;
		}
	}
}

export class IfAdmin extends Component {
	render() {
		return (
			<If renderCondition={store.isLoggedIn && store.hasBackendAccess}>
				{this.props.children}
			</If>
		);
	}
}
