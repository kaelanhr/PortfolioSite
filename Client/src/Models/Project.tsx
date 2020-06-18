import AbstractModel, { IAbstractAttributes } from "./AbstractModel";
import axios from "axios";
import { store } from "../store";

export default class Project extends AbstractModel
	implements IProjectAttributes {
	constructor(attributes?: Partial<IProjectAttributes>) {
		super(attributes);

		if (attributes) {
			if (attributes.title) {
				this.title = attributes.title;
			}
			if (attributes.headerImagePath) {
				this.headerImagePath = attributes.headerImagePath;
			}
			if (attributes.content) {
				this.content = attributes.content;
			}
		}
	}
	public content: string;
	public headerImagePath?: string;
	public title: string;
}

export interface IProjectAttributes extends IAbstractAttributes {
	title: string;
	content: string;
	headerImagePath?: string;
}
