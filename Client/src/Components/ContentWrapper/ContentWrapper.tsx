import React from "react";

interface ContentWrapperProps {
	children?: React.ReactNode;
}

export default function ContentWrapper(props: ContentWrapperProps) {
	return <div className="content-wrapper">{props.children}</div>;
}
