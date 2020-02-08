import React from 'react';

interface MyState {
	favoritecolor: string,
}

export default class FavouriteColor extends React.Component<{}, MyState>{
	constructor(props) {
		super(props);
		this.state = { favoritecolor: "red" };
	}
	componentDidMount() {
		setTimeout(() => {
			this.setState({ favoritecolor: "yellow" })
		}, 1000)
	}
	getSnapshotBeforeUpdate(prevProps, prevState) {
		let update = document.getElementById("div1");
		if (update && update.innerHTML) {
			update.innerHTML =
				"Before the update, the favorite was " + prevState.favoritecolor;
		}
	}
	componentDidUpdate() {
		let update = document.getElementById("div2");
		if (update && update.innerHTML) {
			update.innerHTML =
				"The updated favorite is " + this.state.favoritecolor;
		}
	}
	render() {
		return (
			<div>
				<h1>My Favorite Color is {this.state.favoritecolor}</h1>
				<div id="div1">1</div>
				<div id="div2">2</div>
			</div>
		);
	}
}