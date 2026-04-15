import axios from 'axios';

export const pizzaApi = {
	fetchAll: (params) => {
		console.log(params);
		const url = new URL(`https://6989c620c04d974bc6a05c40.mockapi.io/items`);

		url.searchParams.set('sortBy', params.typeFilter);
		url.searchParams.set('search', params.searchText);
		url.searchParams.set('page', params.currentPage);
		url.searchParams.set('limit', 4);
		params.currentCategory === undefined
			? url
			: url.searchParams.append('category', params.currentCategory);

		return axios.get(url);
	},
};
