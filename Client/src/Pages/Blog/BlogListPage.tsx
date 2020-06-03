import axios from "axios";
import { action, observable } from "mobx";
import { observer } from "mobx-react";
import { Component, default as React } from "react";
import { Link, Route, Switch } from "react-router-dom";
import { IfAdmin } from "../../Components/Conditional/If";
import { LoadData, loadingState } from "../../Components/LoadData/LoadData";
import Blog from "../../Models/Blog";
import BlogEntity from "./BlogCreatePage";

@observer
export default class BlogPage extends Component {
	componentDidMount() {
		axios.get("/Api/Blog").then(this.onFetched).catch(this.onError);
	}

	@action
	onFetched = (response: any) => {
		let a: Blog[] = response.data.map((x: any) => new Blog(x));
		this.BlogList = a.map((x: Blog) => <p>{x.title}</p>);
		this.requestState = "done";
	};

	@action
	onError = (error: any) => {
		this.requestState = "error";
	};

	@observable
	private BlogList: JSX.Element[];

	@observable
	private requestState: loadingState = "loading";

	render() {
		return (
			<>
				<Switch>
					<Route exact path="/blog">
						<div>
							<h1>Blog</h1>
							<p>WIP: This Is Not Complete, please move along</p>
							<LoadData requestState={this.requestState}>
								{this.BlogList}
							</LoadData>
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
