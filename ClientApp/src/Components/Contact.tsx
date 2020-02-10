import React, { Component } from 'react'
import ImageLink, { Link } from './SocialLink'

export default class Contact extends Component {
	render() {
		return (
			<>
				<h1>Contact Me</h1>
				<div>
					<ImageLink link="google.com" iconPath="https://images-na.ssl-images-amazon.com/images/I/81UeYuulNjL._SX522_.jpg" />
					<Link link="google.com">Get Good</Link>
				</div>
			</>
		)
	}
}
