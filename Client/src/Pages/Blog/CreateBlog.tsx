import React, { Component } from "react";
import Back from "../../Components/Button/Back";
// import react, react-markdown-editor-lite, and a markdown parser you like
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
// import style manually
import "react-markdown-editor-lite/lib/index.css";

// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);

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
	mdParser = new MarkdownIt(/* Markdown-it options */);

	// Initialize a markdown parser
	// Finish!
	handleEditorChange = (markdownInput: MarkdownProps) => {
		console.log("handleEditorChange", markdownInput.html, markdownInput.text);
	};

	render() {
		return (
			<>
				<h1>{this.props.entityAction} A blog</h1>
				<form>
					<h2>Title</h2>
					<input type="text" />
					<h2>Content</h2>
					<input type="text" />
					<input
						type="submit"
						value={
							(this.props.entityAction == "Create"
								? this.props.entityAction
								: "Update") + " Blog"
						}
					/>
				</form>
				<MdEditor
					value=""
					style={{ height: "500px" }}
					renderHTML={(text) => this.mdParser.render(text)}
					onChange={this.handleEditorChange}
				/>
				<Back />
			</>
		);
	}
}
