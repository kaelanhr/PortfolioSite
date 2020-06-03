import AbstractModel, { IAbstractAttributes } from "./AbstractModel";

export default class Blog extends AbstractModel implements IBlogAttributes {
	constructor(attributes?: Partial<IBlogAttributes>) {
		super(attributes);

		if (attributes) {
			if (attributes.title) {
				this.title = attributes.title;
			}
			if (attributes.headerImagePath) {
				this.headerImagePath = attributes.headerImagePath;
			}
		}
	}

	public headerImagePath: string;
	public title: string;
}

export interface IBlogAttributes extends IAbstractAttributes {
	title: string;
	headerImagePath: string;
}
