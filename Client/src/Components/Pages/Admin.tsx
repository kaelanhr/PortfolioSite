import React, { Component } from 'react'
import { store } from '../store'
import { Redirect } from 'react-router';
import TextArea from '../Inputs/TextArea';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import Form from '../Form/Form';
import ErrorMessage from '../error';

interface IState {
	errorState: string
}

@observer
export default class Admin extends Component<{}, IState> {
	constructor(props: any) {
		super(props);

		this.state = { errorState: "" }
	}


	@observable
	private AdminContentModel = {
		About: '',
	};

	render() {
		if (!store.hasBackendAccess) {
			return <Redirect to="/404" />
		}
		return (
			<>
				<div>

					<p>Hello {store.userData.userName}</p>

					<Form submitHandler={this.SubmitHandler}>
						<ErrorMessage>{this.state.errorState}</ErrorMessage>
						<TextArea model={this.AdminContentModel} modelProperty={"About"} label="About" />
					</Form>
				</div>
			</>
		)
	}

	// Validate the form on the clientside.
	ValidateForm = (): boolean => {
		let error = '';
		let items = Object.keys(this.AdminContentModel);

		// get all the keys which are empty
		items = items.filter(v => {
			return this.AdminContentModel[v] == ''
		})

		if (items.length > 0) {
			error = `${items.join(", ")} are required`
			this.setState({ errorState: error })
			return false;
		}
		this.setState({ errorState: '' })
		return true;
	}

	SubmitHandler = (event: any) => {
		event.preventDefault();
		if (!this.ValidateForm()) { return; }
	}
}