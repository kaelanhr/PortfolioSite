import axios from "axios";
import { observer } from "mobx-react";
import { Component, default as React } from "react";
import { Link, Route, Switch } from "react-router-dom";
import { IfAdmin } from "../../Components/Conditional/If";
import { LoadData } from "../../Components/LoadData/LoadData";
import Blog, { IBlogAttributes } from "../../Models/Blog";
import { store } from "../../store";
import BlogCreatePage from "./BlogCategoryCreatePage";
import BlogEntity from "./BlogPostCreatePage";

@observer
export default class BlogPage extends Component {
	render() {
		return (
			<>
				<Switch>
					<Route exact path="/blog">
						<div>
							<h1>Blog</h1>
							<p>WIP: This Is Not Complete, please move along</p>
							<LoadData
								promise={axios.get("/Api/Blog")}
								done={(data) => {
									let a: Blog[] = data.data.map((x: any) => new Blog(x));
									return a.map((x: Blog) => <BlogListItem {...x} />);
								}}
							/>
							<ul>
								<IfAdmin>
									<Link to="/blog/category/create">Create Blog</Link>
									<Link to="/blog/update">Update Blog</Link>
									<li>Search Blog</li>
									<li>Create Blog</li>
									<li>Read Blog</li>
									<li>Update Blog</li>
									<li>Delete Blog</li>
								</IfAdmin>
							</ul>
						</div>
					</Route>
					<Route path="/blog/category/create">
						<BlogCreatePage entityAction={"Create"} />
					</Route>
					<Route path="/blog/update">
						<BlogEntity entityAction={"Update"} />
					</Route>
				</Switch>
			</>
		);
	}
}

class BlogListItem extends Component<IBlogAttributes> {
	onDelete = () => {
		let accepted = window.confirm(
			`Are you sure you wish to delete: ${this.props.title}?`
		);

		if (accepted) {
			axios
				.delete(`/Api/Blog/${this.props.id}`)
				.then(function (response) {
					console.log(response);
					store.history.push("/blog");
				})
				.catch((error) => {
					console.log(error);
				});
		}
	};
	render() {
		return (
			<div className="blog-item">
				<a href={`/blog/${this.props.id}`}>{this.props.title}</a>
				<p onClick={this.onDelete}>Delete Blog</p>
			</div>
		);
	}
}
