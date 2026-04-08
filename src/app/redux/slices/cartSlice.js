import { createSlice } from '@reduxjs/toolkit';
import { act } from 'react';

const initialState = {
	pizzasInCart: [],
	totalPrice: 0,
};

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addCarts(state, action) {
			const findItem = state.pizzasInCart.find((e) => e.uniqueCode === action.payload.uniqueCode);

			if (findItem) {
				findItem.count++;
			} else {
				state.pizzasInCart.push({ ...action.payload, count: 1 });
			}

			// state.totalPrice = state.pizzasInCart.reduce((acc, e) => (acc += e.price * e.count), 0);
		},
		removePizza(state, action) {
			let priceRemoveItem =
				state.pizzasInCart.find((e) => e.uniqueCode === action.payload).price *
				state.pizzasInCart.find((e) => e.uniqueCode === action.payload).count;
			state.totalPrice = state.totalPrice - priceRemoveItem;
			state.pizzasInCart = state.pizzasInCart.filter((e) => e.uniqueCode !== action.payload);
		},
		clearCart(state) {
			state.pizzasInCart = [];
		},
		changePizzaCount(state, action) {
			// state.totalPrice = state.pizzasInCart.reduce((acc, e) => (acc += e.price * e.count), 0);

			if (state.pizzasInCart.find((e) => e.uniqueCode === action.payload.uniqueCode).count > 0) {
				action.payload.whatToDo === 'plus'
					? state.pizzasInCart.find((e) => e.uniqueCode === action.payload.uniqueCode).count++
					: state.pizzasInCart.find((e) => e.uniqueCode === action.payload.uniqueCode).count--;
			}

			if (state.pizzasInCart.find((e) => e.uniqueCode === action.payload.uniqueCode).count < 1) {
				state.pizzasInCart = state.pizzasInCart.filter(
					(e) => e.uniqueCode !== action.payload.uniqueCode,
				);
			}
		},
	},
});

export const { addCarts, removePizza, clearCart, changePizzaCount } = cartSlice.actions;

export default cartSlice.reducer;
