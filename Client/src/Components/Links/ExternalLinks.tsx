import React from "react";
import { ExtendedLinkProps, ImageLinkProps } from "./LinkProps";

export default function ExternalImageLink(props: ImageLinkProps) {
	return (
		<ExternalLink link={props.link}>
			<img src={props.iconPath} alt={props.altText} />
		</ExternalLink>
	);
}

export function ExternalLink(props: ExtendedLinkProps) {
	// I do not like it when external links take you away, new tab it is.
	return (
		<a href={props.link} target="_blank" rel="noopener noreferrer" className={props.className}>
			{props.children}
		</a>
	);
}
