import React from 'react';

interface IState {
	show: boolean
}

export default class Container extends React.Component<{}, IState> {
	constructor(props) {
		super(props);
		this.state = { show: true };
	}
	delHeader = () => {
		this.setState({ show: !this.state.show });
	}
	render() {
		let myheader;
		if (this.state.show) {
			myheader = <Child />;
		};
		return (
			<div>
				{myheader}
				<button type="button" onClick={this.delHeader}>Delete Header</button>
			</div>
		);
	}
}

class Child extends React.Component {
	componentWillUnmount() {
		alert("The component named Header is about to be unmounted.");
	}
	render() {
		return (
			<h1>Hello World!</h1>
		);
	}
}