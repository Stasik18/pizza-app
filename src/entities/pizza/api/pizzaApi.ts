import axios from 'axios';
import { FetchPizzaParams, FetchPizzaResponse, Pizza } from '../types/pizzaType';

export const pizzaApi = {
	fetchAll: async (params: FetchPizzaParams): Promise<FetchPizzaResponse> => {
		const url = new URL(`https://6989c620c04d974bc6a05c40.mockapi.io/items`);

		url.searchParams.set('sortBy', params.typeFilter);
		url.searchParams.set('search', params.searchText);
		url.searchParams.set('page', String(params.currentPage));
		url.searchParams.set('limit', String(4));
		if (params.currentCategory !== undefined) {
			url.searchParams.append('category', String(params.currentCategory));
		}
		return axios.get<Pizza[]>(String(url));
	},
};
