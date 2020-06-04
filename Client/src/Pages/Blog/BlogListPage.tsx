import axios from "axios";
import { action, observable } from "mobx";
import { observer } from "mobx-react";
import { Component, default as React } from "react";
import { Link, Route, Switch } from "react-router-dom";
import { IfAdmin } from "../../Components/Conditional/If";
import { LoadData } from "../../Components/LoadData/LoadData";
import Blog, { IBlogAttributes } from "../../Models/Blog";
import BlogEntity from "./BlogCreatePage";

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

function BlogListItem(props: IBlogAttributes) {
	return (
		<div className="blog-item">
			<a href={`/blog/${props.id}`}>{props.title}</a>
		</div>
	);
}
