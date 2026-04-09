import { configureStore } from '@reduxjs/toolkit';
import filterSlice from '../../../app/redux/slices/filterSlice';
import searchSlice from '../../../app/redux/slices/searchSlice';
import cartSlice from '../../../app/redux/slices/cartSlice';
import pizzasSlice from '../../../app/redux/slices/pizzasSlice';
export const store = configureStore({
	reducer: {
		filterSlice,
		searchSlice,
		cartSlice,
		pizzasSlice,
	},
});
