import React, { Component } from "react";
import { Switch, Route, RouteComponentProps } from "react-router";
import { LoadData } from "../Components/LoadData/LoadData";
import axios from "axios";
import Project from "../Models/Project";
import ReactMarkdown from "react-markdown";

interface IProps extends RouteComponentProps {
	value: any;
}

export default class Projects extends Component {
	render() {
		return (
			<>
				<Switch>
					<Route path="/Project/:id?" component={TestOne} />
				</Switch>
				<div>
					<h1>Projects</h1>
					<p>WIP: This page is not complete, please move along</p>
				</div>
			</>
		);
	}
}

class TestOne extends Component<RouteComponentProps> {
	render() {
		return (
			<div>
				<LoadData
					promise={axios.get(`/Api/Project/${this.props.match.params["id"]}`)}
					done={(response) => {
						let thing: Project = response.data;
						return (
							<>
								<h1>{thing.title}</h1> <ReactMarkdown source={thing.content} />
								<p>{thing.content}</p>
							</>
						);
					}}
				/>
			</div>
		);
	}
}
