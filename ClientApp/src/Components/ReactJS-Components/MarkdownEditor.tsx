import React, { Component } from 'react'
import { Remarkable } from 'remarkable';

interface IState {
	value: any
}

export default class MarkdownEditor extends Component<{}, IState> {
	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
		this.state = { value: 'Hello, ** world**!' };
	}
	handleChange(e) {
		this.setState({ value: e.target.value });
	}
	getRawMarkup() {
		const md = new Remarkable();
		return { __html: md.render(this.state.value) };
	}

	render() {
		return (
			<div className="MarkdownEditor">
				<h3>Input</h3>
				<label htmlFor="markdown-content">
					Enter some markdown
				</label>
				<textarea
					id="markdown-content"
					onChange={this.handleChange}
					defaultValue={this.state.value}
				/>
				<h3>Output</h3>
				<div className="content"
					dangerouslySetInnerHTML={this.getRawMarkup()}
				/>
			</div>
		)
	}
}
