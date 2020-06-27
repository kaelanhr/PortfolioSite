import React from "react";
import { AdminForm, AdminFormProps } from './AdminForm';

interface CreateUpdateProps<T> extends AdminFormProps<T> {
	entityAction: EntityAdminAction;
	entityDisplayName: string;
}

export type EntityAdminAction = "Create" | "Update";

export default function CreateUpdateForm<T>(props: CreateUpdateProps<T>) {
	return (
		<AdminForm
			header={props.header ?? `${props.entityAction} A ${props.entityDisplayName}`}
			submitText={`${props.entityAction} ${props.entityDisplayName}`}
			model={props.model}
			onSubmit={props.onSubmit}
			children={props.children}
		/>
	);
}
