import { action, observable } from "mobx";
import { observer } from "mobx-react";
import React, { Component } from "react";

interface TabSetProps {
	displayTop: boolean;
	children?: React.ReactElement<TabProps>[];
}
@observer
export class TabSet extends Component<TabSetProps> {
	@action
	switchTab(tabName: string) {
		this.tabs = this.props.children
			? this.props.children?.filter((x) => x.props.name == tabName)[0]
			: null;
	}

	@action
	nextTabIndex() {
		this.currentIndex++;
		if (this.props.children) {
			if (this.currentIndex > this.props.children?.length - 1) {
				this.currentIndex = 0;
			}
		}

		this.tabs = this.props.children
			? this.props.children?.filter(
					(x) => x.props.index == this.currentIndex
			  )[0]
			: null;
	}

	@observable
	activeTab = this.props.children ? this.props.children[0].props.name : "";

	@observable
	currentIndex = 0;

	@observable
	tabs = this.props.children
		? this.props.children.filter(
				(child) => child.props.name == this.activeTab
		  )[0]
		: null;

	render() {
		const tabTitles = this.props.children
			? this.props.children?.map((child) => {
					return (
						<button onClick={() => this.switchTab(child.props.name)}>
							{child.props.name}
						</button>
					);
			  })
			: null;

		let tabDisplay = this.props.displayTop ? (
			<>
				<div className="tab-titles">{tabTitles}</div>
				<div className="tab-content">{this.tabs}</div>
			</>
		) : (
			<>
				<div className="tab-content">{this.tabs}</div>
				<div className="tab-titles">{tabTitles}</div>
			</>
		);

		return (
			<div className="tab-full">
				<div className="tab-set">{tabDisplay}</div>
				<div className="next-tab">
					<button>
						<img
							className="next-button"
							onClick={() => this.nextTabIndex()}
							src="/Icons/Right-Icon.svg"
						/>
					</button>
				</div>
			</div>
		);
	}

	toStandardAttrFormat = (word: string) => {
		return word.toLowerCase().split(" ").join("-");
	};
}

interface TabProps {
	name: string;
	index?: number;
}

export class Tab extends Component<TabProps> {
	render() {
		return <>{this.props.children}</>;
	}
}
