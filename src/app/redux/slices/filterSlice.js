import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	currentPage: 1,
	currentCategory: 0,
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
			state.currentCategory = action.payload;
		},
		setTypeFilter(state, action) {
			state.typeFilter.name = action.payload.name;
			state.typeFilter.type = action.payload.type;
		},
		setCurrentPage(state, action) {
			state.currentPage = action.payload;
			console.log(state.currentPage);
		},
	},
});

export const { setCategoryId, setTypeFilter, setCurrentPage } = filterSlice.actions;

export default filterSlice.reducer;
