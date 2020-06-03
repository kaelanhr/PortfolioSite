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
	componentDidMount() {
		axios.get("/Api/Blog").then(this.onFetched).catch(this.onError);
	}

	@action
	onFetched = (response: any) => {
		let a: Blog[] = response.data.map((x: any) => new Blog(x));

		this.Blogcontent = a.map((x: Blog) => <p>{x.title}</p>);
		//this.Blogcontent = "get good hey";
		console.log("it worked");
		this.isLoading = false;
	};

	@action
	onError = (error: any) => {
		console.error(error);
		this.Blogcontent = [<p>"hello there"</p>];
	};

	@observable
	private Blogcontent = [<p>hello</p>];

	@observable
	private isLoading = true;

	render() {
		console.log("initial render");
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
