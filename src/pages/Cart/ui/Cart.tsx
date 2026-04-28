import { useAppDispatch, useAppSelector } from '../../../app/redux/hooks';
import { clearCart, selectCart } from '../../../app/redux/slices/cartSlice';

import { Link } from 'react-router-dom';
import CartItem from './CartItem';

import styles from './_cart.module.scss';
import CartEmpty from './CartEmpty';

const Cart = () => {
	const dispatch = useAppDispatch();
	const { pizzasInCart, totalPrice, totalCount } = useAppSelector(selectCart);

	return (
		<div className={styles['content']}>
			<div className={`container ${styles['container--cart']}`}>
				{pizzasInCart.length === 0 ? (
					<CartEmpty />
				) : (
					<div className={styles.cart}>
						<div className={styles['cart__header']}>
							<h2 className="cart__header-title">
								<span>Корзина</span>
							</h2>
							<div className="cart__header-clear">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth={1.5}
									stroke="currentColor"
									className="size-6"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
									/>
								</svg>
								<button
									onClick={() => {
										dispatch(clearCart());
									}}
								>
									Очистить корзину
								</button>
							</div>
						</div>

						{pizzasInCart.map((elem) => {
							return <CartItem pizzaItemInCart={elem} key={elem.id} />;
						})}

						<div className={styles['cart__total']}>
							<div className="cart__total-count">
								<p>Всего пицц:</p>
								<span>{totalCount} шт.</span>
							</div>
							<div className="cart__total-price">
								<p>Сумма заказа:</p>
								<span>{totalPrice} ₽</span>
							</div>
						</div>
						<div className={styles['cart__footer']}>
							<Link to="/" className={styles['cart__footer-back']}>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth="1.5"
									stroke="currentColor"
									className="size-6"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="m11.25 9-3 3m0 0 3 3m-3-3h7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
									/>
								</svg>
								<span>Вернуться назад</span>
							</Link>
							<button className={styles['cart__footer-pay']}>оплатить сейчас</button>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default Cart;
