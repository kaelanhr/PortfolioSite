import React, { Component } from 'react'
import ImageLink, { Link } from './Links'

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
					<Link link="github.com">Github</Link>
					<Link link="facebook.com">Facebook</Link>
					<Link link="instagram.com" >Instagram</Link>
					<Link link="twitter.com" >Twitter</Link>
					<Link link="tumblr.com" >Tumblr</Link>
					<Link link="pinterest.com" >Pinterest</Link>
					<Link link="youtube.com" >Youtube</Link>
				</div>
			</>
		)
	}
}