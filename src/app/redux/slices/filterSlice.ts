import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface initialStateInterface {
	currentPage: number;
	currentCategory: number;
	typeFilter: {
		type: string;
		name: string;
	};
}

interface forPayloadAction {
	type: string;
	name: string;
}

const initialState: initialStateInterface = {
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
		setCategoryId(state, action: PayloadAction<number | string>) {
			state.currentCategory = +action.payload;
		},

		setCurrentPage(state, action: PayloadAction<number>) {
			console.log(action.payload);
			state.currentPage = +action.payload;
		},
		setTypeFilter(state, action: PayloadAction<forPayloadAction>) {
			state.typeFilter = action.payload;
		},
	},
});

export const { setCategoryId, setTypeFilter, setCurrentPage } = filterSlice.actions;

export default filterSlice.reducer;
