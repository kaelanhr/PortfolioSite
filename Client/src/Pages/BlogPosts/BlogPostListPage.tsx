import React from "react";
import { LoadData } from "Components/LoadData/LoadData";
import axios from "axios";
import { RouteComponentProps } from 'react-router';
import BlogPosts from 'Models/BlogPost';
import BlogPostList from './BlogPostList';

export default function BlogPostListPage(props: RouteComponentProps) {
	return (
		<LoadData
			promise={axios.get(`/Api/Blogs/${props.match.params["id"]}`)}
			done={(data) => {
				let a: BlogPosts[] = data.data.length  ? data.data.map((x: any) => new BlogPosts(x)) : [];
				return <BlogPostList list={a} />;
			}}
		/>
	);
}
