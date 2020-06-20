import React, { Component } from "react";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";

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
		this.props.model[this.props.modelProperty] = text
	};
}
