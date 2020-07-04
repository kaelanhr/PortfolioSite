import AbstractModel, { IAbstractAttributes } from "./AbstractModel";
import axios from "axios";
import { store } from "store";

export default class Blog extends AbstractModel implements IBlogAttributes {
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

	public createBlog = () => {
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

	public updateBlog = () => {
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

	public validate = () => {
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
