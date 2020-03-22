import React, { Component } from 'react'
import { Link, Route, Switch } from 'react-router-dom'
import BlogEntity from '../Blog/BlogEntity'
import { IfAdmin } from '../If'

export default class Blog extends Component {
	render() {
		return (
			<>
				<Switch>
					<Route exact path="/blog">
						<div>
							<p>TODO: Blog Page Component</p>
							<ul>
								<li>Search Blog</li>
								<IfAdmin >
									<Link to="/blog/create">Create Blog</Link>
									<Link to="/blog/update">Update Blog</Link>
								</IfAdmin>
								<li>Create Blog</li>
								<li>Read Blog</li>
								<li>Update Blog</li>
								<li>Delete Blog</li>
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
		)
	}
}