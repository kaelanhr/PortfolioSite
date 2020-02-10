import React, { Component } from 'react'
import ImageLink, { Link } from './SocialLink'

export default class Contact extends Component {
	render() {
		return (
			<>
				<h1>Contact Me</h1>
				<div>
					<Link link="github.com" />
					<Link link="facebook.com" />
					<Link link="instagram.com" />
					<Link link="twitter.com" />
					<Link link="tumblr.com" />
				</div>
			</>
		)
	}
}