// Class & methods for fetch API
class CustomHTTPMethods {
	async get(url) {
		try {
			const response = await fetch(url);
			const data = await response.json();
			return data;
		} catch(error) {
			console.log(error);
		}
	}

	async post(url, product) {
		try {
			const response = await fetch(url, {
				method: 'POST',
				headers: {
					'Content-type': 'application/json',
				},
				body: JSON.stringify(product),
			});
			const data = await response.json();
			return data;
		} catch(error) {
			console.log(error);
		}
	}

	async put(url, product) {
		try {
			const response = await fetch(url, {
				method: 'PUT',
				headers: {
					'Content-type': 'application/json',
				},
				body: JSON.stringify(product),
			});
			const data = await response.json();
			return data;
		} catch(error) {
			console.log(error);
		}
	}

	async delete(url) {
		try {
			const response = await fetch(url, {
				method: 'DELETE',
				headers: {
					'Content-type': 'application/json',
				},
			});
			const data = await response.json();
			return data;
		} catch(error) {
			console.log(error);
		}
	}
}

export const http = new CustomHTTPMethods();
