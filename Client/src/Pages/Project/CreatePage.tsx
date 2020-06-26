import React from "react";
import Back from "Components/Button/Back";
import MarkdownField from "Components/Inputs/MarkdownField";

interface IProps<T> {
	entityAction: EntityAdminAction;
	entityDisplayName: string;
	model: T;
	onSubmit: (event: React.FormEvent<HTMLFormElement>, model: any) => void;
	children?: React.ReactNode;
}

export type EntityAdminAction = "Create" | "Update";

export function CreatePageNew<T>(props: IProps<T>) {
	return (
		<>
			<h1>
				{props.entityAction} A {props.entityDisplayName}
			</h1>
			<form onSubmit={(event) => props.onSubmit(event, props.model)}>
				{props.children}
				<input type="submit" value={props.entityAction + " Project"} />
			</form>
			<Back />
		</>
	);
}
