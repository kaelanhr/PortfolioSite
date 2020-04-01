import React, { Component } from 'react'
import About from './About'
import { observer } from 'mobx-react';
import { observable } from 'mobx';

@observer
export default class Home extends Component {
	constructor(props: any) {
		super(props);
	}
	@observable
	showInfo: boolean = false

	render() {
		let moreInfo = this.showInfo ? <><About/></> : null
		return (
			<div className="Home">
				<h1>Kaelan Reece,</h1>
				<span>Software Development Manager</span>
				<button onClick={() => this.showInfo = !this.showInfo}>More</button>
				{moreInfo}
			</div>
		)
	}
}