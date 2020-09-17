import React, { Component } from "react";
import { InputFieldProps } from "./InputFieldProps";
import { action } from "mobx";
import { observer } from "mobx-react";

interface Option {
	value?: string;
	displayValue?: string;
}

export interface SelectFieldProps<T> extends InputFieldProps<T> {
	options: Option[];
	selected: string;
	value?: string;
}

@observer
export default class Select<T> extends Component<SelectFieldProps<T>> {
	render() {
		return (
			<select onChange={this.handleSelectionChanged}>
				{this.props.options?.map((x) => (
					<option value={x.value} selected={this.props.selected == x.value}>
						{x.displayValue}
					</option>
				)) ?? ""}
			</select>
		);
	}

	@action
	private handleSelectionChanged = (
		e: React.ChangeEvent<HTMLSelectElement>
	) => {
		this.props.model[this.props.modelProperty] = e.target.value as any;
	};
}
