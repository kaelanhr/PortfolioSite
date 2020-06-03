import { observer } from "mobx-react";
import React, { Component } from "react";
import ErrorMessage from "../Text/ErrorMessage";
interface LoadingProps {
	loadElement?: JSX.Element;
	errorElement?: JSX.Element;
	requestState: loadingState;
}

export type loadingState = "error" | "loading" | "done";

@observer
export class LoadData extends Component<LoadingProps> {
	render() {
		let blogContent = () => {
			switch (this.props.requestState) {
				case "error":
					return this.props.loadElement ? this.props.errorElement : <Error />;
				case "done":
					return this.props.children;
				case "loading":
				default:
					return this.props.loadElement ? this.props.loadElement : <Loading />;
			}
		};
		return blogContent();
	}
}

function Loading() {
	return (
		<>
			<div>
				<p>Loading...</p>
			</div>
		</>
	);
}

function Error() {
	return <ErrorMessage>There was an error loading the content</ErrorMessage>;
}
