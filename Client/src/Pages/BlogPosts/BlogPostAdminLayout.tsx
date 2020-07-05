import React from "react";
import PageLayout from "Pages/PageLayout";
import HeaderContent from "Components/Header/Header";
import { LoadData } from "Components/LoadData/LoadData";
import { RouteComponentProps } from "react-router";
import axios from "axios";
import { EntityAdminAction } from "Components/Form/AdminCrudForm";
import BlogPostAdminForm from "./BlogPostAdminForm";
import BlogPosts from 'Models/BlogPost';

interface BlogLayoutProps extends RouteComponentProps {
	entityAction: EntityAdminAction;
}

export default function BlogPostAdminLayout(props: BlogLayoutProps) {
	// if we are updating then we need to load the data from the server first
	let BlogAdminForm =
		props.entityAction == "Create" ? (
			<BlogPostAdminForm {...props} action={props.entityAction} />
		) : (
			<LoadData
				promise={axios.get(`/Api/BlogPost/${props.match.params["id"]}`)}
				done={(data) => {
					return (
						<BlogPostAdminForm {...props} action="Update" model={data.data} />
					);
				}}
			/>
		);

	return BlogAdminForm;
}
