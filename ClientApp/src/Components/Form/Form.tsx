import React, { Component, FormEvent } from 'react';

interface FormProps {
	submitHandler: any
}

class Form extends Component<FormProps>{
	render() {
		return (
			<form onSubmit={this.props.submitHandler}>
				{this.props.children}
				<button type="submit">Submit</button>
			</form>
		);
	}
}

export default Form;