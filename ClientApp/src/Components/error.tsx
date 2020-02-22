import React, { Component, PureComponent } from 'react'

export default class ErrorMessage extends PureComponent {
	render() {
		return (
			<p className='error'>
				{this.props.children}
			</p>
		);
	}
}