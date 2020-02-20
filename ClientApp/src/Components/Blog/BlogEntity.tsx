import React, { Component } from 'react'
import Back from '../Back';


interface IProps {
	entityAction: EntityAdminAction
}

export type EntityAdminAction = "Create" | "Update";

export default class BlogEntity extends Component<IProps> {
	constructor(props: any) {
		super(props);
	}

	render() {
		return (
			<>
				<h1>{this.props.entityAction} A blog</h1>
				<form>
					<h2>Title</h2>
					<input type="text" />
					<h2>Content</h2>
					<input type="text" />
					<input type="submit" value={(this.props.entityAction == "Create" ? this.props.entityAction : "Update") + " Blog"} />
				</form>
				<Back />
			</>
		)
	}
}