// import react, react-markdown-editor-lite, and a markdown parser you like
import { observable } from "mobx";
import { observer } from "mobx-react";
import React, { Component } from "react";
import Back from "Components/Button/Back";
import TextField from "Components/Inputs/TextField";
import ErrorMessage from "Components/Text/ErrorMessage";
import Blog from "Models/Blog";
import { RouteComponentProps } from 'react-router';

@observer
export default class BlogCategoryEditPage extends Component<RouteComponentProps> {
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
				<h1>Update A blog Category</h1>
				<p>{this.props.match.params["id"]}</p>
				<form onSubmit={this.SubmitHandler}>
					<ErrorMessage>{this.errorMessage}</ErrorMessage>
					<TextField
						model={this.BlogCategoryModel}
						modelProperty={"title"}
						type="text"
						label="Title"
						value={this.BlogCategoryModel.title}
					/>
					<input type="submit" value={'Update Blog'} />
				</form>
				<Back />
			</>
		);
	}
}
