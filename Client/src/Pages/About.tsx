import { observable } from "mobx";
import { observer } from "mobx-react";
import React, { Component, PureComponent } from "react";
import { ExternalLink } from "../Components/Links/ExternalLinks";
import SocialMediaLinks from "../Components/Links/SocialMediaLinks";
import { Tab, TabSet } from "../Components/Tabs/TabSet";

interface SlideState {
	value?: any;
}
const proImage = "/Images/Personal/profile.jpg";
const personaImage = "/Images/Personal/profile-dwv.png";

@observer
export default class About extends PureComponent<{}, SlideState> {
	constructor(props: any) {
		super(props);
	}

	@observable
	profileImage: string = proImage;

	ToggleProfileImage = () => {
		if (this.profileImage == proImage) {
			this.profileImage = personaImage;
		} else {
			this.profileImage = proImage;
		}
	};

	render() {
		return (
			<>
				<h1>Learn About Me</h1>
				<div id="about-content">
					<div className="personal-social">
						<img
							src={this.profileImage}
							className="about-profile-image"
							onClick={this.ToggleProfileImage}
						/>
						<SocialMediaLinks />
					</div>

					<TabSet displayTop={false}>
						<Tab name="Info" index={0}>
							<Info />
						</Tab>
						<Tab name="Interests" index={1}>
							<Interests />
						</Tab>
						<Tab name="Experience" index={2}>
							<Experience />
						</Tab>
						<Tab name="Education" index={3}>
							<Education />
						</Tab>
					</TabSet>
				</div>
			</>
		);
	}
}

function Education() {
	return (
		<>
			<h2>Qualifications</h2>
			<ul>
				<li>
					<ExternalLink link="https://www.qut.edu.au/">QUT</ExternalLink>{" "}
					Bachelor of Business (Marketing)
				</li>
				<li>
					<ExternalLink link="https://www.qut.edu.au/">QUT</ExternalLink>{" "}
					Bachelor of Information Technology (Computer Science)
				</li>
			</ul>
		</>
	);
}

function Interests() {
	return (
		<>
			<h2>Interests</h2>
			<ul>
				<li>Video Game Modding</li>
				<li>Reading</li>
				<li>Writing Science Fiction</li>
				<li>Soccer</li>
				<li>Card Games</li>
			</ul>
		</>
	);
}

function Info() {
	return (
		<>
			<h2>Info</h2>
			<p>
				Kaelan specializes in project management of technical teams, developing
				web applications using agile methodologies, backend systems architecture
				and optimizing business processes through technology.
			</p>
			<p>
				He enjoys problem solving, challenging himself and expanding his
				skillset. Whilst he has lived his whole life in Australia, he is eager
				to travel the world.
			</p>
			<p>
				He is available for management and development of freelance or open
				source projects.
			</p>
			<p>
				Aside from his independent projects and collaboration with developers,
				he works in a senior position as the Bot Squad Lead of Codebots
			</p>
		</>
	);
}

function Experience() {
	return (
		<>
			<h2>Experience In</h2>
			<ul>
				<li>Software Architecture</li>
				<li>Project Management</li>
				<li>Agile Management and Development</li>
				<li>Onboarding and Training Developers</li>
				<li>Front End Development</li>
				<li>Back End Development</li>
				<li>Mobile Application Development</li>
				<li>Technical Writing</li>
				<li>CI/CD Technology</li>
			</ul>
		</>
	);
}
