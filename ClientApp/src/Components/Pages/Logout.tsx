import React from 'react'
import axios from 'axios';

export default function Logout() {
	axios.post('/Identity/Account/Logout')
		.then(function (response) {
			console.log(response);
			//Perform action based on response
		})
		.catch(function (error) {
			console.log(error);
			//Perform action based on error
		});
	return (
		null
	)
}