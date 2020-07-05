import React, { Component } from "react";
import Blog from "Models/Blog";
import TextField from "Components/Inputs/TextField";
import Checkbox from "Components/Inputs/Checkbox";
import MarkdownField from "Components/Inputs/MarkdownField";
import AdminCrudForm, { EntityAdminAction } from "Components/Form/AdminCrudForm";
import { observable, action } from "mobx";
import { observer } from "mobx-react";
import BlogPosts from 'Models/BlogPost';
import { RouteComponentProps } from 'react-router';

interface CreatePageProps extends RouteComponentProps {
	model?: BlogPosts;
	action: EntityAdminAction
}

@observer
export default class BlogPostAdminForm extends Component<CreatePageProps> {
	constructor(props: any) {
		super(props);

		this.fetchBlogs();
	}

	@action
	fetchBlogs = () => {
		Blog.getModel().then((response: any) => {
			this.blogs = response
			console.log(this.blogs);
		});
	}

	@observable
	private errorList: string[];

	@observable
	private model: BlogPosts =
		this.props.model ??
		new BlogPosts({ blogId: this.props.match.params["id"] ?? "" });

	@observable
	private blogs: Blog[] = [];

	@action
	SubmitHandler = (
		event: React.FormEvent<HTMLFormElement>,
		model: BlogPosts
	) => {
		event.preventDefault();

		let submission = new BlogPosts(model);
		this.errorList = submission.validateModel();

		if (this.errorList.length > 0) {
		} else {
			if (this.props.action == "Create") {
				submission.createModel();
			} else if (this.props.action == "Update") {
				submission.editModel();
			}
		}
	};

	render() {
		return (
			<>
				<AdminCrudForm
					entityAction={this.props.action}
					entityDisplayName="Blog Post"
					onSubmit={this.SubmitHandler}
					model={this.model}
					errorList={this.errorList}
				>
					<select>
						{this.blogs?.map((x) => <option value= {x.id}>{x.title}</option>) ?? ""}
					</select>
					<TextField
						model={this.model}
						modelProperty="title"
						type="text"
						label="Title"
						value={this.model.title}
					/>
					<MarkdownField
						model={this.model}
						modelProperty="content"
						label="Content"
						value={this.model.content}
					/>
				</AdminCrudForm>
			</>
		);
	}
}
