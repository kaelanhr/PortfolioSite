import React from "react";
import PageLayout from "Pages/PageLayout";
import ContentWrapper, { ContentWrapperProps } from "Components/ContentWrapper/ContentWrapper";

interface PageProps extends ContentWrapperProps {
	header: React.ReactNode;
	children?: React.ReactNode;
	nameInHeader?: boolean;
	beforeWrapper?: React.ReactNode;

}

export default function Page(props: PageProps) {
	return (
		<PageLayout
			displayHeader={props.nameInHeader ?? true}
			headerComponent={props.header}
		>
			{props.beforeWrapper}
			{<ContentWrapper wrapperType={props.wrapperType}>{props.children}</ContentWrapper>}
		</PageLayout>
	);
}
