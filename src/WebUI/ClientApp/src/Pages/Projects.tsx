import React, { Component } from "react";
import { Switch, Route, RouteComponentProps } from "react-router";
import { LoadData } from "../Components/LoadData/LoadData";
import axios from "axios";
import Project from "../Models/Project";
import HeaderContent from "../Components/Header/Header";
import { Link } from "react-router-dom";
import ProjectList from "./Project/ProjectList";
import ProjectItem from "./Project/ProjectItem";
import ProjectAdminLayout, {
	AdminProjectHeader,
} from "./Project/ProjectAdminLayout";
import Page from "Components/Page/Page";
import AdminAction from 'Components/Admin/AdminAction';

export default class Projects extends Component<RouteComponentProps> {
	render() {
		return (
			<>
				<Switch>
					<Route exact path="/projects">
						<Page
							header={<ProjectsHeader />}
							wrapperType="list-wrapper"
							beforeWrapper={
								<AdminAction>
									<Link to="/projects/create">Add project</Link>
								</AdminAction>
							}
						>
							<LoadData
								promise={axios.get("/Api/Project")}
								done={(data) => {
									let a: Project[] = data.data.list.map((x: any) => new Project(x));
									return <ProjectList list={a} />;
								}}
							/>
						</Page>
					</Route>
					<Route
						path="/projects/create"
						render={(props) => (
							<Page
								header={<AdminProjectHeader action="Create" />}
								wrapperType="content-wrapper"
							>
								<ProjectAdminLayout {...props} entityAction="Create" />
							</Page>
						)}
					/>
					<Route
						path="/projects/edit/:id?"
						render={(props) => (
							<Page
								header={<AdminProjectHeader action="Update" />}
								wrapperType="content-wrapper"
							>
								<ProjectAdminLayout {...props} entityAction="Update" />
							</Page>
						)}
					/>
					<Route path="/projects/:id?" component={ProjectItem} />
				</Switch>
			</>
		);
	}
}

function ProjectsHeader() {
	return (
		<HeaderContent name="Projects">
			<h1>Project List</h1>
		</HeaderContent>
	);
}
