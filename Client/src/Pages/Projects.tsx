import React, { Component } from "react";
import { Switch, Route, RouteComponentProps } from "react-router";
import { LoadData } from "../Components/LoadData/LoadData";
import axios from "axios";
import Project from "../Models/Project";
import ReactMarkdown from "react-markdown";
import NavWrapper from "../Components/Navigation/NavWrapper";
import HeaderContent from "../Components/Header/Header";
import ProjectCreatePage from "../Components/Project/ProjectCreatePage";
import BlogCategoryEditPage from "./Blog/BlogCategoryEditPage";
import ProjectList from '../Components/Project/ProjectList';
import { IfAdmin } from '../Components/Conditional/If';
import { Link } from 'react-router-dom';

interface IProps extends RouteComponentProps {
	value: any;
}

export default class Projects extends Component {
	render() {
		return (
			<>
				<Switch>
					<Route exact path="/projects">
						<NavWrapper displayHeader={true}>
							<HeaderContent name="Projects">
								<p>Project List</p>
							</HeaderContent>
						</NavWrapper>
						<div>
							<h1>Projects</h1>
							<LoadData
								promise={axios.get("/Api/Project")}
								done={(data) => {
									let a: Project[] = data.data.map((x: any) => new Project(x));
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
					</Route>
					<Route path="/projects/create">
						<ProjectCreatePage />
					</Route>
					<Route path="/projects/:id?" component={dontbelame} />
				</Switch>
			</>
		);
	}
}

function dontbelame() {
	return (
		<div>
			<p>dont be lame</p>
		</div>
	)
}
