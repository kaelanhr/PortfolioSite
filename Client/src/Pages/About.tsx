import React, { useState } from "react";
import { ExternalLink } from "../Components/Links/ExternalLinks";
import NavWrapper from "../Components/Navigation/NavWrapper";
import HeaderContent from "../Components/Header/Header";
import PageLayout from "./PageLayout";

const proImage = "/Images/Personal/profile.jpg";
const personalImage = "/Images/Personal/profile-dwv.png";

export default function About() {
	return (
		<>
			<PageLayout displayHeader={true} headerComponent={<AboutHeader />}>
				<div className="content-wrapper">
					<div className="page-content">
						<Skills />
						<TechnicalCompetencies />
						<Qualifications />
						<Experience />
						<Interests />
					</div>
				</div>
			</PageLayout>
		</>
	);
}

export function AboutHeader() {
	const [aboutImage, setImage] = useState(proImage);

	let ToggleProfileImage = () => {
		if (aboutImage == proImage) {
			setImage(personalImage);
		} else {
			setImage(proImage);
		}
	};
	return (
		<HeaderContent name="about">
			<div className="about-header-content">
				<img
					src={aboutImage}
					className="about-profile-image"
					onClick={ToggleProfileImage}
				/>
				<br />
				<h2>Hi,</h2>
				<p>
					I am Kaelan Reece, a Brisbane based Software Engineer who is
					passionate about building high quality, user centred applications. I
					enjoy problem solving, challenging myself and am eager to meet new
					people and explore new places.
				</p>
				<br />
				<p>
					I am available for management and development of freelance or open
					source projects.
				</p>
			</div>
		</HeaderContent>
	);
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
