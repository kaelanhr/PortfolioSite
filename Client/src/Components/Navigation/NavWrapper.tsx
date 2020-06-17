import React from "react";
import NavigationBar from "./NavigationBar";

interface IProps {
	children?: React.ReactNode;
}

export default function NavWrapper(props: IProps) {
	return (
		<>
			<NavigationBar displayHeader={false} />
				{props.children}
			<div className="navigation-bar" />
		</>)
}