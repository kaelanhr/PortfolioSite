import React, { Component } from 'react'

export interface TextAreaProps<T> {
	model: T
	modelProperty: string //keyof T
	label?: string
	onBlur?: ((event: React.FocusEvent<HTMLTextAreaElement>) => void) | undefined
}

export default class TextArea<T> extends Component<TextAreaProps<T>> {

	render() {
		return (
			<>
				<span>{this.props.label}</span>
				{/* temp add in br */}
				<br />
				<textarea name={this.props.modelProperty as string} onChange={this.handleUserInput} onBlur={this.props.onBlur} />
			</>
		)
	}
	private handleUserInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		this.props.model[this.props.modelProperty] = e.target.value as any
	}
}