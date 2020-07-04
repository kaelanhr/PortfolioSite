import AbstractModel, { IAbstractAttributes, IModelMethods } from "./AbstractModel";
import axios from "axios";
import { store } from "store";

export default class Blog extends AbstractModel
	implements IBlogAttributes, IModelMethods {
	constructor(attributes?: Partial<IBlogAttributes>) {
		super(attributes);

		if (attributes) {
			if (attributes.title) {
				this.title = attributes.title;
			}
			if (attributes.headerImagePath) {
				this.headerImagePath = attributes.headerImagePath;
			}
		}
	}

	public headerImagePath?: string;
	public title: string;

	public createModel = () => {
		axios
			.post("/Api/Blogs/Create", {
				Title: this.title,
			})
			.then(function (response) {
				console.log(response);
				store.history.push("/blogs");
			})
			.catch((error) => {
				console.log(error);
				return "There was an error submitting your request";
			});
		return "";
	};

	public editModel = () => {
		axios
			.put("/Api/Blogs", {
				id: this.id,
				Title: this.title,
			})
			.then(function (response) {
				console.log(response);
				store.history.push("/Blogs");
			})
			.catch((error) => {
				console.log(error);
				return "There was an error submitting your request";
			});
		return "";
	};

	public validateModel = () => {
		let errorsArray: string[] = [];
		if (!this.title) {
			errorsArray.push("Blog Title is required");
		}
		return errorsArray;
	};
}

export interface IBlogAttributes extends IAbstractAttributes {
	title: string;
	headerImagePath?: string;
}
