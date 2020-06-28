import { RouteComponentProps } from "react-router";
import React, { Component } from "react";
import { LoadData } from "Components/LoadData/LoadData";
import axios from "axios";
import Project from "Models/Project";
import PageLayout from "Pages/PageLayout";
import HeaderContent from "Components/Header/Header";
import Back from "Components/Button/Back";
import ContentWrapper from "Components/ContentWrapper/ContentWrapper";
import { ExternalLink } from "Components/Links/ExternalLinks";
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
										<HeaderContent name="article">
											<h1>
												{a.projectUrl ? (
													<ExternalLink link={`${a.projectUrl}`}>
														{a.title}
													</ExternalLink>
												) : (
													a.title
												)}
											</h1>
										</HeaderContent>
									}
								>
									<ContentWrapper>
										<div className="page-content">
											<h1>{a.title}</h1>
											<ReactMarkdown source={a.content} />
										</div>
									</ContentWrapper>
									<Back />
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
