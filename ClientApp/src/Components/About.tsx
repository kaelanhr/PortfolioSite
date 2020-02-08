import React, { Component } from 'react'

interface AboutProps {
	title: string
}

export default class About extends Component<AboutProps> {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<h2>{this.props.title}</h2>
		)
	}
}
