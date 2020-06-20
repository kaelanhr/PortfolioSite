// import react, react-markdown-editor-lite, and a markdown parser you like
import MarkdownIt from "markdown-it";
import { observable } from "mobx";
import React, { Component, useState } from "react";
import MdEditor from "react-markdown-editor-lite";
// import style manually
import "react-markdown-editor-lite/lib/index.css";
import Back from "../Button/Back";
import AbstractModel from "../../Models/AbstractModel";
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
	const [editorContent, setEditorContent] = useState("");

	return (
		<>
			<h1>
				{props.entityAction} A {props.entityDisplayName}
			</h1>
			<form onSubmit={(event) => props.onSubmit(event, props.model)}>
				{/* <MdEditor
					value=""
					renderHTML={(text) => mdParser.render(text)}
					onChange={(text) => setEditorContent(text.text)}
				/> */}
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
