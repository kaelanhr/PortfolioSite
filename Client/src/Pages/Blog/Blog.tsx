import axios from "axios";
import { observable } from "mobx";
import { observer } from "mobx-react";
import React, { Component } from "react";
import { Link, Route, Switch } from "react-router-dom";
import { IfAdmin } from "../../Components/Conditional/If";
import BlogEntity from "./CreateBlog";

interface BlogMode {
	title: String;
	id: String;
	headerImagePath: String;
}

@observer
export default class Blog extends Component {
	componentDidMount() {
		axios
			.get("/Api/Blog")
			.then((response) => {
				this.Blogcontent = response.data;
			})
			.catch((error) => {
				//this.Blogcontent = "Blogs could not be found";
			});
	}

	@observable
	Blogcontent: BlogMode[] = [];

	render() {
		return (
			<>
				<Switch>
					<Route exact path="/blog">
						<div>
							<h1>Blog</h1>
							<p>WIP: This Is Not Complete, please move along</p>
							{this.Blogcontent.toString()}
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
