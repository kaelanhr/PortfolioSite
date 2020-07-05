import React, { useState } from "react";
import Blog, { IBlogAttributes } from "Models/Blog";
import { Link } from "react-router-dom";
import axios from "axios";
import { IfAdmin } from "Components/Conditional/If";

interface blogProps {
	list: Blog[];
}

export default function BlogList(props: blogProps) {
	const [blogList, setBlogs] = useState(props.list);

	let onDelete = (title: string, id: string) => {
		let accepted = window.confirm(`Are you sure you wish to delete: ${title}?`);
		if (accepted) {
			axios
				.delete(`/Api/Blogs/${id}`)
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
		<BlogListItem {...x} onItemRemoved={onDelete} />
	));
	return (
		<>
			<div className="Blog-list">
				{listItems.length > 0 ? listItems : <EmptyBlogsList />}
			</div>
		</>
	);
}

function EmptyBlogsList() {
	return (
		<div>
			<p>No Blogs Listed</p>
		</div>
	);
}

interface IBlogItemProps extends IBlogAttributes {
	onItemRemoved: Function;
}

function BlogListItem(props: IBlogItemProps) {
	return (
		<div className="Blog">
			<Link to={`/Blogs/Posts/${props.id}`}>{props.title}</Link>
			<IfAdmin>
				<div className="admin-icons">
					<Link to={`/Blogs/edit/${props.id}`}>
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
