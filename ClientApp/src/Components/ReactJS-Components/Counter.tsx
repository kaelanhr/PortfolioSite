import React, { Component } from 'react'

interface IState {
	seconds: number
	minutes: number
}

export default class Counter extends Component<{}, IState> {
	interval: any;
	constructor(props) {
		super(props);
		this.state = {
			seconds: 0,
			minutes: 0
		}
	}

	tick() {
		this.setState(state => ({
			seconds: state.seconds + 1
		}))
	}

	componentDidMount() {
		this.interval = setInterval(() => this.tick(), 1000);
	}

	componentWillUnmount() {
		clearInterval(this.interval);
	}

	render() {
		if (this.state.seconds > 1 && this.state.seconds % 60 == 0) {
			this.setState(state => ({
				seconds: 0,
				minutes: state.minutes + 1
			}))
		}
		return (
			<div>
				<p>{this.state.minutes} Minutes</p>
				<p>{this.state.seconds} Seconds</p>
			</div>
		)
	}
}
