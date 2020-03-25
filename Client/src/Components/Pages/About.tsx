import React, { Component, PureComponent } from 'react'
import SocialMediaLinks from '../Links/SocialMediaLinks';
import { Link } from 'react-router-dom';

export default class About extends PureComponent {
	constructor(props: any) {
		super(props);
	}
	render() {
		return (
			<>

				<h2>- Info</h2>
				<p>
					Kaelan specializes in project management of technical teams, developing web applications using agile methodologies, architecting backend systems and optimising business processes through technology.
				</p>
				<p>
					He is available for management and development of freelance or open source projects.
				</p>
				<p>
					Aside from his independent projects and collaboration with developers, he works in a senior position as the Bot Squad Lead of Codebots
				</p>

				<h2>- Currently Working</h2>
				<p>Bot Squad Lead at Codebots</p>

				<h2>- Side Interests</h2>
				<p>Video Game Modding</p>
				<p>Reading/Writing Science Fiction</p>
				<p>Experimental Software</p>

				<h2>- With Experience In</h2>
				<p>Software Architecture</p>
				<p>Project Management</p>
				<p>Agile Management and Development</p>
				<p>Onboarding and Training Developers</p>
				<p>Front End Development</p>
				<p>Back End Development</p>
				<p>Mobile Application Development</p>
				<p>Technical Writing</p>
				<p>CI/CD Technology</p>

				<h2>- Qualifications</h2>
				<p>QUT Bachelor of Business (Marketing)</p>
				<p>QUT Bachelor of Information Technology (Computer Science)</p>
				<SocialMediaLinks />
			</>
		)
	}
}