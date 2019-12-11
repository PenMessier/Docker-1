class RemovePersonComponent {
	constructor(personModel, personsApiService) {
		this.model = personModel;
		this.personsApiService = personsApiService;
	}

	render($changePerson, id) {
		this.person = this.model.persons.find(item => item.id === id);

		let $template = $($('[data-template="removePerson"]').text());
		$template.find('[data-remove-person-name]').text(this.person.name);
		
		const affectedPersonsList = [];
		if (this.person.spouseId !== null && this.person.spouseId !== undefined)
			affectedPersonsList.push(this.person.spouseId);
		if (this.person.childrenIds.length)
			this.person.childrenIds.forEach(id => affectedPersonsList.push(id));
		if (this.person.parentsIds.length)
			this.person.parentsIds.forEach(id => affectedPersonsList.push(id));
		if (affectedPersonsList.length) {
			affectedPersonsList.forEach(id => {
				let $li = $('<li>' + this.model.persons.find(item => item.id === id).name + '</li>');
				$template.find('[data-persons-affected-list]').append($li);
			});
		}
		else {
			$template.find('[data-persons-affected-list]').html('none');
		}

		let $removeButton = $template.find('[data-remove-person-button]');
		$removeButton.on('click', () => this.onPersonRemove(id));
	
		$changePerson.html($template);
	}

	updatePersons() {
		if (this.person.spouseId !== null && this.person.spouseId !== undefined) {
			let id = this.person.spouseId;
			let spouse = this.model.persons.find(item => item.id === id);
			let personSpouse = {
				"id": '',
				"name": spouse.name,
				"age": spouse.age,
				"sex": spouse.sex,
				"childrenIds": spouse.childrenIds,
				"parentsIds": spouse.parentsIds,
				"spouseId": null
			};
			this.model.updateAffectedPerson(id, personSpouse, 'spouseId');
			this.personsApiService.updatePerson(id, personSpouse);
		}
		if (this.person.childrenIds.length) {
			this.person.childrenIds.forEach(id => {
				let child = this.model.persons.find(item => item.id === id);
				let personChild = {
					"id": '',
					"name": child.name,
					"age": child.age,
					"sex": child.sex,
					"childrenIds": child.childrenIds,
					"parentsIds": child.parentsIds.filter(item => item != this.person.id),
					"spouseId": child.spouseId
				};
				this.model.updateAffectedPerson(id, personChild, 'parentsIds');
				this.personsApiService.updatePerson(id, personChild);
			});
		}
		if (this.person.parentsIds.length) {
			this.person.parentsIds.forEach(id => {
				let parent = this.model.persons.find(item => item.id === id);
				let personParent = {
					"id": '',
					"name": parent.name,
					"age": parent.age,
					"sex": parent.sex,
					"childrenIds": parent.childrenIds.filter(item => item != this.person.id),
					"parentsIds": parent.parentsIds,
					"spouseId": parent.spouseId
				};
				this.model.updateAffectedPerson(id, personParent, 'childrenIds');
				this.personsApiService.updatePerson(id, personParent);
			})
		}
	}

	onPersonRemove(id) {
		this.updatePersons();
		this.personsApiService.removePerson(id).then(() => this.model.onRemovePerson(id));
		$('#modalChangePerson').modal('hide');
	}
}