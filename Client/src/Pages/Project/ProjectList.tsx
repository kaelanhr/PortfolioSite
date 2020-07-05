import React, { useState } from "react";
import Project, { IProjectAttributes } from "Models/Project";
import { Link } from "react-router-dom";
import axios from "axios";
import { IfAdmin } from "Components/Conditional/If";

interface projectProps {
	list: Project[];
}

export default function ProjectList(props: projectProps) {
	const [projectList, setProjects] = useState(props.list);

	let onDelete = (title: string, id: string) => {
		let accepted = window.confirm(`Are you sure you wish to delete: ${title}?`);
		if (accepted) {
			axios
				.delete(`/Api/Project/${id}`)
				.then((response) => {
					console.log(response);
					setProjects(projectList.filter((b) => b.id != id));
				})
				.catch((error) => {
					console.log(error);
				});
		}
	};

	let listItems = projectList.map((x) => (
		<ProjectListItem {...x} onItemRemoved={onDelete} />
	));
	return (
		<>
				{listItems.length > 0 ? listItems : <EmptyProjectsList />}
		</>
	);
}

function EmptyProjectsList() {
	return (
		<div>
			<p>No Projects Listed</p>
		</div>
	);
}

interface IProjectItemProps extends IProjectAttributes {
	onItemRemoved: Function;
}

function ProjectListItem(props: IProjectItemProps) {
	return (
		<div className="project">
			<Link to={`/projects/${props.id}`}>{props.title}</Link>
			<IfAdmin>
				<div className="admin-icons">
					<Link to={`/projects/edit/${props.id}`}>
						<img src="/Icons/edit-icon.svg" className="action-icon" />
					</Link>
					<img
						src="/Icons/bin-icon.svg"
						onClick={() => props.onItemRemoved(props.title, props.id)}
						className="action-icon"
					/>
				</div>
			</IfAdmin>
		</div>
	);
}
