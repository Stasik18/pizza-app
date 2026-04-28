import { AxiosResponse } from 'axios';

export interface Pizza {
	id: number;
	imageUrl: string;
	title: string;
	types: number[];
	sizes: number[];
	price: number;
	category: number;
	rating: number;
}

export interface PizzaInCart {
	imageUrl: string;
	title: string;
	type: string;
	size: number;
	price: number;
	id: number;
	uniqueCode: string;
	count?: number;
}

export interface FetchPizzaParams {
	typeFilter: string;
	currentPage: number;
	searchText: string;
	currentCategory?: number;
}

export type FetchPizzaResponse = AxiosResponse<Pizza[]>;
