import React from "react";
import { ExternalLink } from "./ExternalLinks";
import { ImageLinkProps } from "./LinkProps";
const socialPath = "/Icons/Social/";

export default function SocialMediaLinks() {
	return (
		<>
			<div className="social-links">
				<SocialLink link="https://github.com/KaeIan/" iconPath="github.svg" />
				<SocialLink
					link="https://www.linkedin.com/in/kaelan-reece/"
					iconPath="linkedin.svg"
				/>
				<SocialLink
					link="mailto:kaelanreece@gmail.com"
					iconPath="mailicon-white.png"
				/>
			</div>
		</>
	);
}

function SocialLink(props: ImageLinkProps) {
	return (
		<ExternalLink link={props.link}>
			<img
				src={`${socialPath}${props.iconPath}`}
				alt={props.altText}
				className="social-media-link"
			/>
		</ExternalLink>
	);
}
