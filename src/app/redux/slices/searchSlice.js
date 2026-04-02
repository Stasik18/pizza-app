import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	searchText: '',
};

const searchSlice = createSlice({
	name: 'search',
	initialState,
	reducers: {
		setSearch(state, action) {
			state.searchText = action.payload;
		},
	},
});

export const { setSearch } = searchSlice.actions;

export default searchSlice.reducer;
