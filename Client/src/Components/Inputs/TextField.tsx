import React, { Component } from "react";

export interface TextFieldProps<T> {
	model: T;
	modelProperty: string;
	type: "text" | "email" | "password";
	label?: string;
	onBlur?: ((event: React.FocusEvent<HTMLInputElement>) => void) | undefined;
	placeholder?: string;
	value?: string;
}

export default class TextField<T> extends Component<TextFieldProps<T>> {
	render() {
		return (
			<>
				<label>{this.props.label}</label>
				{/* temp add in br */}
				<br />
				<input
					type={this.props.type}
					name={this.props.modelProperty as string}
					onChange={this.handleUserInput}
					onBlur={this.props.onBlur}
					placeholder={this.props.placeholder}
					value={this.props.value}
				/>
			</>
		);
	}

	private handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		console.log("the thing happened");
		this.props.model[this.props.modelProperty] = e.target.value as any;
	};
}
