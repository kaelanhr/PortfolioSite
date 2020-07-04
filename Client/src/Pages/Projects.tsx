import React, { Component } from "react";
import { Switch, Route, RouteComponentProps } from "react-router";
import { LoadData } from "../Components/LoadData/LoadData";
import axios from "axios";
import Project from "../Models/Project";
import HeaderContent from "../Components/Header/Header";
import { IfAdmin } from "Components/Conditional/If";
import { Link } from "react-router-dom";
import PageLayout from "./PageLayout";
import ProjectList from "./Project/ProjectList";
import ProjectItem from "./Project/ProjectItem";
import ProjectAdminLayout from "./Project/ProjectAdminLayout";

export default class Projects extends Component<RouteComponentProps> {
	render() {
		return (
			<>
				<Switch>
					<Route exact path="/projects">
						<PageLayout
							displayHeader={true}
							headerComponent={<ProjectsHeader />}
						>
							<div>
								<LoadData
									promise={axios.get("/Api/Project")}
									done={(data) => {
										let a: Project[] = data.data.map(
											(x: any) => new Project(x)
										);
										return <ProjectList list={a} />;
									}}
								/>
								<IfAdmin>
									<br />
									<br />
									<br />
									<Link to="/projects/create">Add project</Link>
								</IfAdmin>
							</div>
						</PageLayout>
					</Route>
					<Route
						path="/projects/create"
						render={(props) => (
							<ProjectAdminLayout {...props} entityAction="Create" />
						)}
					/>
					<Route
						path="/projects/edit/:id?"
						render={(props) => (
							<ProjectAdminLayout {...props} entityAction="Update" />
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
