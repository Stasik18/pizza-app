import { createSlice } from '@reduxjs/toolkit';
import { sortCategory } from '../../../features/filters/ui/sort/Sort';

const initialState = {
	currentPage: 1,
	currentCategory: 0,
	typeFilter: {
		type: 'rating',
		name: 'популярности',
	},
};

const filterSlice = createSlice({
	name: 'filter',
	initialState,
	reducers: {
		setCategoryId(state, action) {
			state.currentCategory = +action.payload;
		},

		setCurrentPage(state, action) {
			state.currentPage = +action.payload;
		},
		setTypeFilter(state, action) {
			state.typeFilter = action.payload;
		},
		setQueryParams(state, action) {
			state.currentCategory = +action.payload.currentCategory;
			state.currentPage = +action.payload.currentPage;
			state.typeFilter = action.payload.typeFilter;
		},
	},
});

export const { setCategoryId, setTypeFilter, setCurrentPage, setQueryParams } = filterSlice.actions;

export default filterSlice.reducer;
