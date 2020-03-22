import React, { Component } from 'react'

export interface TextFieldProps<T> {
	model: T
	modelProperty: string //keyof T
	type: 'text' | 'email' | 'password'
	label?: string
	onBlur?: ((event: React.FocusEvent<HTMLInputElement>) => void) | undefined
}

export default class TextField<T> extends Component<TextFieldProps<T>> {

	render() {
		return (
			<>
				<label>{this.props.label}</label>
				{/* temp add in br */}
				<br />
				<input type={this.props.type} name={this.props.modelProperty as string} onChange={this.handleUserInput} onBlur={this.props.onBlur} />
			</>
		)
	}
	private handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		this.props.model[this.props.modelProperty] = e.target.value as any
	}
}