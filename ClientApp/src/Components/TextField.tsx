import React, { Component } from 'react'

interface IProps<T> {
	model: T
	modelProperty: keyof T
}

export default class CustomTextField<T> extends Component<IProps<T>> {

	render() {
		return (
			<input type="text" name={this.props.modelProperty as string} onChange={this.handleUserInput} />
		)
	}
	private handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		this.props.model[this.props.modelProperty] = e.target.value as any
	}
}