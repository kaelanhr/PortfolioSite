import React from "react";
import { LoadData } from "Components/LoadData/LoadData";
import axios from "axios";
import { RouteComponentProps } from 'react-router';
import BlogPosts from 'Models/BlogPost';
import BlogPostList from './BlogPostList';
import Blog from 'Models/Blog';

export default function BlogPostListPage(props: RouteComponentProps) {
	return (
		<LoadData
			promise={axios.get(`/Api/Blogs/${props.match.params["id"]}`)}
			done={(data) => {
				let a: Blog = data.data;
				let b: BlogPosts[] = a.blogPosts ? a.blogPosts.map(p => new BlogPosts(p)) : [];
				console.log(data.data);
				return <BlogPostList {...props} list={b} />;
			}}
		/>
	);
}
