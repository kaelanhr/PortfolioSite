import React, { Component } from "react";
import { Switch, Route, RouteComponentProps } from "react-router";
import { LoadData } from "../Components/LoadData/LoadData";
import axios from "axios";
import HeaderContent from "../Components/Header/Header";
import { IfAdmin } from "Components/Conditional/If";
import { Link } from "react-router-dom";
import Blog from "Models/Blog";
import BlogList from "./Blog/BlogList";
import BlogPosts from "Models/BlogPost";
import BlogPostList from "./BlogPosts/BlogPostList";
import BlogPostListPage from "./BlogPosts/BlogPostListPage";
import Page from "Components/Page/Page";
import BlogAdminLayout, { AdminBlogHeader } from "./Blog/BlogAdminLayout";
import BlogPostAdminForm from "./BlogPosts/BlogPostAdminForm";
import BlogPostItem from "./BlogPosts/BlogPostItem";

export default class Blogs extends Component<RouteComponentProps> {
	render() {
		return (
			<>
				<Switch>
					<Route exact path={this.props.match.path}>
						<Page header={<BlogsHeader />} wrapperType="list-wrapper">
							<div>
								<LoadData
									promise={axios.get("/Api/Blogs")}
									done={(data) => {
										let a: Blog[] = data.data.map((x: any) => new Blog(x));
										return <BlogList list={a} />;
									}}
								/>
								<IfAdmin>
									<br />
									<br />
									<br />
									<Link to="/Blogs/Admin/create">Add Blog</Link>
								</IfAdmin>
							</div>
						</Page>
					</Route>
					<Route
						path="/Blogs/Admin/create"
						render={(props) => (
							<>
								<Page
									header={<AdminBlogHeader action={"Create"} />}
									wrapperType="content-wrapper"
								>
									<BlogAdminLayout {...props} entityAction="Create" />
								</Page>
							</>
						)}
					/>
					<Route
						path="/Blogs/Admin/edit/:id?"
						render={(props) => (
							<Page
								header={<AdminBlogHeader action={"Update"} />}
								wrapperType="content-wrapper"
							>
								<BlogAdminLayout {...props} entityAction="Update" />
							</Page>
						)}
					/>
					<Route
						path="/Blogs/Posts/:id?"
						render={(props) => (
							<Page header={<BlogsHeader />} wrapperType="list-wrapper">
								<BlogPostListPage {...props} />
							</Page>
						)}
					/>
					<Route
						path="/Blogs/Post/:id?"
						render={(props) => <BlogPostItem {...props} />}
					/>
					<Route
						path={`${this.props.match.path}/Admin/Post/create/:id?`}
						render={(props) => (
							<Page header={<BlogsHeader />} wrapperType="list-wrapper">
								<BlogPostAdminForm {...props} action="Create" />
							</Page>
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
