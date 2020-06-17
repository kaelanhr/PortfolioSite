import React from "react";
import NavigationBar, { NavBarProps } from "./NavigationBar";

interface IProps extends NavBarProps {
	children?: React.ReactNode;
}

export default function NavWrapper(props: IProps) {
	return (
		<>
			<NavigationBar displayHeader={props.displayHeader} />
				{props.children}
			<div className="navigation-bar" />
		</>)
}