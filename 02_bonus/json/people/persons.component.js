class PersonsComponent {
	constructor($main, personModel) {
		this.$main = $main;
		this.model = personModel;
	}
	
	renderPerson(person) {
		const $template = $($('[data-template="person"]').text());
		const $name = $template.find('[data-person-name]');
		$name.html(person.name);

		const $age = $template.find('[data-person-age]');
		$age.html(person.age);

		const $sex = $template.find('[data-person-sex]');
		$sex.html(person.sex);

		const $spouse = $template.find('[data-person-spouse]');
		$spouse.html(person.spouse);

		const $children = $template.find('[data-person-children]');
		$children.html(person.children);

		const $parents = $template.find('[data-person-parents]');
		$parents.html(person.parents);

		const $editPersonButton = $template.find('[data-edit-person-button]');
		$editPersonButton.on('click', () => this.model.editPerson(person.id));

		const $removePersonButton = $template.find('[data-remove-person-button]');
		$removePersonButton.on('click', () => this.model.removePerson(person.id));
		
		this.$main.append($template);
	}

	renderList(persons) {
		this.$main.empty();
		persons.forEach((person) => {
			this.renderPerson(person);
		})
	}
}