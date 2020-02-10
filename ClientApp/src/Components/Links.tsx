import React, { ReactNode } from 'react'

interface LinkProps {
	link: string
}

interface extendedLinkProps extends LinkProps {
	children: ReactNode | string
}

interface ImageLinkProps extends LinkProps {
	iconPath: string
	altText?: string
}

export default function ImageLink(props: ImageLinkProps) {
	return (
		<Link link={props.link}>
			<img src={props.iconPath} alt={props.altText} />
		</Link>
	)
}

export function Link(props: extendedLinkProps) {
	return (
		<a href={props.link}>{props.children}</a>
	)
}