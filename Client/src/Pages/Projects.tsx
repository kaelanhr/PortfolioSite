import React, { Component } from "react";
import { Switch, Route } from "react-router";
import { LoadData } from "../Components/LoadData/LoadData";
import axios from "axios";
import Project from "../Models/Project";
import HeaderContent from "../Components/Header/Header";
import { IfAdmin } from 'Components/Conditional/If';
import { Link } from 'react-router-dom';
import PageLayout from './PageLayout';
import ProjectList from './Project/ProjectList';
import ProjectCreatePage from './Project/ProjectCreatePage';
import ProjectItem from './Project/ProjectItem';

export default class Projects extends Component {
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
							<ProjectCreatePage />
						</PageLayout>
					</Route>
					<Route path="/projects/:id?" component={ProjectItem} />
				</Switch>
			</>
		);
	}
}

function ProjectsHeader() {
	return (
		<HeaderContent name="Projects">
			<p>Project List</p>
		</HeaderContent>
	);
}