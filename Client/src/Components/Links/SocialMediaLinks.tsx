import { ReactComponent as GitHubLogo } from "./github.svg";
import { ReactComponent as LinkedInLogo } from "./linkedin.svg";
import { ReactComponent as MailIcon } from "./mail-icon.svg";
import React from "react";
import { ExternalLink } from "./ExternalLinks";
import { ImageLinkProps, LinkProps } from "./LinkProps";
const socialPath = "/Icons/Social/";

interface IProps {
	theme: "light" | "dark";
}

export default function SocialMediaLinks(props: IProps) {
	return (
		<>
			<div className={`social-links ${props.theme}`}>
				<ExternalLink
					link="https://github.com/KaeIan/"
					className="social-media-link"
				>
					<GitHubLogo />
				</ExternalLink>
				<ExternalLink
					link="https://www.linkedin.com/in/kaelan-reece/"
					className="social-media-link"
				>
					<LinkedInLogo />
				</ExternalLink>
				<ExternalLink
					link="mailto:kaelanreece@gmail.com"
					className="social-media-link"
				>
					<MailIcon />
				</ExternalLink>
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
