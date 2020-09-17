import React from "react";
import { IfAdmin } from "Components/Conditional/If";

interface AdminActionProps {
	children?: React.ReactNode;
}

export default function AdminAction(props: AdminActionProps) {
	return (
		<IfAdmin>
			<div className="admin-action">{props.children}</div>
		</IfAdmin>
	);
}
