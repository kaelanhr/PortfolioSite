import axios from "axios";
import { action, observable } from "mobx";
import { observer } from "mobx-react";
import React, { Component } from "react";
import { Link, Route, Switch } from "react-router-dom";
import { IfAdmin } from "../../Components/Conditional/If";
import Blog from "../../Models/Blog";
import BlogEntity from "./CreateBlog";

interface BlogMode {
	title: String;
	id: String;
	headerImagePath: String;
}

@observer
export default class BlogPage extends Component {
	@action
	componentDidMount() {
		let theThing = [];
		let display: Blog[];
		axios
			.get("/Api/Blog")
			.then((response) => {
				let a: Blog[] = response.data.results.map((x: any) => new Blog(x));

				//this.Blogcontent = a.map((x: Blog) => <p>{x.title}</p>);
				//	this.Blogcontent = [<p>hello there</p>];
				this.Blogcontent = response.data;
				this.isLoading = false;
			})
			.catch((error) => {
				this.Blogcontent = "Blogs could not be found";
			});
	}

	@observable
	private Blogcontent = "hi there";

	@observable
	private isLoading = true;

	render() {
		return (
			<>
				<Switch>
					<Route exact path="/blog">
						<div>
							<h1>Blog</h1>
							<p>WIP: This Is Not Complete, please move along</p>
							{this.isLoading ? <p>Page is loading</p> : this.Blogcontent}
							<ul>
								<IfAdmin>
									<Link to="/blog/create">Create Blog</Link>
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
					<Route path="/blog/create">
						<BlogEntity entityAction={"Create"} />
					</Route>
					<Route path="/blog/update">
						<BlogEntity entityAction={"Update"} />
					</Route>
				</Switch>
			</>
		);
	}
}
