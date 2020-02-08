import React, { Component } from 'react'

interface ITodoState {
	items: IItem[]
	text: string
}

export default class Todo extends Component<{}, ITodoState> {
	constructor(props) {
		super(props);
		this.state = { items: [], text: '' };
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	render() {
		return (
			<div>
				<h3>TODO List</h3>
				<TodoList items={this.state.items} />
				<form onSubmit={this.handleSubmit}>
					<label htmlFor="new-todo">
						What do you need to do?
					</label>
					<input
						id="new-todo"
						onChange={this.handleChange}
						value={this.state.text}
					/>
					<button>
						Add #{this.state.items.length + 1}
					</button>
				</form>
			</div>
		)
	}
	handleChange(e) {
		this.setState({ text: e.target.value });
	}
	handleSubmit(e) {
		e.preventDefault();
		if (!this.state.text.length) {
			return;
		}
		const newItem = {
			text: this.state.text,
			id: Date.now()
		};
		this.setState(state => ({
			items: state.items.concat(newItem),
			text: ''
		}));
	}
}

interface IListProps {
	items: IItem[]
}

interface IItem {
	id: any
	text: any
}

class TodoList extends Component<IListProps> {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<ul>
				{this.props.items.map(item => (
					<li key={item.id}>{item.text}</li>
				))}
			</ul>
		);
	}
}
