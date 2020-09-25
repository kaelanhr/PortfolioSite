import React, { useState } from "react";

export interface InputFieldProps<T> {
	model: T;
	modelProperty: string;
	label?: string;
}

export default function UploadFile<T>(props: InputFieldProps<T>) {
	const [uploadErrors, setUploadErrors] = useState<string[]>([]);

	const onChange = (e: React.FormEvent<HTMLInputElement>) => {
		if (e.currentTarget.files) {
			ValidateFile(e.currentTarget.files[0]);

			if (uploadErrors.length > 0) {
				return;
			}

			props.model[props.modelProperty] = e.currentTarget.files[0] as any;
		}
	};

	const ValidateFile = (file: any) => {
		let fileError: string[] = [];

		if (file.size > 300000) {
			fileError.push("File size cannot exceed 3mb");
		}

		if (file.type != ".png" || ".jpg") {
			fileError.push("Upload must be either .png or .jpg");
		}
		setUploadErrors(fileError);
	};
	return (
		<div>
			<label>{props.label}</label>
			<input type="file" onChange={onChange} />
			{uploadErrors.map((error) => (
				<span>{error}</span>
			))}
		</div>
	);
}
