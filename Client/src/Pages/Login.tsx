import axios from "axios";
import { observable } from "mobx";
import { observer } from "mobx-react";
import React, { Component } from "react";
import TextField from "Components/Inputs/TextField";
import ErrorMessage from "Components/Text/ErrorMessage";
import { store } from "store";

interface LoginState {
	errorMessage: string;
}

const loginError = "Username/Password Combination is incorrect.";

@observer
export default class Login extends Component<{}, LoginState> {
	constructor(props: any) {
		super(props);
		this.state = {
			errorMessage: "",
		};
	}

	@observable
	private LoginModel = {
		Password: "",
		Email: "",
	};

	render() {
		return (
			<>
				<form onSubmit={this.SubmitHandler}>
					<ErrorMessage>{this.state.errorMessage}</ErrorMessage>
					<TextField
						model={this.LoginModel}
						modelProperty={"Email"}
						type="email"
						placeholder="Email"
					/>
					<TextField
						model={this.LoginModel}
						modelProperty={"Password"}
						type="password"
						placeholder="Password"
					/>
					<input type="submit" value="Login" />
				</form>
			</>
		);
	}

	// Validate the form on the clientside.
	ValidateForm = (): boolean => {
		if (this.LoginModel.Email == "" || this.LoginModel.Password == "") {
			this.setState({ errorMessage: "Email/Password is Required" });
			return false;
		}
		this.setState({ errorMessage: "" });
		return true;
	};
	SubmitHandler = (event: any) => {
		event.preventDefault();
		if (!this.ValidateForm()) {
			return;
		}

		axios
			.post("/Identity/Account/Login", {
				Email: this.LoginModel.Email,
				Password: this.LoginModel.Password,
			})
			.then(function (response) {
				console.log(response);
				store.CheckUserSession();
				store.history.push("/");
			})
			.catch((error) => {
				console.log(error);
				if (this.state.errorMessage != loginError) {
					this.setState({ errorMessage: loginError });
				}
			});
	};
}
