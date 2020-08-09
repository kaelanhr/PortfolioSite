import AbstractModel, {
	IAbstractAttributes,
	IModelMethods,
} from "./AbstractModel";
import axios from "axios";
import { store } from "store";
import BlogPosts from "./BlogPost";

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
			if (attributes.blogPosts) {
				this.blogPosts = attributes.blogPosts;
			}
		}
	}

	public headerImagePath?: string;
	public title: string;
	public blogPosts: BlogPosts[];

	public static getModelById = (id: string) => {
		return axios
			.get(`/Api/Blogs/${id}`)
			.then((response) => {
				return new Blog(response.data);
			})
			.catch((error) => {
				return new Blog();
			});
	};

	public static getModel = () => {
		return axios
			.get("/Api/Blogs/")
			.then((response) => {
				let blogList: Blog[] = response.data;
				return blogList.map((b) => new Blog(b));
			})
			.catch((error) => {
				return null;
			});
	};

	public createModel = () => {
		axios
			.post("/Api/Blogs/", {
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
	blogPosts: BlogPosts[];
}
