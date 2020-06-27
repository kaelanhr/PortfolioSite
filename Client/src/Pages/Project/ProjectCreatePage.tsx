import React, { Component } from "react";
import Project from "Models/Project";
import TextField from "Components/Inputs/TextField";
import Checkbox from "Components/Inputs/Checkbox";
import MarkdownField from "Components/Inputs/MarkdownField";
import CreateUpdateForm from 'Components/Form/CreateUpdateForm';

export default class ProjectCreatePage extends Component {
	constructor(props: any) {
		super(props);
	}

	SubmitHandler = (event: React.FormEvent<HTMLFormElement>, model: any) => {
		event.preventDefault();
		model.createProject();
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
