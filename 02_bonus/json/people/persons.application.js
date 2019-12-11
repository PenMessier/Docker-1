class PersonsApplication {
	constructor(personsApiService, personModel, $main, $search, $changePerson) {
		this.personsApiService = personsApiService;
		this.personModel = personModel;
		this.$main = $main;
		this.$search = $search;
		this.$changePerson = $changePerson;
	}

	renderData() {
		this.personsApiService.getList()
		.then(data => {
			this.personModel.createList(data);

			this.searchComponent = new SearchComponent(this.personModel, this.$search);
			this.searchComponent.render(this.personModel.persons);

			this.paginationComponent = new PaginationComponent(this.personModel);
			this.paginationComponent.render(this.personModel.length);

			this.personsComponent = new PersonsComponent(this.$main, this.personModel);
			this.personsComponent.renderList(this.personModel.personsOnPage);

			this.personModel.subscribe((array) => this.onPaginationChange(array), 
				(array) => this.onSearchChange(array), () => this.onPersonChanged(),
				(id) => this.onPersonEdit(id), (id) => this.askRemovePerson(id));

			const $addPersonButton = $('[data-add-person-button]');
			$addPersonButton.on('click', () => this.addEditPerson('add', null));

		})
	}

	onSearchChange(personsFiltered) {
		this.paginationComponent.render(personsFiltered.length);
		this.personsComponent.renderList(this.personModel.personsOnPage);
	}

	onPaginationChange(personsOnChange) {
		this.personsComponent.renderList(personsOnChange);
	}

	onPersonChanged() {
		this.searchComponent.filterList(this.personModel.persons);
		this.paginationComponent.render(this.personModel.personsFiltered.length);
		this.personsComponent.renderList(this.personModel.personsOnPage);
	}

	addEditPerson(action, id) {
		const addPersonModel = new AddPersonModel();
		this.addPersonComponent = new AddPersonComponent(addPersonModel, this.personModel, this.personsApiService);
		this.addPersonComponent.render(this.$changePerson, action, id);
	}

	onPersonEdit(id) {
		this.addEditPerson('edit', id);
	}

	askRemovePerson(id) {
		const removePersonComponent = new RemovePersonComponent(this.personModel, this.personsApiService);
		removePersonComponent.render(this.$changePerson, id);
	}
}