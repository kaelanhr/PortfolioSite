import React from "react";
import PageLayout from "Pages/PageLayout";
import HeaderContent from "Components/Header/Header";
import BlogAdminPage from "./BlogAdminPage";
import { LoadData } from 'Components/LoadData/LoadData';
import { RouteComponentProps } from 'react-router';
import axios from 'axios';
import { EntityAdminAction } from 'Components/Form/AdminCrudForm';

interface BlogLayoutProps extends RouteComponentProps {
	entityAction: EntityAdminAction;
}

export default function BlogAdminLayout(props: BlogLayoutProps) {

	// if we are updating then we need to load the data from the server first
	let BlogAdminForm =
		props.entityAction == "Create" ? (
			<BlogAdminPage action={props.entityAction} />
		) : (
			<LoadData
				promise={axios.get(`/Api/Blogs/${props.match.params["id"]}`)}
				done={(data) => {
					return <BlogAdminPage action="Update" model={data.data} />;
				}}
			/>
		);

	return (
		<PageLayout
			displayHeader={true}
			headerComponent={<AdminBlogHeader action={props.entityAction} />}
		>
			{BlogAdminForm}
		</PageLayout>
	);
}

function AdminBlogHeader(props: { action: EntityAdminAction }) {
	return (
		<HeaderContent name="Blog">
			<p>{props.action == "Create" ? "Add new Blog" : "Update Blog"}</p>
		</HeaderContent>
	);
}
