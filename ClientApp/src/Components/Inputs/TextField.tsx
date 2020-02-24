import React, { Component } from 'react'

export interface TextFieldProps<T> {
	model: T
	modelProperty: string //keyof T
	type: 'text' | 'email' | 'password'
}

export default class TextField<T> extends Component<TextFieldProps<T>> {

	render() {
		return (
			<input type="text" name={this.props.modelProperty as string} onChange={this.handleUserInput} />
		)
	}
	private handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		this.props.model[this.props.modelProperty] = e.target.value as any
	}
}