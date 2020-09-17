import React, { Component } from "react";
import { InputFieldProps } from './InputFieldProps';
import { observer } from 'mobx-react';
import { action } from 'mobx';

export interface TextFieldProps<T> extends InputFieldProps<T> {
	type: "text" | "email" | "password";
	onBlur?: ((event: React.FocusEvent<HTMLInputElement>) => void) | undefined;
	placeholder?: string;
	value?: string;
}

@observer
export default class TextField<T> extends Component<TextFieldProps<T>> {
	render() {
		return (
			<>
				<label>{this.props.label}</label>
				<input
					type={this.props.type}
					name={this.props.modelProperty as string}
					onChange={this.handleUserInput}
					onBlur={this.props.onBlur}
					placeholder={this.props.placeholder}
					value={
						this.props.model[this.props.modelProperty]}
				/>
			</>
		);
	}

	@action
	private handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		this.props.model[this.props.modelProperty] = e.target.value as any;
	};
}
