import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface forInitialStateSearchSlice {
	searchText: string;
}

const initialState: forInitialStateSearchSlice = {
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
