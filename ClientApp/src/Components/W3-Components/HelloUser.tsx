import React, { Component } from 'react';

interface MyProps {
	name: any
}


class HelloUser extends React.Component<MyProps> {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<h2>Hello {this.props.name}</h2>
		);
	}
}

export default HelloUser;