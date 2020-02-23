import React, { Component } from 'react'
import ErrorMessage from '../error';

interface LoginState {
	Email: string
	Password: string
	ConfirmPassword: string
	Username: string
	errorMessage: string
}

export default class Register extends Component<{}, LoginState> {
	constructor(props:any) {
		super(props);
		this.state = {
			Email: '',
			Password: '',
			ConfirmPassword: '',
			Username: '',
			errorMessage: '',
		}
	}
	render() {
		return (
			<>
				<h1>Register</h1>
				<ErrorMessage>{this.state.errorMessage}</ErrorMessage>
				<form onSubmit={this.SubmitHandler}> 
					<span>Email</span>
					<input type="text" />
					<span>Username</span>
					<input type="text" />
					<span>Password</span>
					<input type="password" />
					<span>Confirm Password</span>
					<input type="password" />
					<button type="submit">Register</button>
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
	}	
}