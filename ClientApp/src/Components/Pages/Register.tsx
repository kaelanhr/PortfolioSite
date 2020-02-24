import React, { Component } from 'react'
import ErrorMessage from '../error';
import { observable, computed } from 'mobx';
import { observer } from 'mobx-react';
import TextField from '../Inputs/TextField';

interface LoginState {
	errorMessage: string
	Email: string
	Password: string
	ConfirmPassword: string
	Username: string
}

@observer
export default class Register extends Component<LoginState> {

	@observable
	private registrationModel = {
		Email: '',
		Password: '',
		ConfirmPassword: '',
		Username: '',
	};

	constructor(props: LoginState) {
		super(props);
	}

	render() {
		return (
			<>
				<h1>Register</h1>
				{/* <ErrorMessage>{this.state.errorMessage}</ErrorMessage> */}
				{/* <ErrorMessage>{this.validationMessage}</ErrorMessage> */}
				<p>{this.registrationModel["Email"]}</p>
				<p>{this.registrationModel["Password"]}</p>
				<p>{this.registrationModel["ConfirmPassword"]}</p>
				<p>{this.registrationModel["Username"]}</p>
				<form>
					<span>Email</span>
					<TextField model={this.registrationModel} modelProperty={"Email"} type="email" />
					<span>Username</span>
					<TextField model={this.registrationModel} modelProperty={"Username"} type="text" />
					<span>Password</span>
					<TextField model={this.registrationModel} modelProperty={"Password"} type="password" />
					<span>Confirm Password</span>
					<TextField model={this.registrationModel} modelProperty={"ConfirmPassword"} type="password" />
					<button type="submit">Register</button>
				</form>
			</>
		)
	}
	// Validate the form on the clientside.
	// ValidateForm = (): boolean => {
	// 	if (this.state.Email == '' || this.state.Username == '' || this.state.ConfirmPassword == '' || this.state.Password == '') {
	// 		this.setState({ errorMessage: "Email, Password and Username are Required" })
	// 		return false
	// 	}
	// 	this.setState({ errorMessage: '' })
	// 	return true;
	// }
	// SubmitHandler = (event: any) => {
	// 	event.preventDefault();
	// 	if (!this.ValidateForm()) { return; }
	// }
	handleUserInput(e: any) {
		//this.setState(prevState => ({ ...prevState, [e.target.name]: e.target.value }));
		//  this.setState(newState as { [P in T]: IState[P]; });
	}
	EmptyHandler = (event: any) => {
		if (event.target.value == '') {
			this.setState({ errorMessage: `${event.target.name} field is required` })
			return;
		}
		// if (this.state.errorMessage != '') {
		// 	this.setState({ errorMessage: '' })
		// }
	}
}