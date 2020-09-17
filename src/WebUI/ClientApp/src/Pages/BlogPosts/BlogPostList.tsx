import React, { useState } from "react";
import Blog, { IBlogAttributes } from "Models/Blog";
import { Link, RouteComponentProps } from "react-router-dom";
import axios from "axios";
import { IfAdmin } from "Components/Conditional/If";
import BlogPosts, { IBlogPostAttributes } from "Models/BlogPost";

interface blogProps extends RouteComponentProps {
	list: BlogPosts[];
}

export default function BlogPostList(props: blogProps) {
	const [blogList, setBlogs] = useState(props.list);

	let onDelete = (title: string, id: string) => {
		let accepted = window.confirm(`Are you sure you wish to delete: ${title}?`);
		if (accepted) {
			axios
				.delete(`/Api/BlogPost/${id}`)
				.then((response) => {
					console.log(response);
					setBlogs(blogList.filter((b) => b.id != id));
				})
				.catch((error) => {
					console.log(error);
				});
		}
	};

	let listItems = blogList.map((x) => (
		<BlogPostListItem {...x} onItemRemoved={onDelete} />
	));
	return <>{listItems.length > 0 ? listItems : <EmptyBlogsList />}</>;
}

function EmptyBlogsList() {
	return (
		<div>
			<p>Could not find any posts associated with this blog</p>
		</div>
	);
}

interface IBlogItemProps extends IBlogPostAttributes {
	onItemRemoved: Function;
}

function BlogPostListItem(props: IBlogItemProps) {
	return (
		<div className="blog-post">
			<Link to={`/Blogs/Post/${props.id}`}>{props.title}</Link>
			<IfAdmin>
				<div className="admin-icons">
					<Link to={`/Blogs/Admin/Post/edit/${props.id}`}>
						<img src="/Icons/edit-icon.svg" className="action-icon" />
					</Link>
					<img
						src="/Icons/bin-icon.svg"
						onClick={() => props.onItemRemoved(props.title, props.id)}
						className="action-icon"
					/>
				</div>
			</IfAdmin>
		</div>
	);
}
