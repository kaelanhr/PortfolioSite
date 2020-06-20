// import react, react-markdown-editor-lite, and a markdown parser you like
import React, { Component, useState } from "react";
// import style manually
import Back from "../Button/Back";
import MarkdownField from "../Inputs/MarkdownField";

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
