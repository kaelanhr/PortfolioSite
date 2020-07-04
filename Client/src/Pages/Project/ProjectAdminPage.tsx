import React, { Component } from "react";
import Project from "Models/Project";
import TextField from "Components/Inputs/TextField";
import Checkbox from "Components/Inputs/Checkbox";
import MarkdownField from "Components/Inputs/MarkdownField";
import AdminCrudForm, { EntityAdminAction } from "Components/Form/AdminCrudForm";
import { observable, action } from "mobx";
import { observer } from "mobx-react";

interface CreatePageProps {
	model?: Project;
	action: EntityAdminAction
}

@observer
export default class ProjectCreatePage extends Component<CreatePageProps> {
	constructor(props: any) {
		super(props);
	}

	@observable
	private errorList: string[];

	@observable
	private model: Project = this.props.model ?? new Project();

	@action
	SubmitHandler = (event: React.FormEvent<HTMLFormElement>, model: Project) => {
		event.preventDefault();

		let submission = new Project(model);
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
					entityDisplayName="Project"
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
					<TextField
						model={this.model}
						modelProperty="projectUrl"
						type="text"
						label="Project Url"
						value={this.model.projectUrl}
					/>
					<Checkbox
						model={this.model}
						modelProperty="highlight"
						label="Highlighted"
					/>
					<MarkdownField
						model={this.model}
						modelProperty="content"
						label="Content"
						placeholder="Project Content"
						value={this.model.content}
					/>
				</AdminCrudForm>
			</>
		);
	}
}
