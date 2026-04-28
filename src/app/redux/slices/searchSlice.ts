import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SearchState {
	searchText: string;
}

const initialState: SearchState = {
	searchText: '',
};

const searchSlice = createSlice({
	name: 'search',
	initialState,
	reducers: {
		setSearch(state, action: PayloadAction<string>) {
			state.searchText = action.payload;
		},
	},
});

export const { setSearch } = searchSlice.actions;

export default searchSlice.reducer;
