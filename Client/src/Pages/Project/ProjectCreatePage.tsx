import React, { Component } from "react";
import Project from "Models/Project";
import TextField from "Components/Inputs/TextField";
import Checkbox from "Components/Inputs/Checkbox";
import MarkdownField from "Components/Inputs/MarkdownField";
import CreateUpdateForm from "Components/Form/CreateUpdateForm";
import { observable, action } from 'mobx';
import { observer } from 'mobx-react';

@observer
export default class ProjectCreatePage extends Component {
	constructor(props: any) {
		super(props);
	}

	@observable
	private errorList: string[];

	@action
	SubmitHandler = (event: React.FormEvent<HTMLFormElement>, model: Project) => {
		event.preventDefault();

		this.errorList = model.validate()

		if (this.errorList.length > 0) {
		} else {
			model.createProject();
		}
	};

	render() {
		let newModel = new Project();
		return (
			<>
				<CreateUpdateForm
					entityAction="Create"
					entityDisplayName="Project"
					onSubmit={this.SubmitHandler}
					model={newModel}
					errorList={this.errorList}
				>
					<TextField
						model={newModel}
						modelProperty="title"
						type="text"
						label="Title"
					/>
					<TextField
						model={newModel}
						modelProperty="projectUrl"
						type="text"
						label="Project Url"
					/>
					<Checkbox
						model={newModel}
						modelProperty="highlight"
						label="Highlighted"
					/>
					<MarkdownField
						model={newModel}
						modelProperty="content"
						label="Content"
						placeholder="Project Content"
					/>
				</CreateUpdateForm>
			</>
		);
	}
}
