import React, { Component } from "react";
import { InputFieldProps } from "./InputFieldProps";

export default class Checkbox<T> extends Component<InputFieldProps<T>> {
	render() {
		return (
			<>
				<div className="container">
					<label>{this.props.label}</label>
					<input
						type="checkbox"
						name={this.props.modelProperty as string}
						onChange={this.handleUserInput}
						checked={this.props.model[this.props.modelProperty]}
					/>
					<span className="checkmark"></span>
				</div>
			</>
		);
	}

	private handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		this.props.model[this.props.modelProperty] = !this.props.model[
			this.props.modelProperty
		];
	};
}
