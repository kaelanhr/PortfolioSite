import AbstractModel, { IAbstractAttributes, IModelMethods } from "./AbstractModel";
import axios from "axios";
import { store } from "store";

export default class BlogPosts extends AbstractModel
	implements IBlogPostAttributes, IModelMethods {
	constructor(attributes?: Partial<IBlogPostAttributes>) {
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
			if (attributes.blogId) {
				this.blogId = attributes.blogId;
			}
		}
	}

	public headerImagePath?: string;
	public title: string;
	public content: string;
	public blogId: string;

	public createModel = () => {
		axios
			.post("/Api/BlogPost/", {
				Title: this.title,
				Content: this.content,
				BlogId: this.blogId
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
			.put("/Api/BlogPost", {
				id: this.id,
				Title: this.title,
				Content: this.content,
				BlogId: this.blogId,
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
		if (!this.content) {
			errorsArray.push("Blog content is required");
		}
		return errorsArray;
	};
}

export interface IBlogPostAttributes extends IAbstractAttributes {
	title: string;
	headerImagePath?: string;
	content: string;
	blogId: string;
}
