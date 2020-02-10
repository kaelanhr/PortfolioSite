import React, { ReactNode } from 'react'

type LinkProps = {
	link: string
	children?: ReactNode | String
}
interface ImageLinkProps extends LinkProps {
	iconPath: string
}

export default function ImageLink(props: ImageLinkProps) {
	return (
		<Link link={props.link}>
			<img src={props.iconPath} />
		</Link>
	)
}

export function Link(props: LinkProps) {
	return (
		<a href={props.link}>{props.children}</a>
	)
}