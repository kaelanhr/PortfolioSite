// import react, react-markdown-editor-lite, and a markdown parser you like
import axios from "axios";
import { observable } from "mobx";
import { observer } from "mobx-react";
import React, { Component } from "react";
// import style manually
import Back from "../../Components/Button/Back";
import TextField from "../../Components/Inputs/TextField";
import ErrorMessage from "../../Components/Text/ErrorMessage";
import { store } from "../../store";

interface IProps {
	entityAction: EntityAdminAction;
}

export type EntityAdminAction = "Create" | "Update";

@observer
export default class BlogCreatePage extends Component<IProps> {
	constructor(props: any) {
		super(props);
	}

	@observable
	private BlogCategoryModel = {
		Title: "",
	};

	@observable
	private errorMessage = "";

	SubmitHandler = (event: any) => {
		event.preventDefault();
		if (this.BlogCategoryModel.Title === "") {
			this.errorMessage = "Blog Title is required";
			return;
		}

		axios
			.post("/Api/Blog/Create", {
				Title: this.BlogCategoryModel.Title,
			})
			.then(function (response) {
				console.log(response);
				store.history.push("/blog");
			})
			.catch((error) => {
				console.log(error);
				this.errorMessage = "There was an error submitting your request";
			});
	};

	render() {
		return (
			<>
				<h1>{this.props.entityAction} A blog Category</h1>
				<form onSubmit={this.SubmitHandler}>
					<ErrorMessage>{this.errorMessage}</ErrorMessage>
					<TextField
						model={this.BlogCategoryModel}
						modelProperty={"Title"}
						type="text"
						label="Title"
					/>
					<input type="submit" value={this.props.entityAction + " Blog"} />
				</form>
				<Back />
			</>
		);
	}
}
