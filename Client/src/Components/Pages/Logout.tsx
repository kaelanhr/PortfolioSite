import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router";
import { store } from "../store";

export default class Logout extends Component {
	constructor(props: any) {
		super(props);
	}

	LogoutUser = async () => {
		await axios
			.post("/Identity/Account/Logout")
			.then(function (response) {
				console.log(response);
				store.CheckUserSession()
				store.history.push("/");
			})
			.catch(function (error) {
				console.log(error);
			});
	};
	render() {
		this.LogoutUser();
		return <Redirect to="/" />;
	}
}
