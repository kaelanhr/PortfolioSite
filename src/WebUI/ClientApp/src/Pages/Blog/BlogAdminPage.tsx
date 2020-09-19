import React, { Component } from "react";
import Blog from "Models/Blog";
import TextField from "Components/Inputs/TextField";
import Checkbox from "Components/Inputs/Checkbox";
import MarkdownField from "Components/Inputs/MarkdownField";
import AdminCrudForm, { EntityAdminAction } from "Components/Form/AdminCrudForm";
import { observable, action } from "mobx";
import { observer } from "mobx-react";
import axios from 'axios';

interface CreatePageProps {
	model?: Blog;
	action: EntityAdminAction
}

@observer
export default class BlogCreatePage extends Component<CreatePageProps> {
	constructor(props: any) {
		super(props);
	}

	@observable
	private errorList: string[];

	@observable
	private model: Blog = this.props.model ?? new Blog();

	@observable
	private file: any = null;

	@action
	private onChange = (e: any) => {
		this.file = e.target.files[0];
	}

	@action
	SubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		let submission = new Blog(this.model);
		this.errorList = submission.validateModel();

		if (this.errorList.length > 0) {
		} else {
			if (this.props.action == "Create") {
				// submission.createModel();
				var bodyFormData = new FormData();

				bodyFormData.append("Title", submission.title);
				bodyFormData.append("File", this.file);

				axios({
					method: "post",
					url: "/Api/Blogs/",
					data: bodyFormData,
					headers: { "Content-Type": "multipart/form-data" },
				})
					.then(function (response) {
						//handle success
						console.log(response);
					})
					.catch(function (response) {
						//handle error
						console.log(response);
					});
			} else if (this.props.action == "Update") {
				// submission.editModel();
			}
		}
	};

	render() {
		return (
			<>
				<form onSubmit={(e) => this.SubmitHandler(e)}>
					<h1>File Upload</h1>
					<input type="file" onChange={this.onChange} />
					<button type="submit">Upload</button>
				</form>
				<AdminCrudForm
					entityAction={this.props.action}
					entityDisplayName="Blog"
					onSubmit={this.SubmitHandler}
					model={this.model}
					errorList={this.errorList}
				>
					<TextField
						model={this.model}
						modelProperty="title"
						type="text"
						label="Title"
						value={this.model.title}
					/>
				</AdminCrudForm>
			</>
		);
	}
}
