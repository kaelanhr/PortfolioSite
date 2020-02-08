import React from 'react';

interface IState {
	username: string,
	age: number | ""
}

export default class MultipleInputForm extends React.Component<{}, IState> {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			age: -1,
		};
	}
	mySubmitHandler = (event) => {
		event.preventDefault();
		let age = this.state.age;
		if (!Number(age)) {
			alert("Your age must be a number");
		}
	}
	myChangeHandler = (e) => {
		let nam = e.target.name;
		let val = e.target.value;

		if (nam == "username") {
			this.setState({ username: val });
		}
		if (nam == "age") {
			this.setState({ age: val });
		}
	}
	render() {
		if (this.state.age < 0) {
			this.setState({ age: "" });
		}
		return (
			<form onSubmit={this.mySubmitHandler}>
				<h1>Hello {this.state.username} {this.state.age}</h1>
				<p>Enter your name:</p>
				<input
					type='text'
					name='username'
					onChange={this.myChangeHandler}
				/>
				<p>Enter your age:</p>
				<input
					type='text'
					name='age'
					onChange={this.myChangeHandler}
				/>
				<input type="submit" />
			</form>
		);
	}
}