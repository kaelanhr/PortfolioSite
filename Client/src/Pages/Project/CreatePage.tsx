import React from "react";
import Back from "Components/Button/Back";

interface IProps<T> {
	entityAction: EntityAdminAction;
	entityDisplayName: string;
	model: T;
	onSubmit: (event: React.FormEvent<HTMLFormElement>, model: T) => void;
	children?: React.ReactNode;
}

export type EntityAdminAction = "Create" | "Update";

export function CreatePageNew<T>(props: IProps<T>) {
	return (
		<>
			<div className="content-wrapper">
				<div className="admin-form">
					<h1>
						{props.entityAction} A {props.entityDisplayName}
					</h1>
					<form onSubmit={(event) => props.onSubmit(event, props.model)}>
						{props.children}
						<input
							type="submit"
							value={`${props.entityAction} ${props.entityDisplayName}`}
						/>
					</form>
					<Back />
				</div>
			</div>
		</>
	);
}
