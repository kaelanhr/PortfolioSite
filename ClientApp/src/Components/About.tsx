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
					<SocialMediaLink link="https://github.com/KaeIan/" iconPath="github.png" />
					<SocialMediaLink link="https://www.facebook.com/darkwolf88v" iconPath="facebook.png" />
					<SocialMediaLink link="https://www.instagram.com/kaelanreece" iconPath="instagram.png" />
					<SocialMediaLink link="https://twitter.com/KaelanReece" iconPath="twitter.png" />
					<SocialMediaLink link="tumblr.com" iconPath="tumblr.png" />
					<SocialMediaLink link="pinterest.com" iconPath="pinterest.png" />
					<SocialMediaLink link="youtube.com" iconPath="youtube.png" />
					<SocialMediaLink link="linkedin" iconPath="" />
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