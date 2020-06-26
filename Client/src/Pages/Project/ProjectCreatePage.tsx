import React, { Component } from "react";
import { CreatePageNew } from "./CreatePage";
import Project from "Models/Project";
import TextField from "Components/Inputs/TextField";
import Checkbox from "Components/Inputs/Checkbox";
import MarkdownField from "Components/Inputs/MarkdownField";

export default class ProjectCreatePage extends Component {
	constructor(props: any) {
		super(props);
	}

	SubmitHandler = (event: React.FormEvent<HTMLFormElement>, model: Project) => {
		event.preventDefault();
		model.createProject();
	};

	render() {
		let newModel = new Project();
		return (
			<>
				<CreatePageNew
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
					<Checkbox model={newModel} modelProperty="highlight" />
					<MarkdownField model={newModel} modelProperty="content" />
				</CreatePageNew>
			</>
		);
	}
}
