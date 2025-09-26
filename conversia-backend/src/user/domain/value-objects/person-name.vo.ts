/**
 * Value Object for a person's name (first + last), normalized and validated.
 */
export default class PersonName {
	private constructor(
		private readonly firstName: string,
		private readonly lastName: string,
	) {
		if (!firstName?.trim() || !lastName?.trim()) throw new Error('Invalid name');
	}

	static create(first: string, last: string): PersonName {
		return new PersonName(first.trim(), last.trim());
	}

	get first(): string {
		return this.firstName;
	}

	get last(): string {
		return this.lastName;
	}

	get full(): string {
		return `${this.firstName} ${this.lastName}`;
	}
}


