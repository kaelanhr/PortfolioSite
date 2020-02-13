import React, { Component, PureComponent } from 'react'
import { ImageLinkProps, ExternalLink } from './Links';

export default class About extends PureComponent {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<>
				<h2>About</h2>

				<p>You can find me at any of the following platforms</p>
				<div>
					<SocialMediaLink link="https://github.com/KaeIan/" iconPath="github.png" />
					<SocialMediaLink link="https://www.facebook.com/darkwolf88v" iconPath="facebook.png" />
					<SocialMediaLink link="https://www.instagram.com/kaelanreece" iconPath="instagram.png" />
					<SocialMediaLink link="https://twitter.com/KaelanReece" iconPath="twitter.png" />
					<SocialMediaLink link="https://real-life-wolf.tumblr.com/" iconPath="tumblr.png" />
					<SocialMediaLink link="https://www.pinterest.com.au/darkwolf_v/" iconPath="pinterest.png" />
					<SocialMediaLink link="https://www.youtube.com/channel/UCkvCPSOUTjSiF2yFwnXhnsQ" iconPath="youtube.png" />
					<SocialMediaLink link="https://www.linkedin.com/in/kaelan-reece/" iconPath="" />
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