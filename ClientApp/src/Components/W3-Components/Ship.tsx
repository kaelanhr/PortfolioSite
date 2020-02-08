import React from 'react';
import ReactDOM from 'react-dom';

interface MyProps {
	value: any
}

interface MyState {
	brand: string,
	model: string,
	faction: string,
	year: number
}

export default class Ship extends React.Component<MyProps, MyState> {
	constructor(props: any) {
		super(props);
		this.state = {
			brand: "Sienar Fleet Systems",
			model: "Tie Fighter",
			faction: "Imperial",
			year: 1500
		};
	}
	changeFaction = () => {
		this.setState({ faction: "First Order" });
	}
	render() {
		return (
			<div>
				<h1>My {this.state.brand}</h1>
				<p>
					It is a {this.state.faction} {this.state.model} from {this.state.year} ABY.
				</p>
				<button type="button" onClick={this.changeFaction}>
					Change Faction
				</button>
			</div>
		);
	}
}