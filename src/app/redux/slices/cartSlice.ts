import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store/store';

interface PizzaInCart {
	imageUrl: string;
	title: string;
	type: string;
	size: number;
	price: number;
	id: number;
	uniqueCode: string;
	count?: number;
}

interface initialStateInt<T> {
	pizzasInCart: T[];
	totalPrice: number;
	totalCount: number;
}

interface changePizzaCountPayload {
	whatToDo: string;
	uniqueCode: string;
}
type findPizza = Record<string, PizzaInCart>;

const initialState: initialStateInt<PizzaInCart> = {
	pizzasInCart: [],
	totalPrice: 0,
	totalCount: 0,
};

const calcTotals = (state: initialStateInt<PizzaInCart>) => {
	const result = state.pizzasInCart.reduce(
		(acc, elem) => {
			if (elem.count) {
				acc.totalCount += elem.count;
				acc.totalPrice += elem.count * elem.price;
				return acc;
			}
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
		addCarts(state, action: PayloadAction<PizzaInCart>) {
			const findItem = state.pizzasInCart.find((e) => e.uniqueCode === action.payload.uniqueCode);

			if (findItem?.count) {
				if (findItem) {
					findItem.count++;
				}
			} else {
				state.pizzasInCart.push({ ...action.payload, count: 1 });
			}

			calcTotals(state);
		},
		removePizza(state, action: PayloadAction<string>) {
			state.pizzasInCart = state.pizzasInCart.filter((e) => e.uniqueCode !== action.payload);
			calcTotals(state);
		},
		clearCart(state) {
			state.pizzasInCart = [];
			state.totalPrice = 0;
			state.totalCount = 0;
		},
		changePizzaCount(state, action: PayloadAction<changePizzaCountPayload>) {
			console.log(action.payload);
			const pizzaItem = state.pizzasInCart.find((e) => e.uniqueCode === action.payload.uniqueCode);
			if (pizzaItem?.count) {
				if (pizzaItem.count > 0) {
					action.payload.whatToDo === 'plus' ? pizzaItem.count++ : pizzaItem.count--;
					calcTotals(state);
				}
			}

			if (pizzaItem?.count === 0) {
				state.pizzasInCart = state.pizzasInCart.filter(
					(e) => e.uniqueCode !== action.payload.uniqueCode,
				);
				calcTotals(state);
			}
		},
	},
});

export const selectCart = (state: RootState) => state.cartSlice;

export const { addCarts, removePizza, clearCart, changePizzaCount } = cartSlice.actions;

export default cartSlice.reducer;
