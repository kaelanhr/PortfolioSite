import React, { Component, PureComponent } from 'react'

export default class Contact extends PureComponent {
	render() {
		return (
			<form>
				<h1>Contact Me</h1>
				<p>If you would like to contact me directly, please include your name, email and what you want to talk about in the fields below</p>
				<p>email</p>
				<input type="email" />
				<p>Message</p>
				<textarea />
				<input type="submit" />
			</form>
		);
	}
}