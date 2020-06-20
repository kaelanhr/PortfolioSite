// import react, react-markdown-editor-lite, and a markdown parser you like
import React, { Component } from "react";
// import style manually
import "react-markdown-editor-lite/lib/index.css";
import { CreatePageNew } from "./CreatePage";
import Project from "../../Models/Project";
import TextField from "../Inputs/TextField";

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
				<TextField model={newModel} modelProperty="title" type="text"/>
				<CreatePageNew
					entityAction="Create"
					entityDisplayName="Project"
					onSubmit={this.SubmitHandler}
					model={newModel}
					modelProperty={"content"}
				/>
			</>
		);
	}
}
