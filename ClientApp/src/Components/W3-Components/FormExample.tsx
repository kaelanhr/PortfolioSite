import React from 'react';

interface IState {
	username: string
}

export default class MyForm extends React.Component<{}, IState> {
	constructor(props) {
		super(props);
		this.state = { username: '' };
	}
	mySubmitHandler = (event) => {
		event.preventDefault();
		alert("You are submitting " + this.state.username);
	}
	myChangeHandler = (event) => {
		this.setState({ username: event.target.value });
	}
	render() {
		let header = <></>;
		if (this.state.username) {
			header = <h1>Hello {this.state.username}</h1>;
		} else {
			header = <></>;
		}
		return (
			<form onSubmit={this.mySubmitHandler}>
				{header}
				<p>Enter your name:</p>
				<input
					type='text'
					onChange={this.myChangeHandler}
				/>
				<input type='submit' />
			</form>
		);
	}
}