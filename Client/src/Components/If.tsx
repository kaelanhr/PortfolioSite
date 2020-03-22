import React, { Component } from 'react';
import { store } from './store';
import { observer } from 'mobx-react';
import { isNullOrUndefined } from 'util';

interface IProps {
	renderCondition: boolean
}

@observer export default class If extends Component<IProps> {
	render() {
		if (this.props.renderCondition) {
			return this.props.children;
		} else {
			return null;
		}
	}
}

@observer export class IfAdmin extends Component {
	render() {
		return (
			<If renderCondition={store.isLoggedIn && store.hasBackendAccess} >
				{this.props.children}
			</If>
		);
	}
}
