import React, { Component, PureComponent } from 'react'
import ImageLink, { ExternalLink, ImageLinkProps } from './Links'

export default class Contact extends Component {
	render() {
		return (
			<>
				<h1>Contact Me</h1>

				<p>You can find me at any of the following platforms</p>
				<div>
					<SocialMediaLink link="github.com" iconPath="github.png" />
					<SocialMediaLink link="facebook.com" iconPath="facebook.png" />
					<SocialMediaLink link="instagram.com" iconPath="instagram.png" />
					<SocialMediaLink link="twitter.com" iconPath="twitter.png" />
					<SocialMediaLink link="tumblr.com" iconPath="tumblr.png" />
					<SocialMediaLink link="pinterest.com" iconPath="pinterest.png" />
					<SocialMediaLink link="youtube.com" iconPath="youtube.png" />
				</div>


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

function SocialMediaLink(props: ImageLinkProps) {
	return (
		<ExternalLink link={props.link}>
			<img src={`/Images/SocialMedia/${props.iconPath}`} alt={props.altText} className="social-media-link" />
		</ExternalLink>
	)
}