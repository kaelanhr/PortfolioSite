export default class AbstractModel {
	constructor(attributes?: any) {
		if (attributes) {
			if (attributes.id) {
				this.id = attributes.id;
			}
		}
	}

	public id: string;
}

export interface IAbstractAttributes {
	id: string;
}
