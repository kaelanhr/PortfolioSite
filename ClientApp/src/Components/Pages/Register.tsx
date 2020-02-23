import React, { Component } from 'react'
import ErrorMessage from '../error';
import TextField from '../Inputs/TextField';
import { observable, computed } from 'mobx';
import { observer } from 'mobx-react';

interface LoginState {
	errorMessage: string
}


@observer
export default class Register extends Component<LoginState, LoginState> {

	@observable Password = "";
	@observable ConfirmPassword = "";
	@observable Email = "";
	@observable Username = "";

	constructor(props: LoginState) {
		super(props);
		this.state = {
			errorMessage: '',
		}
	}

	@computed get pwsEqual() {
		return this.Password === this.ConfirmPassword
	}

	@computed
	get validationMessage() {
		if (!this.pwsEqual) {
			return "Passwords are not equal"
		}
		return null
	}
	render() {
		return (
			<>
				<h1>Register</h1>
				<ErrorMessage>{this.state.errorMessage}</ErrorMessage>
				<ErrorMessage>{this.validationMessage}</ErrorMessage>
				<form onSubmit={this.SubmitHandler}>
					<span>Email</span>
					<input type="text" onChange={(e) => { this.Email = e.target.value }} />
					<span>Username</span>
					<input type="text" onChange={(e) => { this.Username = e.target.value }} />
					<span>Password</span>
					<input type="password" onChange={(e) => { this.Password = e.target.value }} />
					<span>Confirm Password</span>
					<input type="password" onChange={(e) => { this.ConfirmPassword = e.target.value }} />
					<button type="submit">Register</button>
				</form>
			</>
		)
	}
	// Validate the form on the clientside.
	ValidateForm = (): boolean => {
		if (this.Email == '' || this.Username == '' || this.ConfirmPassword == '' || this.Password == '') {
			this.setState({ errorMessage: "Email, Password and Username are Required" })
			return false
		}
		this.setState({ errorMessage: '' })
		return true;
	}
	SubmitHandler = (event: any) => {
		event.preventDefault();
		if (!this.ValidateForm()) { return; }
	}
}