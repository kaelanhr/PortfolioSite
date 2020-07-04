import React from "react";
import PageLayout from "Pages/PageLayout";
import HeaderContent from "Components/Header/Header";
import ProjectAdminPage from "./ProjectAdminPage";
import { LoadData } from 'Components/LoadData/LoadData';
import { RouteComponentProps } from 'react-router';
import axios from 'axios';
import { EntityAdminAction } from 'Components/Form/AdminCrudForm';

interface ProjectLayoutProps extends RouteComponentProps {
	entityAction: EntityAdminAction;
}

export default function ProjectAdminLayout(props: ProjectLayoutProps) {

	// if we are updating then we need to load the data from the server first
	let ProjectAdminForm =
		props.entityAction == "Create" ? (
			<ProjectAdminPage action={props.entityAction} />
		) : (
			<LoadData
				promise={axios.get(`/Api/Project/${props.match.params["id"]}`)}
				done={(data) => {
					return <ProjectAdminPage action="Update" model={data.data} />;
				}}
			/>
		);

	return (
		<PageLayout
			displayHeader={true}
			headerComponent={<AdminProjectHeader action={props.entityAction} />}
		>
			{ProjectAdminForm}
		</PageLayout>
	);
}

function AdminProjectHeader(props: { action: EntityAdminAction }) {
	return (
		<HeaderContent name="Projects">
			<p>{props.action == "Create" ? "Add new project" : "Update Project"}</p>
		</HeaderContent>
	);
}
