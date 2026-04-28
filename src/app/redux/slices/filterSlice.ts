import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TypeFilter {
	type: 'rating' | 'title' | 'price';
	name: 'популярности' | 'цене' | 'алфавиту';
}
interface FilterState {
	currentPage: number;
	currentCategory: number;
	typeFilter: TypeFilter;
}

const initialState: FilterState = {
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
		setCategoryId(state, action: PayloadAction<number>) {
			state.currentCategory = action.payload;
		},

		setCurrentPage(state, action: PayloadAction<number>) {
			state.currentPage = action.payload;
		},
		setTypeFilter(state, action: PayloadAction<TypeFilter>) {
			state.typeFilter = action.payload;
		},
	},
});

export const { setCategoryId, setTypeFilter, setCurrentPage } = filterSlice.actions;

export default filterSlice.reducer;
