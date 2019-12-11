(function ($) {
	$(function () {
		loadTemplates().then(() => {
			const $main = $('#main');
			const $search = $('#search');
			const $changePerson = $('#modalChangePerson');
	
			const personModel = new PersonModel();
			const personsApiService = new PersonsApiService('http://localhost/persons');
			const personsApp = new PersonsApplication(personsApiService, personModel, $main, $search, $changePerson);
			personsApp.renderData();
		});
	});
})(jQuery);