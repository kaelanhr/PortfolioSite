import React, { Component } from "react";
import Blog from "Models/Blog";
import TextField from "Components/Inputs/TextField";
import Checkbox from "Components/Inputs/Checkbox";
import MarkdownField from "Components/Inputs/MarkdownField";
import AdminCrudForm, { EntityAdminAction } from "Components/Form/AdminCrudForm";
import { observable, action } from "mobx";
import { observer } from "mobx-react";

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

	@action
	SubmitHandler = (event: React.FormEvent<HTMLFormElement>, model: Blog) => {
		event.preventDefault();

		let submission = new Blog(model);
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
