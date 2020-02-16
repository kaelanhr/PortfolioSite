import React, { Component } from 'react'
import axios from 'axios';
import { Redirect } from 'react-router';

export default class Logout extends Component {
	constructor(props) {
		super(props);
	}

	LogoutUser = async () => {
		await axios.post('/Identity/Account/Logout')
			.then(function (response) {
				console.log(response);
				//Perform action based on response
			})
			.catch(function (error) {
				console.log(error);
				//Perform action based on error
			})
	};
	render() {
		this.LogoutUser();
		return (
			<Redirect to='/' />
		)
	}
}
