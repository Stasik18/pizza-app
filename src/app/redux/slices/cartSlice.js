import { createSlice } from '@reduxjs/toolkit';
import { act } from 'react';

const initialState = {
	pizzasInCart: [],
	totalPrice: 0,
	totalCount: 0,
};

const calcTotals = (state) => {
	const result = state.pizzasInCart.reduce(
		(acc, elem) => {
			acc.totalCount += elem.count;
			acc.totalPrice += elem.count * elem.price;
			return acc;
		},
		{ totalPrice: 0, totalCount: 0 },
	);

	state.totalCount = result.totalCount;
	state.totalPrice = result.totalPrice;
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
			calcTotals(state);
		},
		removePizza(state, action) {
			state.pizzasInCart = state.pizzasInCart.filter((e) => e.uniqueCode !== action.payload);
			calcTotals(state);
		},
		clearCart(state) {
			state.pizzasInCart = [];
			state.totalPrice = 0;
			state.totalCount = 0;
		},
		changePizzaCount(state, action) {
			const pizzaItem = state.pizzasInCart.find((e) => e.uniqueCode === action.payload.uniqueCode);
			if (pizzaItem.count > 0) {
				action.payload.whatToDo === 'plus' ? pizzaItem.count++ : pizzaItem.count--;
				calcTotals(state);
			}

			if (pizzaItem.count < 1) {
				state.pizzasInCart = state.pizzasInCart.filter(
					(e) => e.uniqueCode !== action.payload.uniqueCode,
				);
				calcTotals(state);
			}
		},
	},
});

export const selectCart = (state) => state.cartSlice;

export const { addCarts, removePizza, clearCart, changePizzaCount } = cartSlice.actions;

export default cartSlice.reducer;
