import React from "react";
import Project from "../../Models/Project";
import { Link } from 'react-router-dom';

interface projectProps {
	list: Project[];
}

export default function ProjectList(props: projectProps) {
	let listItems = props.list.map((x) => (
			<div className="project">
				<Link to={`/projects/${x.id}`}>{x.title}</Link>
			</div>
	));
	return (
		<>
			{/* <div className="list-content"> */}
				<div className="project-list">{listItems}</div>
			{/* </div> */}
		</>
	);
}
