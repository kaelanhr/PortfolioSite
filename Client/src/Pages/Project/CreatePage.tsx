import React from "react";
import Back from "Components/Button/Back";
import MarkdownField from 'Components/Inputs/MarkdownField';

interface IProps<T> {
	entityAction: EntityAdminAction;
	entityDisplayName: string;
	model: T;
	modelProperty: string;
	onSubmit: (event: React.FormEvent<HTMLFormElement>, model: any) => void;
}

export type EntityAdminAction = "Create" | "Update";

export function CreatePageNew<T>(props: IProps<T>) {
	return (
		<>
			<h1>
				{props.entityAction} A {props.entityDisplayName}
			</h1>
			<form onSubmit={(event) => props.onSubmit(event, props.model)}>
				<MarkdownField
					model={props.model}
					modelProperty={props.modelProperty}
				/>
				<input type="submit" value={props.entityAction + " Project"} />
			</form>
			<Back />
		</>
	);
}
