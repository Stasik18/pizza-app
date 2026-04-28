import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { pizzaApi } from '../../../entities/pizza/api/pizzaApi';
import { FetchPizzaParams, Pizza } from '../../../entities/pizza/types/pizzaType';

interface PizzaState {
	items: Pizza[];
	error: string | null;
	status: 'success' | 'error' | 'loading' | 'idle';
}

export const fetchPizza = createAsyncThunk<Pizza[], FetchPizzaParams, { rejectValue: string }>(
	'pizzas/fetchPizza',
	async (params: FetchPizzaParams, thunkAPI) => {
		const response = await pizzaApi.fetchAll(params);
		// thunkAPI: AsyncThynkConfig - как типизировать ? а никак, ts сам выводит тип, поэтому отдельная тпизация вроде как и не нужна
		if (response.data.length === 0) return thunkAPI.rejectWithValue('пиццы съедены');

		return response.data;
	},
);

const initialState: PizzaState = {
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
			.addCase(fetchPizza.rejected, (state, action) => {
				state.error = action.error.message || 'Неизвестная ошибка';
				state.status = 'error';
				state.items = [];
			});
	},
});

export default pizzasSlice.reducer;
