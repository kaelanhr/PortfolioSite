import { observer } from "mobx-react";
import React, { Component } from "react";
import ErrorMessage from "../Text/ErrorMessage";
import { observable, action } from "mobx";
interface LoadingProps<T> {
	promise: Promise<T>;
	loadElement?: React.ReactNode;
	errorElement?: (error: any) => React.ReactNode;
	done: (data: T) => React.ReactNode;
}

@observer
export class LoadData<T> extends React.Component<LoadingProps<T>> {
	@observable
	private requestState: "error" | "loading" | "done" = "loading";

	@observable
	private data: T;

	@observable
	private error: any;

	@action
	private onDone = (data: T) => {
		this.requestState = "done";
		this.data = data;
		return data;
	};

	@action
	private onError = (error: any) => {
		this.requestState = "error";
		this.error = error;
		return error;
	};

	componentDidMount() {
		this.props.promise.then(this.onDone).catch(this.onError);
	}

	render() {
		switch (this.requestState) {
			case "error":
				return this.props.errorElement ?? <Error />
			case "done":
				return this.props.done(this.data);
			case "loading":
			default:
				return this.props.loadElement ?? <Loading />;
		}
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
