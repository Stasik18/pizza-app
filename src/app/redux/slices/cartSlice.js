import { createSlice } from '@reduxjs/toolkit';
import { act } from 'react';

const initialState = {
	pizzasInCart: [],
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
		},
		removePizza(state, action) {
			state.pizzasInCart = state.pizzasInCart.filter((e) => e.uniqueCode !== action.payload);
		},
		clearCart(state) {
			state.pizzasInCart = [];
		},
		changePizzaCount(state, action) {
			const pizzaCount = state.pizzasInCart.find((e) => e.uniqueCode === action.payload.uniqueCode);
			if (pizzaCount.count > 0) {
				action.payload.whatToDo === 'plus' ? pizzaCount.count++ : pizzaCount.count--;
			}

			if (pizzaCount.count < 1) {
				state.pizzasInCart = state.pizzasInCart.filter(
					(e) => e.uniqueCode !== action.payload.uniqueCode,
				);
			}
		},
	},
});

export const { addCarts, removePizza, clearCart, changePizzaCount } = cartSlice.actions;

export default cartSlice.reducer;
