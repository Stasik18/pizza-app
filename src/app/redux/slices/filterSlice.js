import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	categoryId: 0,
	typeFilter: {
		name: 'популярности',
		type: 'rating',
	},
};

const filterSlice = createSlice({
	name: 'filter',
	initialState,
	reducers: {
		setCategoryId(state, action) {
			state.categoryId = action.payload;
		},
		setTypeFilter(state, action) {
			state.typeFilter.name = action.payload.name;
			state.typeFilter.type = action.payload.type;
		},
	},
});

export const { setCategoryId, setTypeFilter } = filterSlice.actions;

export default filterSlice.reducer;
