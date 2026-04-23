import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { pizzaApi } from '../../../entities/pizza/api/pizzaApi';

interface FetchPizzaParams {
	typeFilter: string;
	currentPage: number;
	searchText: string;
	currentCategory?: number;
}

interface Pizza {
	id: number;
	imageUrl: string;
	title: string;
	types: number[];
	sizes: number[];
	price: number;
	category: number;
	rating: number;
}

interface forInitialStatePizzaSlice<T> {
	items: T[];
	error: string | null;
	status: string;
}

export const fetchPizza = createAsyncThunk(
	'pizzas/fetchPizza',
	async (params: FetchPizzaParams, thunkAPI) => {
		const response = await pizzaApi.fetchAll(params); // типизировать responce

		if (response.data.length === 0) return thunkAPI.rejectWithValue('пиццы съедены');

		return thunkAPI.fulfillWithValue(response.data);
	},
);

const initialState: forInitialStatePizzaSlice<Pizza> = {
	items: [],
	error: null,
	status: 'idle',
};

const pizzasSlice = createSlice({
	name: 'pizzas',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		// типизировать эту штукудрюку
		builder
			.addCase(fetchPizza.pending, (state) => {
				state.status = 'loading';
				state.items = [];
			})
			.addCase(fetchPizza.fulfilled, (state, action) => {
				state.status = 'success';
				state.items = action.payload;
			})
			.addCase(fetchPizza.rejected, (state) => {
				state.status = 'error';
				state.items = [];
			});
	},
});

export default pizzasSlice.reducer;
