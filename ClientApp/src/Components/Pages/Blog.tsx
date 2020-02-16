import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Blog extends Component {
	render() {
		return (
			<div>
				<p>TODO: Blog Page Component</p>
				<ul>
					<li>Search Blog</li>
					<Link to="/blog/create">Create Blog</Link>
					<Link to="/blog/update">Update Blog</Link>
					<li>Create Blog</li>
					<li>Read Blog</li>
					<li>Update Blog</li>
					<li>Delete Blog</li>
				</ul>
			</div>
		)
	}
}