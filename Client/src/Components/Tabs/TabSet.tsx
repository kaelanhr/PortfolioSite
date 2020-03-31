import React, { Component } from 'react'
import { observer } from 'mobx-react';
import { observable, action } from 'mobx';

interface TabSetProps {
	children?: React.ReactElement<TabProps>[]
}
@observer
export class TabSet extends Component<TabSetProps> {

	@action
	switchTab(tabName: string) {
		this.tabs = this.props.children ? this.props.children
			?.filter(x => x.props.name == tabName)[0] : null
	}

	@observable
	activeTab = this.props.children ? this.props.children[0].props.name : ''

	@observable
	tabs = this.props.children ? this.props.children.filter(child => child.props.name == this.activeTab)[0] : null

	render() {
		const tabTitles = this.props.children ? this.props.children?.map(child => {
			return <button onClick={() => this.switchTab(child.props.name)}>{child.props.name}</button>;
		}) : null;
		return (
			<div className="tab-set">
				{tabTitles}
				{this.tabs}
			</div>
		)
	}

	toStandardAttrFormat = (word: string) => {
		return word.toLowerCase().split(" ").join("-")
	}
}

interface TabProps {
	name: string,
}

export class Tab extends Component<TabProps> {
	render() {
		return (
			<>
				{this.props.children}
			</>
		);
	}
}