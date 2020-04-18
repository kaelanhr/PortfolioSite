import React, { Component } from 'react'
import About from './About'
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import SocialMediaLinks from '../Links/SocialMediaLinks';

@observer
export default class Home extends Component {
	constructor(props: any) {
		super(props);
	}

	render() {
		return (
			<>
				<h1>Hey, I'm Kaelan Reece,</h1>
				<span>Software Development Manager</span>
				<br />
			</>
		)
	}
}