import React, { Component } from 'react'
import { observable, computed } from 'mobx';
import { observer } from 'mobx-react';
import TextField from '../Inputs/TextField';
import ErrorMessage from '../error';

interface FormState {
	errorMessage: string
}

@observer
export default class Register extends Component<{}, FormState> {
	constructor(props: any) {
		super(props);
		this.state = {
			errorMessage: ""
		}
	}

	@observable
	private registrationModel = {
		Email: '',
		Password: '',
		ConfirmPassword: '',
		Username: '',
	};

	render() {
		return (
			<>
				<h1>Register</h1>
				<ErrorMessage>{this.state.errorMessage}</ErrorMessage>
				<form onSubmit={this.SubmitHandler}>
					<TextField
						model={this.registrationModel}
						modelProperty={"Email"}
						type="email"
						label="Email"
					/>
					<TextField model={this.registrationModel}
						modelProperty={"Username"}
						type="text"
						label="Username"
					/>
					<TextField model={this.registrationModel}
						modelProperty={"Password"}
						type="password"
						label="Password"
					/>
					<TextField model={this.registrationModel}
						modelProperty={"ConfirmPassword"}
						type="password"
						label="Confirm Password"
						onBlur={this.CheckPasswordMatch}
					/>
					<button type="submit">Register</button>
				</form>
			</>
		)
	}
	// Validate the form on the clientside.
	ValidateForm = (): boolean => {
		let error = '';
		let items = Object.keys(this.registrationModel);

		// get all the keys which are empty
		items = items.filter(v => {
			return this.registrationModel[v] == ''
		})

		if (items.length > 0) {
			error = `${items.join(", ")} are required`
			this.setState({ errorMessage: error })
			return false;
		}
		return true;
	}

	SubmitHandler = (event: any) => {
		event.preventDefault();
		if (!this.ValidateForm()) { return; }
		this.CheckPasswordMatch(null)
	}
	CheckPasswordMatch = (event: any) => {
		if (this.registrationModel.ConfirmPassword != this.registrationModel.Password) {
			this.setState({ errorMessage: "Passwords do not match" })
			return;
		}
		this.setState({ errorMessage: "" })
	}
}