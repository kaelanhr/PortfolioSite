import React, { Component, EventHandler } from 'react'
import axios from 'axios';
import { store } from '../store';

interface LoginState {
	Email: string
	Password: string
	errorMessage: string
}

export default class Login extends Component<{}, LoginState> {
	constructor(props: any) {
		super(props);
		this.state = {
			Password: '',
			Email: '',
			errorMessage: '',
		};
	}

	render() {
		return (
			<>
				<form onSubmit={this.SubmitHandler}>
					<h1>Login</h1>
					<p>{`${this.state.errorMessage}`}</p>
					<input type="Email" onChange={
						(e) => {
							this.setState({
								Email: e.target.value
							})
							if (this.state.errorMessage != '') {
								this.ValidateForm();
							}
						}}
					/>
					<input type="Password" onChange={
						(e) => {
							this.setState({
								Password: e.target.value
							})
							if (this.state.errorMessage != '') {
								this.ValidateForm();
							}
						}}
					/>
					<input type="submit" value="Login" />
				</form>
			</>
		)
	}

	// Validate the form on the clientside.
	ValidateForm = (): boolean => {
		if (this.state.Email == '' || this.state.Password == '') {
			this.setState({ errorMessage: "Email/Password is Required" })
			return false
		}
		this.setState({ errorMessage: '' })
		return true;
	}
	SubmitHandler = (event: any) => {
		event.preventDefault();
		if (!this.ValidateForm()) { return; }

		axios.post('/Identity/Account/Login', { "Email": this.state.Email, "Password": this.state.Password })
			.then(function (response) {
				console.log(response);
				if (response.status == 200) {
					store.setUserLogin(true);
					store.history.push("/");
				}
			})
			.catch(function (error) {
				console.log(error);
			});
	}
}