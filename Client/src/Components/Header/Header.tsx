import React from "react";

interface IProps {
	name: string;
	children?: React.ReactNode;
}

export default function HeaderContent(props: IProps) {
return <div className={`header ${props.name}`}>{props.children}</div>
}
