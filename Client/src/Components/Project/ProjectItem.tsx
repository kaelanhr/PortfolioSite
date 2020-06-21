import { RouteComponentProps } from "react-router";
import React, { Component } from "react";
import { LoadData } from "../LoadData/LoadData";
import axios from "axios";
import Project from "../../Models/Project";
import PageLayout from "../../Pages/PageLayout";
import HeaderContent from "../Header/Header";
const ReactMarkdown = require("react-markdown");
class ProjectItem extends Component<RouteComponentProps> {
	componentDidMount() {}
	render() {
		return (
			<>
				<LoadData
					promise={axios.get(`/Api/Project/${this.props.match.params["id"]}`)}
					done={(data) => {
						let a: Project = data.data;

						return (
							<>
								<PageLayout
									displayHeader={true}
									headerComponent={
										<HeaderContent name="article">{a.title}</HeaderContent>
									}
								>
									<div className="content-wrapper">
										<div className="page-content">
											<h1>{a.title}</h1>
											<ReactMarkdown source={a.content} />
										</div>
									</div>
								</PageLayout>
							</>
						);
					}}
				/>
			</>
		);
	}
}

export default ProjectItem;
