import React, { Component } from 'react'
import ErrorMessage from '../error';
import CustomTextField from '../TextField';
import { observable, computed } from 'mobx';
import { observer } from 'mobx-react';

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
		Email: 'hello',
		Password: '',
		ConfirmPassword: '',
		Username: '',
	};
	// @observable Password = "";
	// @observable ConfirmPassword = "";
	// @observable Email = "";
	// @observable Username = "";

	constructor(props: LoginState) {
		super(props);
		// this.state = {
		// 	errorMessage: '',
		// 	Email: '',
		// 	Password: '',
		// 	ConfirmPassword: '',
		// 	Username: '',
		// }
	}

	// @computed get pwsEqual() {
	// 	return this.Password === this.ConfirmPassword
	// }

	// @computed
	// get validationMessage() {
	// 	if (!this.pwsEqual) {
	// 		return "Passwords are not equal"
	// 	}
	// 	return null
	// }
	render() {
		return (
			<>
				<h1>Register</h1>
				{/* <ErrorMessage>{this.state.errorMessage}</ErrorMessage> */}
				{/* <ErrorMessage>{this.validationMessage}</ErrorMessage> */}
				<p>{this.registrationModel["Email"]}</p>
				<form>
					<CustomTextField model={this.registrationModel} modelProperty={"Email"} />
					<span>Email</span>
					<input type="text" name="Email" onChange={this.handleUserInput} onBlur={this.EmptyHandler} />
					<span>Username</span>
					<input type="text" name="Username" onChange={this.handleUserInput} onBlur={this.EmptyHandler} />
					<span>Password</span>
					<input type="password" name="Password" onChange={this.handleUserInput} onBlur={this.EmptyHandler} />
					<span>Confirm Password</span>
					<input type="password" name="Confirm Password" onChange={this.handleUserInput} onBlur={this.EmptyHandler} />
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