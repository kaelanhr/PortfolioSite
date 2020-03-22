import React, { Component, PureComponent } from 'react'
import SocialMediaLinks from '../Links/SocialMediaLinks';

export default class About extends PureComponent {
	constructor(props: any) {
		super(props);
	}
	render() {
		return (
			<>
				<h2>About</h2>

				<p>You can find me at any of the following platforms</p>
				<div>
					<SocialMediaLinks />
				</div>
			</>
		)
	}
}