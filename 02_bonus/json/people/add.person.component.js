class AddPersonComponent {
	constructor(addPersonModel, personModel, personsApiService) {
		this.model = addPersonModel;
		this.personModel = personModel;
		this.personsApiService = personsApiService;
	}

	render($addPerson, action, id) {
		this.$template = $($('[data-template="addPerson"]').text());
		this.$msgNameTemplate = $($('[data-template="msgAddPersonName"]').text());
		this.$msgAgeTemplate = $($('[data-template="msgAddPersonAge"]').text());
		this.$msgGenderTemplate = $($('[data-template="msgAddPersonGender"]').text());

		const $inputName = this.$template.find('[data-add-person-name');
		$inputName.after(this.$msgNameTemplate);
		$inputName
			.on('focus', () => { this.$msgNameTemplate.removeClass('d-none') })
			.on('blur', () => { this.$msgNameTemplate.addClass('d-none') })
			.on('keyup', (e) => this.onInputNameChanged(e.target.value));

		const $inputAge = this.$template.find('[data-add-person-age]');
		$inputAge.after(this.$msgAgeTemplate);
		$inputAge
			.on('focus', () => { this.$msgAgeTemplate.removeClass('d-none') })
			.on('blur', () => { this.$msgAgeTemplate.addClass('d-none') })
			.on('keyup', (e) => this.onInputAgeChanged(e.target.value));

		const $inputGender = this.$template.find('[data-add-person-gender]');
		$inputGender.after(this.$msgGenderTemplate);
		$inputGender
			.on('blur', () => { this.$msgGenderTemplate.addClass('d-none') })
			.on('change', (e) => this.onInputGenderChanged(e.target.value));
		
		let $modalHeader = this.$template.find('[data-modal-add-person-header]');
		this.$addEditPersonButton = this.$template.find('[data-add-person]');

		if (action == 'add') {
			$modalHeader.html('Add person');
			this.$addEditPersonButton.on('click', () => this.onAddPerson());
		}
		else {
			$modalHeader.html('Edit person');
			this.$addEditPersonButton.on('click', () => this.onEditPerson(id));
		}

		if (id != null) {
			let person = this.personModel.persons.find(item => item.id === id);
			let personName = person.name;
			this.onInputNameChanged(personName);
			$inputName.val(personName);

			let personAge = person.age;
			this.onInputAgeChanged(personAge);
			$inputAge.val(personAge);

			let personGender = person.sex;
			this.onInputGenderChanged(personGender);
			$inputGender.val(personGender);
			
			this.validate();
		}
		
		$addPerson.html(this.$template);
	}

	onInputNameChanged(name) {
		let isvalid = this.model.validateName(name);
		this.validate();
		let $msgName = this.$msgNameTemplate.find('[data-msg-add-person-name]');
		if (!isvalid)
		{
			$msgName.removeClass('msgValid');
			$msgName.addClass('msgInvalid');
		}
		else
		{
			$msgName.addClass('msgValid');
			$msgName.removeClass('msgInvalid');
		}
	}

	onInputAgeChanged(age) {
		let isvalid = this.model.validateAge(age);
		this.validate();
		let $msgAge = this.$msgAgeTemplate.find('[data-msg-add-person-age]');
		if (!isvalid)	
		{
			$msgAge.removeClass('msgValid');
			$msgAge.addClass('msgInvalid');
		}
		else
		{
			$msgAge.addClass('msgValid');
			$msgAge.removeClass('msgInvalid');
		}
	}

	onInputGenderChanged(gender) {
		let isvalid = this.model.validateGender(gender);
		this.validate();
		if (!isvalid)
			this.$msgGenderTemplate.removeClass('d-none')
		else
			this.$msgGenderTemplate.addClass('d-none')
	}

	validate() {
		let isvalid = this.model.personName && this.model.personAge && this.model.personGender;
		if (isvalid) {
			this.$addEditPersonButton.removeAttr('disabled');
		}
		else {
			this.$addEditPersonButton.attr('disabled', 'disabled');
		}
	}

	onAddPerson() {
		let person = {
			"id": '',
      "name": this.model.personName,
      "age": this.model.personAge,
      "sex": this.model.personGender,
      "childrenIds": [],
      "parentsIds": [],
      "spouseId": null
		};
		this.personsApiService.addNewPerson(person)
			.then(person => this.personModel.addPersonToList(person));
		$('#modalChangePerson').modal('hide');
	}

	onEditPerson(id) {
		let person = {
			"id": '',
      "name": this.model.personName,
      "age": this.model.personAge,
      "sex": this.model.personGender,
			"childrenIds": this.personModel.persons.find(item => item.id === id).childrenIds,
      "parentsIds": this.personModel.persons.find(item => item.id === id).parentsIds,
      "spouseId": this.personModel.persons.find(item => item.id === id).spouseId
		};
		this.personsApiService.updatePerson(id, person)
			.then(person => this.personModel.updatePerson(id, person));
		$('#modalChangePerson').modal('hide');
	}
}