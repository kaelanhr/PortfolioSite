import React, { Component } from 'react'
import { observer } from 'mobx-react';

interface IProps {
	onChange: Function
}

@observer
export default class TextField extends Component<IProps> {
	constructor(props: any) {
		super(props);
	}

	onChange(event: any) {
		this.props.onChange(event.target.name, event.target.value)
	}

	render() {
		return (
			<input type="text" onChange={this.onChange} />
		)
	}
}