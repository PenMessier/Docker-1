class PersonModel {
	constructor() {
		this.persons = [];
		this.personsFiltered = [];
		this.personsOnPage = [];
		this.length = this.persons.length;
	}

	createPerson(person, persons) {
		let spouse = person.spouseId ? this.getName(persons, person.spouseId) : 'N/A';
		let children = person.childrenIds.length ? 
			person.childrenIds.map(id => this.getName(persons, id)) : ['N/A'];
		let parents = person.parentsIds.length ? 
			person.parentsIds.map(id => this.getName(persons, id)) : ['N/A'];
		let item = 
		{
			'id': person.id,
			'name': person.name,
			'age': person.age,
			'sex': person.sex,
			'spouse': spouse,
			'spouseId': person.spouseId,
			'childrenIds' : person.childrenIds,
			'children': children,
			'parentsIds' : person.parentsIds,
			'parents': parents
		}
		return item;
	}

	getName(array, id) {
		return (array.find(item => item.id === id).name + ' ');
	}

	createList(persons) {
		persons.forEach(person => {
			let item = this.createPerson(person, persons);
			this.persons.push(item);
		});
		this.length = this.persons.length;
		this.personsFiltered = this.persons;
	}

	addPersonToList(person) {
		let item = this.createPerson(person, this.persons);
		this.persons.push(item);
		this.length = this.persons.length;

		if (this.onPersonChanged) {
			this.onPersonChanged();
		}
	}

	editPerson(id) {
		if (this.onPersonEdit) {
			this.onPersonEdit(id);
		}
	}

	updatePerson(id, person) {
		let updatedPerson = this.persons.find(item => item.id === id);
		updatedPerson.name = person.name;
		updatedPerson.age = person.age;
		updatedPerson.sex = person.sex;

		if (this.onPersonChanged) {
			this.onPersonChanged();
		}
	}

	updateAffectedPerson(id, person, property) {
		let updatedPerson = this.persons.find(item => item.id === id);
		switch (property) {
			case 'spouseId':
				updatedPerson.spouseId = null;
				updatedPerson.spouse = 'N/A';
				break;
			case 'childrenIds':
				updatedPerson.childrenIds = person.childrenIds;
				updatedPerson.children = updatedPerson.childrenIds.length ? 
					updatedPerson.childrenIds.map(id => this.getName(this.persons, id)) : ['N/A'];
				break;
			case 'parentsIds':
				updatedPerson.parentsIds = person.parentsIds;
				updatedPerson.parents = updatedPerson.parentsIds.length ?
					updatedPerson.parentsIds.map(id => this.getName(this.persons, id)) : ['N/A'];
				break;
		}
	}

	onRemovePerson(id) {
		let indexToRemove = this.persons.indexOf(this.persons.find(item => item.id === id));
		this.persons.splice(indexToRemove, 1);

		if (this.onPersonChanged) {
			this.onPersonChanged();
		}
	}

	removePerson(id) {
		if (this.askPersonRemove) {
			this.askPersonRemove(id);
		}
	}

	setPersonsFilteredList(persons) {
		this.personsFiltered = persons;
		this.length = this.personsFiltered.length;

		if (this.onSearchChanged) {
			this.onSearchChanged(this.personsFiltered);
		}
	}

	setPersonsOnPage(start, end) {
		this.personsOnPage = this.personsFiltered.slice(start, end);

		if (this.onValueChanged) {
			this.onValueChanged(this.personsOnPage);
		}
	}

	subscribe(onValueChanged, onSearchChanged, onPersonChanged, onPersonEdit, askPersonRemove) {
		this.onValueChanged = onValueChanged;
		this.onSearchChanged = onSearchChanged;
		this.onPersonChanged = onPersonChanged;
		this.onPersonEdit = onPersonEdit;
		this.askPersonRemove = askPersonRemove;
	}
}