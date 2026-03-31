import { configureStore } from '@reduxjs/toolkit';
import filterSlice from '../../../app/redux/slices/filterSlice';
import searchSlice from '../../../app/redux/slices/searchSlice';
export const store = configureStore({
	reducer: {
		filterSlice,
		searchSlice,
	},
});
