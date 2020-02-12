import React, { Component, PureComponent } from 'react'
import ImageLink, { ExternalLink, ImageLinkProps } from './Links'

export default class Contact extends Component {
	render() {
		return (
			<>
				<h1>Contact Me</h1>




				<p>TODO: Add show/hide component here so people can contact me directly</p>

				<ContactForm />
			</>
		)
	}
}

class ContactForm extends PureComponent {
	render() {
		return (
			<form>
				<h2>Contact Directly</h2>
				<p>If you would like to contact me directly, please include your name, email and what you want to talk about in the fields below</p>
				<p>email</p>
				<input type="email" />
				<p>Message</p>
				<textarea />
				<p>You can also find me at any of the following links</p>
				<input type="submit" />
			</form>
		);
	}
}