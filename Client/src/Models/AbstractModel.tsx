export default class AbstractModel implements IAbstractAttributes {
	constructor(attributes?: Partial<IAbstractAttributes>) {
		if (attributes) {
			if (attributes.id) {
				this.id = attributes.id;
			}
		}
	}

	public id: string;
}

/**
 * All entities have this common attribute.
 */
export interface IAbstractAttributes {
	id: string;
}
