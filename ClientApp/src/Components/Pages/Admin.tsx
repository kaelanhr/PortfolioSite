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

				<h2>What is left to do (in general)</h2>
				<ul>
					<li>donate/support me?</li>
					<li>Crud on portfolio</li>
					<li>Add admin section (about and other content)</li>
					<li>styling</li>
					<li>contact me</li>
					<li>deploy on web server</li>
					<li>mobile responsiveness</li>
					<li>blog posting</li>
					<li>Create services for each of the api end points</li>
					<li>also use graphql for other endpoints</li>
				</ul>
			</div>
		)
	}
}