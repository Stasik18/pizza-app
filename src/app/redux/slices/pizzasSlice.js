import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { pizzaApi } from '../../../entities/pizza/api/pizzaApi';

export const fetchPizza = createAsyncThunk('pizzas/fetchPizza', async (params, thunkAPI) => {
	const response = await pizzaApi.fetchAll(params);

	if (response.data.length === 0) return thunkAPI.rejectWithValue('пиццы съедены');

	return thunkAPI.fulfillWithValue(response.data);
});

const initialState = {
	items: [],
	error: null,
	status: 'idle',
};

const pizzasSlice = createSlice({
	name: 'pizzas',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
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
