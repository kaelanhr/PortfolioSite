import React, { Component } from "react";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import { InputFieldProps } from "./InputFieldProps";

export interface MarkdownFieldProps<T> extends InputFieldProps<T> {
	value?: string;
	placeholder?: string;
}

export default class MarkdownField<T> extends Component<MarkdownFieldProps<T>> {
	private mdParser = new MarkdownIt();
	render() {
		return (
			<>
				<label>{this.props.label}</label>
				<MdEditor
					value={this.props.value}
					renderHTML={(text) => this.mdParser.render(text)}
					onChange={(text) => this.handleUserInput(text.text)}
					placeholder={this.props.placeholder}
				/>
			</>
		);
	}

	private handleUserInput = (text: string) => {
		this.props.model[this.props.modelProperty] = text;
	};
}
