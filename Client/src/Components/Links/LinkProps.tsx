import { ReactNode } from 'react';

interface LinkProps {
	link: string
	className?: string
}

export interface ExtendedLinkProps extends LinkProps {
	children: ReactNode
}

export interface ImageLinkProps extends LinkProps {
	iconPath: string
	altText?: string
}