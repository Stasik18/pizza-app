import { useAppDispatch } from '../../../app/redux/hooks';
import { changePizzaCount, removePizza } from '../../../app/redux/slices/cartSlice';
import { PizzaInCart } from '../../../entities/pizza/types/pizzaType';
import styles from './_cart.module.scss';

interface CartItemProp {
	pizzaItemInCart: PizzaInCart;
}

const CartItem: React.FC<CartItemProp> = ({ pizzaItemInCart }) => {
	const dispatch = useAppDispatch();

	return (
		<div className={styles['cart__item']}>
			<img className={styles['cart__item-img']} src={pizzaItemInCart.imageUrl} />
			<div className={styles['cart__item-title']}>
				<h3>{pizzaItemInCart.title}</h3>
				<span>
					{pizzaItemInCart.type}, {pizzaItemInCart.size} см.
				</span>
			</div>
			<div className={styles['cart__item-counter']}>
				<button
					onClick={() =>
						dispatch(
							changePizzaCount({ whatToDo: 'minus', uniqueCode: pizzaItemInCart.uniqueCode }),
						)
					}
				>
					-
				</button>
				<span>{pizzaItemInCart.count}</span>
				<button
					onClick={() =>
						dispatch(changePizzaCount({ whatToDo: 'plus', uniqueCode: pizzaItemInCart.uniqueCode }))
					}
				>
					+
				</button>
			</div>
			<div className={styles['cart__item-price']}>
				{pizzaItemInCart.count ? pizzaItemInCart.price * pizzaItemInCart.count : 0} ₽
			</div>
			<button
				onClick={() => dispatch(removePizza(pizzaItemInCart.uniqueCode))}
				className={styles['cart__item-delete']}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth={1.5}
					stroke="currentColor"
					className="size-6"
				>
					<path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
				</svg>
			</button>
		</div>
	);
};

export default CartItem;
