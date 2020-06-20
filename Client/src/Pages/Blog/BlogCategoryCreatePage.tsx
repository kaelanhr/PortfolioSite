// import react, react-markdown-editor-lite, and a markdown parser you like
import axios from "axios";
import { observable } from "mobx";
import { observer } from "mobx-react";
import React, { Component } from "react";
import Back from "../../Components/Button/Back";
import TextField from "../../Components/Inputs/TextField";
import ErrorMessage from "../../Components/Text/ErrorMessage";
import Blog from "../../Models/Blog";

export interface BlogProps {
	entityAction: EntityAdminAction;
}

export type EntityAdminAction = "Create" | "Update";

@observer
export default class BlogCategoryCreatePage extends Component<BlogProps> {
	constructor(props: any) {
		super(props);
	}

	@observable
	private BlogCategoryModel = new Blog({title: ""});

	@observable
	private errorMessage = "";

	SubmitHandler = (event: any) => {
		event.preventDefault();
		let validateResult = this.BlogCategoryModel.validate();
		validateResult.length > 0 ? this.errorMessage = validateResult.toString() : this.BlogCategoryModel.createBlog();
	};

	render() {
		console.log(this.BlogCategoryModel["title"]);
		return (
			<>
				<h1>{this.props.entityAction} A blog Category</h1>
				<form onSubmit={this.SubmitHandler}>
					<ErrorMessage>{this.errorMessage}</ErrorMessage>
					<TextField
						model={this.BlogCategoryModel}
						modelProperty={"title"}
						type="text"
						label="Title"
						value={this.BlogCategoryModel.title}
					/>
					<input type="submit" value={this.props.entityAction + " Blog"} />
				</form>
				<Back />
			</>
		);
	}
}
