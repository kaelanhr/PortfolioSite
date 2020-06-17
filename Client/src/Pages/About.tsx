import { observable } from "mobx";
import { observer } from "mobx-react";
import React, { PureComponent } from "react";
import { ExternalLink } from "../Components/Links/ExternalLinks";
import SocialMediaLinks from "../Components/Links/SocialMediaLinks";
import { Tab, TabSet } from "../Components/Tabs/TabSet";
import NavWrapper from "../Components/Navigation/NavWrapper";
import HeaderContent from "../Components/Header/Header";

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
				<NavWrapper displayHeader={true}>
					<HeaderContent name="about">
						<div className="about-header-content">
							<img
								src={this.profileImage}
								className="about-profile-image"
								onClick={this.ToggleProfileImage}
							/>
							<br />
							<h2>Hi,</h2>
							<p>
								I am Kaelan Reece, a Brisbane based Software Engineer who is
								passionate about building high quality, user centred
								applications. I enjoy problem solving, challenging myself and am
								eager to meet new people and explore new places.
							</p>
							<br />
							<p>
								I am available for management and development of freelance or
								open source projects.
							</p>
						</div>
					</HeaderContent>
				</NavWrapper>
				<div className="page-wrapper">
					<div className="page-content">
						<Info />
						<Skills />
						<TechnicalCompetencies />
						<Qualifications />
						<Experience />
						<Interests />
					</div>
				</div>
			</>
		);
	}
}

function Qualifications() {
	return (
		<>
			<h2>Qualifications</h2>
			<ul>
				<li>
					<p>Bachelor of Business (Marketing)</p>
					<p>
						<ExternalLink link="https://www.qut.edu.au/">QUT</ExternalLink> -
						Gardens Point Brisbane QLD
					</p>
					<p>2013 - 2020</p>
				</li>
				<li>
					<p>Bachelor of Information Technology (Computer Science)</p>
					<p>
						<ExternalLink link="https://www.qut.edu.au/">QUT</ExternalLink> -
						Gardens Point Brisbane QLD
					</p>
					<p>2013 - 2020</p>
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

function Experience() {
	return (
		<>
			<h2>Experience</h2>
			<ul>
				<li>
					<p>Bot Squad Lead</p>
					<p>Codebots/WorkingMouse - Brisbane QLD </p> <p>2019 - Present </p>
				</li>
				<li>
					<p>Lead Tools Engineer </p>WorkingMouse - Brisbane QLD{" "}
					<p>2018 - 2019 </p>
				</li>
				<li>
					<p>Tools Engineer</p>Working Mouse - Brisbane QLD <p>2017 - 2018</p>
				</li>
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

function Skills() {
	return (
		<>
			<h2>Skills</h2>
			<ul>
				<li>Software Architecture & Design </li>
				<li>Agile Project Management & Development </li>
				<li>Technical Writing & Documentation</li>
				<li>Front/Back End Web Development </li>
				<li>Mobile Development</li>
			</ul>
		</>
	);
}
function TechnicalCompetencies() {
	return (
		<>
			<h2>Technical Competencies</h2>
			<ul>
				<li>ASP Net Core (C#) & Entity Framework </li>
				<li>Databases (PostgreSQL, SQL Server & MySQL) </li>
				<li>React </li>
				<li>Java </li>
				<li>CI/CD Technology </li>
				<li>Docker </li>
				<li>Linux </li>
				<li>Powershell </li>
				<li>Git </li>
				<li>HTML, SCSS, JavaScript </li>
				<li>Python </li>
				<li>Adobe Photoshop, Premier & Illustrator</li>
			</ul>
		</>
	);
}
