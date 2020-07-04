import React, { Component } from "react";
import { Switch, Route, RouteComponentProps } from "react-router";
import { LoadData } from "../Components/LoadData/LoadData";
import axios from "axios";
import Project from "../Models/Project";
import HeaderContent from "../Components/Header/Header";
import { IfAdmin } from "Components/Conditional/If";
import { Link } from "react-router-dom";
import PageLayout from "./PageLayout";
import ProjectList from "./Project/ProjectList";
import ProjectItem from "./Project/ProjectItem";
import ProjectAdminLayout from "./Project/ProjectAdminLayout";
import Blog from 'Models/Blog';
import BlogList from './Blog/BlogList';
import BlogAdminLayout from './Blog/BlogAdminLayout';

export default class Blogs extends Component<RouteComponentProps> {
	render() {
		return (
			<>
				<Switch>
					<Route exact path="/Blogs">
						<PageLayout
							displayHeader={true}
							headerComponent={<BlogsHeader />}
						>
							<div>
								<LoadData
									promise={axios.get("/Api/Blogs")}
									done={(data) => {
										let a: Blog[] = data.data.map(
											(x: any) => new Blog(x)
										);
										return <BlogList list={a} />;
									}}
								/>
								<IfAdmin>
									<br />
									<br />
									<br />
									<Link to="/Blogs/create">Add Blog</Link>
								</IfAdmin>
							</div>
						</PageLayout>
					</Route>
					<Route
						path="/Blogs/create"
						render={(props) => (
							<BlogAdminLayout {...props} entityAction="Create" />
						)}
					/>
					<Route
						path="/Blogs/edit/:id?"
						render={(props) => (
							<BlogAdminLayout {...props} entityAction="Update" />
						)}
					/>
				</Switch>
			</>
		);
	}
}

function BlogsHeader() {
	return (
		<HeaderContent name="Blogs">
			<h1>Blogs List</h1>
		</HeaderContent>
	);
}
