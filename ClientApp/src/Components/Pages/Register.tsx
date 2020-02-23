import React, { Component } from 'react'

export default class Register extends Component {
	render() {
		return (
			<>
				<h1>Register</h1>
				<form>
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
}