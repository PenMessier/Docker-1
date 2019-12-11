class SearchComponent {
	constructor(personModel, $search) {
		this.personModel = personModel;
		this.$search = $search;
	}

	render(persons) {
		this.$template = $($('[data-template="search"]').text());
		this.$search.html(this.$template);
		$('[data-search-name], [data-search-age-min], [data-search-age-max]')
			.on('keyup', () => this.filterList(persons));
		$('[data-select-sex]')
			.on('change', () => this.filterList(persons));
	}

	filterList(persons) {
		let name = $('[data-search-name]').val();
		let min = $('[data-search-age-min]').val() ? $('[data-search-age-min]').val() : 1;
		let max = $('[data-search-age-max]').val() ? $('[data-search-age-max]').val() : 100;
		let sex = $('[data-select-sex]').val();
		let personsFiltered = persons.filter(item => (min <= item.age && item.age <= max));
		personsFiltered = personsFiltered.filter(item => item.name.includes(name));
		if(sex) {
			personsFiltered = personsFiltered.filter(item => item.sex == sex);
		}
		this.personModel.setPersonsFilteredList(personsFiltered);
	}
}