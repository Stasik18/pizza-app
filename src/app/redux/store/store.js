import { configureStore } from '@reduxjs/toolkit';
import filterSlice from '../../../app/redux/slices/filterSlice';
export const store = configureStore({
	reducer: {
		filterSlice,
	},
});
