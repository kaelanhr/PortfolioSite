import { observer } from "mobx-react";
import React, { Component } from "react";
import SocialMediaLinks from "../Components/Links/SocialMediaLinks";
import HeaderContent from "../Components/Header/Header";
import { observable } from "mobx";
import axios from "axios";
import { LoadData } from "../Components/LoadData/LoadData";
import Project from "../Models/Project";
import NavWrapper from '../Components/Navigation/NavWrapper';
import ProjectList from '../Components/Project/ProjectList';
import { Switch, Route } from 'react-router';
import PageLayout from './PageLayout';

@observer
export default class Home extends Component {
	constructor(props: any) {
		super(props);
	}

	@observable
	private projectList: Project[] = [];

	render() {
		return (
			<>
				<PageLayout headerComponent={<HomeHeader />} displayHeader={false}>
					<LoadData
						promise={axios.get("/Api/Project")}
						done={(data) => {
							let a: Project[] = data.data.map((x: any) => new Project(x));
							return <ProjectList list={a} />;
						}}
					/>
				</PageLayout>
			</>
		);
	}
}

function HomeHeader() {
	return (
		<HeaderContent name="home">
			<div className="welcome-text">
				<h1>Hi, I'm Kaelan Reece</h1>
				<br />
				<h2>Senior Software Engineer from Brisbane, I specialise</h2>
				<h2>in Web development</h2>
				<SocialMediaLinks />
			</div>
		</HeaderContent>
	);
}