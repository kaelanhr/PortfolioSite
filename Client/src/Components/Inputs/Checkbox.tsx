import React, { Component } from "react";

export interface CheckboxFieldProps<T> {
	model: T;
	modelProperty: string;
	label?: string;
	value?: boolean;
}

export default class Checkbox<T> extends Component<CheckboxFieldProps<T>> {
	render() {
		return (
			<>
				<label>{this.props.label}</label>
				{/* temp add in br */}
				<br />
				<input
					type="checkbox"
					name={this.props.modelProperty as string}
					onChange={this.handleUserInput}
					checked={this.props.model[this.props.modelProperty]}
				/>
			</>
		);
	}

	private handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		this.props.model[this.props.modelProperty] = !this.props.model[
			this.props.modelProperty
		];
	};
}
