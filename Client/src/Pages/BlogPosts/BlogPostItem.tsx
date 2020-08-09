import { RouteComponentProps } from "react-router";
import React, { Component } from "react";
import { LoadData } from "Components/LoadData/LoadData";
import axios from "axios";
import Project from "Models/Project";
import HeaderContent from "Components/Header/Header";
import Back from "Components/Button/Back";
import { ExternalLink } from "Components/Links/ExternalLinks";
import Page from "Components/Page/Page";
import BlogPosts from 'Models/BlogPost';
const ReactMarkdown = require("react-markdown");

class BlogPostItem extends Component<RouteComponentProps> {
	componentDidMount() {}
	render() {
		return (
			<>
				<LoadData
					promise={axios.get(`/Api/BlogPost/${this.props.match.params["id"]}`)}
					done={(data) => {
						let a: BlogPosts = data.data;

						return (
							<>
								<Page
									header={
										<HeaderContent name="article">
											<h1>
													{a.title}
											</h1>
										</HeaderContent>
									}
									wrapperType="content-wrapper"
								>
									<div className="page-content">
										<h1>{a.title}</h1>
										<ReactMarkdown source={a.content} />
										<Back />
									</div>
								</Page>
							</>
						);
					}}
				/>
			</>
		);
	}
}

export default BlogPostItem;
