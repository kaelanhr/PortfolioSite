export default class Blog {
	// partial attributes
	constructor(attributes?: Partial<IBlogAttributes>) {
		// todo call a super constructor
		//super(attributes);

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

export interface IBlogAttributes {
	title: string;
	headerImagePath: string;
}
