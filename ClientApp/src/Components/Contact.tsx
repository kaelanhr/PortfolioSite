import React, { Component } from 'react'
import ImageLink, { ExternalLink } from './Links'

export default class Contact extends Component {
	render() {
		return (
			<>
				<h1>Contact Me</h1>

				<p>Please include your name, email and what you want to talk about in the fields below</p>
				<p>email</p>
				<input type="email" />
				<p>Message</p>
				<textarea />
				<p>You can also find me at any of the following links</p>
				<div>
					<ExternalLink link="github.com">Github</ExternalLink>
					<ExternalLink link="facebook.com">Facebook</ExternalLink>
					<ExternalLink link="instagram.com" >Instagram</ExternalLink>
					<ExternalLink link="twitter.com" >Twitter</ExternalLink>
					<ExternalLink link="tumblr.com" >Tumblr</ExternalLink>
					<ExternalLink link="pinterest.com" >Pinterest</ExternalLink>
					<ExternalLink link="youtube.com" >Youtube</ExternalLink>
				</div>
			</>
		)
	}
}