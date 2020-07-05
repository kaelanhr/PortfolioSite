import React from "react";
import Back from "Components/Button/Back";
import ContentWrapper from "Components/ContentWrapper/ContentWrapper";
import ErrorMessage from 'Components/Text/ErrorMessage';

export interface AdminFormProps<T> {
	header?: string;
	submitText?: string;
	model: T;
	onSubmit: (event: React.FormEvent<HTMLFormElement>, model: T) => void;
	children?: React.ReactNode;
	errorList?: string[];
}

export function AdminForm<T>(props: AdminFormProps<T>) {
	return (
		<>
				<div className="admin-form">
					<h1>{props.header}</h1>
					{props.errorList?.map((e) => (
						<ErrorMessage>{e}</ErrorMessage>
					))}
					<form onSubmit={(event) => props.onSubmit(event, props.model)}>
						{props.children}
						<input type="submit" value={`${props.submitText ?? "Submit"}`} />
					</form>
					<Back />
				</div>
		</>
	);
}
