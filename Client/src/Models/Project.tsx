import AbstractModel, { IAbstractAttributes } from "./AbstractModel";
import axios from "axios";
import { store } from "../store";

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
		}
	}
	public content: string;
	public headerImagePath?: string;
	public title: string;

	public createProject = () => {
		axios
			.post("/Api/Project/Create", {
				Title: this.title,
				content: this.content
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
}

export interface IProjectAttributes extends IAbstractAttributes {
	title: string;
	content: string;
	headerImagePath?: string;
}
