import React from "react";
import Back from "Components/Button/Back";
import ContentWrapper from "Components/ContentWrapper/ContentWrapper";

export interface AdminFormProps<T> {
	header?: string;
	submitText?: string;
	model: T;
	onSubmit: (event: React.FormEvent<HTMLFormElement>, model: T) => void;
	children?: React.ReactNode;
}

export function AdminForm<T>(props: AdminFormProps<T>) {
	return (
		<>
			<ContentWrapper>
				<div className="admin-form">
					<h1>{props.header}</h1>
					<form onSubmit={(event) => props.onSubmit(event, props.model)}>
						{props.children}
						<input type="submit" value={`${props.submitText ?? "Submit"}`} />
					</form>
					<Back />
				</div>
			</ContentWrapper>
		</>
	);
}
