import React from "react";
import NavWrapper from "../Components/Navigation/NavWrapper";

interface IProps {
	displayHeader: boolean;
	headerComponent: React.ReactNode;
	children: React.ReactNode;
}

export default function PageLayout(props: IProps) {
	return (<>
		<NavWrapper displayHeader={props.displayHeader}>
			{props.headerComponent}
		</NavWrapper>
		{props.children}
	</>);
}
