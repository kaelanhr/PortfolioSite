import React from 'react'
import logo from '../logo.svg';

export default function Home() {
	return (
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<p>My name is Kaelan Reece</p>
				<p>
					Welcome to my portfolio website
								</p>
				<h2>What is left to do (in general)</h2>
				<ul>
					<li>Create models for items</li>
					<li>donate/support me?</li>
					<li>Proper sidebar for navigation</li>
					<li>Add Login/logout</li>
					<li>Crud on portfolio</li>
					<li>Add admin section (about and other content)</li>
					<li>styling</li>
					<li>contact me</li>
					<li>deploy on web server</li>
					<li>mobile responsiveness</li>
					<li>blog posting</li>
					<li>use sass</li>
					<li>use rest for end points</li>
					<li>also use graphql for other endpoints</li>
				</ul>
			</header>
		</div>
	)
}