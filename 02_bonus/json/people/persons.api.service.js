class PersonsApiService {
	constructor(apiUrl) {
		this.apiUrl = apiUrl;
	}

	getList() {
		return fetch(this.apiUrl)
			.then(response => { return response.json(); },
				error => { alert('Error'); }
			)
	}

	addNewPerson(person) {
		let promise = fetch(this.apiUrl, {
			body: JSON.stringify(person),
			headers: {
				'content-type': 'application/json'
			},
			method: 'POST'
		}).then(response => { return response.json() },
			error => { alert('Error'); });

		return promise;
	}

	updatePerson(id, person) {
		let promise = fetch(this.apiUrl + '/' + id, {
			body: JSON.stringify(person),
			headers: {
				'content-type': 'application/json'
			},
			method: 'PUT'
		}).then(response => { return response.json() },
			error => { alert('Person with this id not found'); });

		return promise;
	}

	removePerson(id) {
		let promise = fetch(this.apiUrl + '/' + id, {
			method: 'DELETE'
		});

		return promise;
	}
}