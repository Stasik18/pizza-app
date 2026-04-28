import { configureStore } from '@reduxjs/toolkit';
import cartSlice from '../slices/cartSlice';
import filterSlice from '../slices/filterSlice';
import pizzasSlice from '../slices/pizzasSlice';
import searchSlice from '../slices/searchSlice';

export const store = configureStore({
	reducer: {
		filterSlice,
		searchSlice,
		cartSlice,
		pizzasSlice,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; // не могу понять, а вот зачем, от чего это меня спасает
