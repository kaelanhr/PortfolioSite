import React, { Component } from 'react'
import axios from 'axios';
import { Redirect } from 'react-router';
import { store } from '../store';

export default class Logout extends Component {
	constructor(props) {
		super(props);
	}

	LogoutUser = async () => {
		await axios.post('/Identity/Account/Logout')
			.then(function (response) {
				console.log(response);
				if (response.status == 200) {
					store.setUserLogin(false);
				}
			})
			.catch(function (error) {
				console.log(error);
			})
	};
	render() {
		this.LogoutUser();
		return (
			<Redirect to='/' />
		)
	}
}
