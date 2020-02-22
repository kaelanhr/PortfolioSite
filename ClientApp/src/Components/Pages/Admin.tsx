import React, { Component } from 'react'
import { store } from '../store'
import { Redirect } from 'react-router';

export default class Admin extends Component {
	constructor(props: any) {
		super(props);

	}
	render() {
		if (!store.checkLoggedIn) {
			return <Redirect to="/404" />
		}
		return (
			<div>
				<p>Hello {store.checkUserData.userName}</p>
				<p>TODO: Admin Page Component</p>
			</div>
		)
	}
}