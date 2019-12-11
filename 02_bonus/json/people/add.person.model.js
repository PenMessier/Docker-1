class AddPersonModel {
	constructor() {
		this.personName = '';
		this.personAge = '';
		this.personGender = '';
	}

	validateName(name) {
		let isvalid = !!name;
		if (isvalid)
			this.personName = name;
		else
			this.personName = '';
	
		return isvalid;
	}

	validateAge(age) {
		let isvalid = false;
		this.personAge = '';
		if (age > 0 && age < 101)
		{
			isvalid = true;
			this.personAge = +(age);
		}

		return isvalid;
	}

	validateGender(gender) {
		let isvalid = !!gender;
		if (isvalid)
			this.personGender = gender;
		else
			this.personGender = '';

		return isvalid;
	}

	subscribe(onValueChanged) {
		this.onValueChanged = onValueChanged;
	}
}