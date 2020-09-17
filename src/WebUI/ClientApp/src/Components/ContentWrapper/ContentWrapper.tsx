import React from "react";

export interface ContentWrapperProps {
	children?: React.ReactNode;
	wrapperType: "list-wrapper" | "content-wrapper";
}

export default function ContentWrapper(props: ContentWrapperProps) {
	return <div className={props.wrapperType}>{props.children}</div>;
}
