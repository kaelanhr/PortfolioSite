import axios from "axios";
import AdminCrudForm, {
	EntityAdminAction
} from "Components/Form/AdminCrudForm";
import TextField from "Components/Inputs/TextField";
import { action, observable } from "mobx";
import { observer } from "mobx-react";
import Blog from "Models/Blog";
import React, { Component } from "react";
import UploadFile from "../../Components/Inputs/UploadFile";

interface CreatePageProps {
	model?: Blog;
	action: EntityAdminAction;
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
					<UploadFile
						model={this.model}
						modelProperty="headerImageFile"
						label="Header Image"
					/>
				</AdminCrudForm>
			</>
		);
	}
}
