import React, { Component } from 'react'
import axios from 'axios';
import { store } from '../store';

interface LoginState {
	Email: string
	Password: string
}

export default class Login extends Component<{}, LoginState> {
	constructor(props) {
		super(props);
		this.setState({
			Password: '',
			Email: ''
		});
	}

	render() {
		return (
			<>
				<p>TODO: Implement Login feature</p>
				<form onSubmit={this.SubmitHandler}>
					<h1>Login</h1>
					<input type="Email" onChange={
						(e) => this.setState({
							Email: e.target.value
						})}
					/>
					<input type="Password" onChange={
						(e) => this.setState({
							Password: e.target.value
						})}
					/>
					<input type="submit" value="Login" />
				</form>
			</>
		)
	}
	SubmitHandler = (event) => {
		event.preventDefault();
		axios.post('/Identity/Account/Login', { "Email": this.state.Email, "Password": this.state.Password })
			.then(function (response) {
				console.log(response);
				if (response.status == 200) {
					store.setUserLogin(true);
				}
			})
			.catch(function (error) {
				console.log(error);
			});

	}
}