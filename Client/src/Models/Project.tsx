import AbstractModel, { IAbstractAttributes } from "./AbstractModel";
import axios from "axios";
import { store } from "store";

export default class Project extends AbstractModel
	implements IProjectAttributes {
	constructor(attributes?: Partial<IProjectAttributes>) {
		super(attributes);

		if (attributes) {
			if (attributes.title) {
				this.title = attributes.title;
			}
			if (attributes.headerImagePath) {
				this.headerImagePath = attributes.headerImagePath;
			}
			if (attributes.content) {
				this.content = attributes.content;
			}
			if (attributes.highlight) {
				this.highlight = attributes.highlight;
			}
		}
	}
	public content: string;
	public headerImagePath?: string;
	public title: string;
	public highlight: boolean;

	public createProject = () => {
		axios
			.post("/Api/Project", {
				Title: this.title,
				content: this.content,
				highlight: this.highlight
			})
			.then(function (response) {
				console.log(response);
				store.history.push("/projects");
			})
			.catch((error) => {
				console.log(error);
				return "There was an error submitting your request";
			});
		return "";
	};

	public validate = () => {
		let errorsArray: string[] = [];
		if (!this.title) {
			errorsArray.push("Project Title is required");
		}
		if (!this.content) {
			errorsArray.push("Content Cannot be empty");
		}
		return errorsArray;
	};
}

export interface IProjectAttributes extends IAbstractAttributes {
	highlight: boolean;
	title: string;
	content: string;
	headerImagePath?: string;
}
