import React, { Component } from 'react'
import ErrorMessage from '../error';
import TextField from '../Inputs/TextField';
import { observable, computed } from 'mobx';
import { observer } from 'mobx-react';

interface LoginState {
	errorMessage: string
}

@observer
export default class Register extends Component<{}, LoginState> {

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
					<input type="text" name="Email" onChange={(e) => { this.Email = e.target.value }} onBlur={this.EmptyHandler} />
					<span>Username</span>
					<input type="text" name="Username" onChange={(e) => { this.Username = e.target.value }} onBlur={this.EmptyHandler} />
					<span>Password</span>
					<input type="password" name="Password" onChange={(e) => { this.Password = e.target.value }} onBlur={this.EmptyHandler} />
					<span>Confirm Password</span>
					<input type="password" name="Confirm Password" onChange={(e) => { this.ConfirmPassword = e.target.value }} onBlur={this.EmptyHandler} />
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
	EmptyHandler = (event: any) => {
		if (event.target.value == '') {
			this.setState({ errorMessage: `${event.target.name} field is required` })
			return;
		}
		if (this.state.errorMessage != '') {
			this.setState({ errorMessage: '' })
		}
	}
}