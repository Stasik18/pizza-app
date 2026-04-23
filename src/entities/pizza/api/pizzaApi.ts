import axios from 'axios';

interface FetchPizzaParams {
	typeFilter: string;
	currentPage: number;
	searchText: string;
	currentCategory?: number;
}

export const pizzaApi = {
	fetchAll: (params: FetchPizzaParams) => {
		const url = new URL(`https://6989c620c04d974bc6a05c40.mockapi.io/items`);
		console.log(params);
		url.searchParams.set('sortBy', params.typeFilter);
		url.searchParams.set('search', params.searchText);
		url.searchParams.set('page', String(params.currentPage));
		url.searchParams.set('limit', String(4));
		params.currentCategory === undefined
			? url
			: url.searchParams.append('category', String(params.currentCategory));

		return axios.get(String(url));
	},
};
