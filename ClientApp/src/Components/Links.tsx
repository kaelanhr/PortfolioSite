import React, { ReactNode } from 'react'

interface LinkProps {
	link: string
}

interface extendedLinkProps extends LinkProps {
	children: ReactNode
}

export interface ImageLinkProps extends LinkProps {
	iconPath: string
	altText?: string
}

export default function ImageLink(props: ImageLinkProps) {
	return (
		<ExternalLink link={props.link}>
			<img src={props.iconPath} alt={props.altText} />
		</ExternalLink>
	)
}

export function ExternalLink(props: extendedLinkProps) {
	return (
		<a href={props.link}>{props.children}</a>
	)
}