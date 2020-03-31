import React, { Component, PureComponent } from 'react'
import SocialMediaLinks from '../Links/SocialMediaLinks';
import { observer } from 'mobx-react';
import { observable, action } from 'mobx';
import { TabSet, Tab } from '../Tabs/TabSet';

interface SlideState {
	value?: any
}

interface IProps {
	value: any
}

export default class About extends PureComponent<{}, SlideState> {
	constructor(props: any) {
		super(props);
	}

	onActive = () => {

	}

	render() {
		return (
			<>
				<TabSet>
					<Tab name="Info">
						<Info />
					</Tab>
					<Tab name="Interests" >
						<Interests />
					</Tab>
					<Tab name="Experience" >
						<Experience />
					</Tab>
					<Tab name="Education" >
						<Education />
					</Tab>
				</TabSet>
				<SocialMediaLinks />
			</>
		)
	}
}

class Education extends Component {
	render() {
		return (
			<>
				<h2>- Qualifications</h2>
				<p>QUT Bachelor of Business (Marketing)</p>
				<p>QUT Bachelor of Information Technology (Computer Science)</p>
			</>
		);
	}
}

class Interests extends Component {
	render() {
		return (
			<>
				<h2>- Side Interests</h2>
				<p>Video Game Modding</p>
				<p>Reading/Writing Science Fiction</p>
			</>
		)
	}
}

class Info extends Component {
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
			</>
		)
	}
}


class Experience extends Component {
	render() {
		return (
			<>
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
			</>
		);
	}
}