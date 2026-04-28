import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PizzaInCart } from '../../../entities/pizza/types/pizzaType';
import { RootState } from '../store/store';

interface CartState {
	pizzasInCart: PizzaInCart[];
	totalPrice: number;
	totalCount: number;
}

interface changePizzaCountPayload {
	whatToDo: 'minus' | 'plus';
	uniqueCode: string;
}

const initialState: CartState = {
	pizzasInCart: [],
	totalPrice: 0,
	totalCount: 0,
};

const calcTotals = (items: PizzaInCart[]): Pick<CartState, 'totalPrice' | 'totalCount'> => {
	const result = items.reduce(
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

	const totalCount = result.totalCount;
	const totalPrice = result.totalPrice;

	return { totalPrice, totalCount };
};

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addCart(state, action: PayloadAction<PizzaInCart>) {
			const findItem = state.pizzasInCart.find((e) => e.uniqueCode === action.payload.uniqueCode);

			if (findItem?.count) {
				findItem.count++;
			} else {
				state.pizzasInCart.push({ ...action.payload, count: 1 });
			}
			const totals = calcTotals(state.pizzasInCart);
			state.totalPrice = totals.totalPrice;
			state.totalCount = totals.totalCount;
		},
		removePizza(state, action: PayloadAction<string>) {
			state.pizzasInCart = state.pizzasInCart.filter((e) => e.uniqueCode !== action.payload);
			const totals = calcTotals(state.pizzasInCart);
			state.totalPrice = totals.totalPrice;
			state.totalCount = totals.totalCount;
		},
		clearCart(state) {
			state.pizzasInCart = [];
			state.totalPrice = 0;
			state.totalCount = 0;
		},
		changePizzaCount(state, action: PayloadAction<changePizzaCountPayload>) {
			const pizzaItem = state.pizzasInCart.find((e) => e.uniqueCode === action.payload.uniqueCode);
			if (pizzaItem?.count) {
				if (action.payload.whatToDo === 'plus') {
					pizzaItem.count++;
				} else {
					pizzaItem.count--;
				}
				const totals = calcTotals(state.pizzasInCart);
				state.totalPrice = totals.totalPrice;
				state.totalCount = totals.totalCount;
			}

			if (pizzaItem?.count === 0) {
				state.pizzasInCart = state.pizzasInCart.filter(
					(e) => e.uniqueCode !== action.payload.uniqueCode,
				);
				const totals = calcTotals(state.pizzasInCart);
				state.totalPrice = totals.totalPrice;
				state.totalCount = totals.totalCount;
			}
		},
	},
});

export const selectCart = (state: RootState) => state.cartSlice;

export const { addCart, removePizza, clearCart, changePizzaCount } = cartSlice.actions;

export default cartSlice.reducer;
