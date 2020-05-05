import React from "react";
import { ExternalLink } from "./ExternalLinks";
import { ImageLinkProps } from "./LinkProps";
const socialPath = "/Icons/Social/";

export default function SocialMediaLinks() {
	return (
		<>
			{/* <SocialMediaLink link="https://www.facebook.com/darkwolf88v" iconPath="facebook.png" /> */}
			{/* <SocialMediaLink link="https://www.instagram.com/kaelanreece" iconPath="instagram.png" /> */}
			{/* <SocialMediaLink link="https://twitter.com/KaelanReece" iconPath="twitter.png" />
			<SocialMediaLink link="https://real-life-wolf.tumblr.com/" iconPath="tumblr.png" />
			<SocialMediaLink link="https://www.pinterest.com.au/darkwolf_v/" iconPath="pinterest.png" />
		<SocialMediaLink link="https://www.youtube.com/channel/UCkvCPSOUTjSiF2yFwnXhnsQ" iconPath="youtube.png" /> */}
			{/* <SocialMediaLink link="https://www.patreon.com/darkwolf_v" iconPath="patreon.png" /> */}
			<SocialLink link="https://github.com/KaeIan/" iconPath="github.png" />
			<SocialLink
				link="https://www.linkedin.com/in/kaelan-reece/"
				iconPath="linkedin.png"
			/>

			<SocialLink
				link="mailto:kaelanreece@gmail.com"
				iconPath="mailicon-white.png"
			/>
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
