import React, { Component } from 'react'
import { ImageLinkProps, ExternalLink } from './Links';

interface AboutProps {
	title: string
}

export default class About extends Component<AboutProps> {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<>
				<h2>{this.props.title}</h2>

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
			</>
		)
	}
}

function SocialMediaLink(props: ImageLinkProps) {
	return (
		<ExternalLink link={props.link}>
			<img src={`/Images/SocialMedia/${props.iconPath}`} alt={props.altText} className="social-media-link" />
		</ExternalLink>
	)
}