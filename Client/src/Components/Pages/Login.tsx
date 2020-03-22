import React, { Component, EventHandler } from 'react'
import axios from 'axios';
import { store } from '../store';
import ErrorMessage from '../error';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import TextField from '../Inputs/TextField';

interface LoginState {
	errorMessage: string
}

const loginError = "Username/Password Combination is incorrect.";

@observer
export default class Login extends Component<{}, LoginState> {
	constructor(props: any) {
		super(props);
		this.state = {
			errorMessage: '',
		};
	}

	@observable
	private LoginModel = {
		Password: '',
		Email: '',
	};

	render() {
		return (
			<>
				<form onSubmit={this.SubmitHandler}>
					<ErrorMessage>{this.state.errorMessage}</ErrorMessage>
					<h1>Login</h1>
					<br />
					<TextField
						model={this.LoginModel}
						modelProperty={"Email"}
						type="email"
						label="Email"
					/>
					<TextField
						model={this.LoginModel}
						modelProperty={"Password"}
						type="password"
						label="Password"
					/>
					<input type="submit" value="Login" />
				</form>
			</>
		)
	}

	// Validate the form on the clientside.
	ValidateForm = (): boolean => {
		if (this.LoginModel.Email == '' || this.LoginModel.Password == '') {
			this.setState({ errorMessage: "Email/Password is Required" })
			return false
		}
		this.setState({ errorMessage: '' })
		return true;
	}
	SubmitHandler = (event: any) => {
		event.preventDefault();
		if (!this.ValidateForm()) { return; }

		axios.post('/Identity/Account/Login', { "Email": this.LoginModel.Email, "Password": this.LoginModel.Password })
			.then(function (response) {
				console.log(response);
				store.CheckUserSession();
				store.history.push("/");
			})
			.catch(error => {
				console.log(error);
				if (this.state.errorMessage != loginError) {
					this.setState({ errorMessage: loginError })
				}
			});
	}
}