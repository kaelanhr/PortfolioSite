import React, { Component } from "react";
import { observer } from "mobx-react";
import { action } from "mobx";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";

export interface MarkdownFieldProps<T> {
	model: T;
	modelProperty: string;
	value?: string;
}

export default class MarkdownField<T> extends Component<MarkdownFieldProps<T>> {
	private mdParser = new MarkdownIt();
	render() {
		return (
			<>
				<MdEditor
					value={this.props.value}
					renderHTML={(text) => this.mdParser.render(text)}
					onChange={(text) => this.handleUserInput(text.text)}
				/>
			</>
		);
	}

	private handleUserInput = (text: string) => {
		console.log("updating content");
		console.log(text);
		this.props.model[this.props.modelProperty] = text
	};
}
