// import react, react-markdown-editor-lite, and a markdown parser you like
import MarkdownIt from "markdown-it";
import { observable } from "mobx";
import React, { Component } from "react";
import MdEditor from "react-markdown-editor-lite";
// import style manually
import "react-markdown-editor-lite/lib/index.css";
import Back from "Components/Button/Back";

interface IProps {
	entityAction: EntityAdminAction;
}

interface MarkdownProps {
	html: string;
	text: string;
}

export type EntityAdminAction = "Create" | "Update";

export default class BlogEntity extends Component<IProps> {
	constructor(props: any) {
		super(props);
	}
	mdParser = new MarkdownIt();

	@observable
	EditorContent = "";

	handleEditorChange = (markdownInput: MarkdownProps) => {
		this.EditorContent = markdownInput.text;
	};

	SubmitHandler = (event: any) => {
		console.log(this.EditorContent);
	};

	render() {
		return (
			<>
				<h1>{this.props.entityAction} A blog</h1>
				<form onSubmit={this.SubmitHandler}>
					<MdEditor
						value=""
						renderHTML={(text) => this.mdParser.render(text)}
						onChange={this.handleEditorChange}
					/>
					<input type="submit" value={this.props.entityAction + " Blog"} />
				</form>
				<Back />
			</>
		);
	}
}
