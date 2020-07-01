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
import ProjectCreatePage from "./Project/ProjectCreatePage";
import ProjectItem from "./Project/ProjectItem";
import { observer } from "mobx-react";
import { observable, action } from "mobx";
import { act } from "react-dom/test-utils";

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
					<Route path="/projects/create">
						<PageLayout
							displayHeader={true}
							headerComponent={
								<HeaderContent name="Projects">
									<p>Add new project</p>
								</HeaderContent>
							}
						>
							<ProjectCreatePage action="Create" />
						</PageLayout>
					</Route>
					<Route
						path="/projects/edit/:id?"
						component={ProjectCreateUpdate}
					></Route>
					<Route path="/projects/:id?" component={ProjectItem} />
				</Switch>
			</>
		);
	}
}

@observer
export class ProjectCreateUpdate extends Component<RouteComponentProps> {
	constructor(props: any) {
		super(props);
	}
	render() {
		return (
			<PageLayout
				displayHeader={true}
				headerComponent={
					<HeaderContent name="Projects">
						<p>Update project</p>
					</HeaderContent>
				}
			>
				<LoadData
					promise={axios.get(`/Api/Project/${this.props.match.params["id"]}`)}
					done={(data) => {
						return <ProjectCreatePage action="Update" model={data.data} />;
					}}
				/>
			</PageLayout>
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
