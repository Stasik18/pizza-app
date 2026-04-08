import React from 'react';
import { Link } from 'react-router-dom';
import emptyCart from '../../../shared/assets/img/empty-cart.png';

import styles from './_cart.module.scss';
const CartEmpty = () => {
	console.log('EXPORTED KEYS:', Object.keys(styles));
	return (
		<>
			<div className={`${styles.cart} ${styles['cart--empty']}`}>
				<h2>
					Корзина пустая <icon>😕</icon>
				</h2>
				<p>
					Вероятней всего, вы не заказывали ещё пиццу.
					<br />
					Для того, чтобы заказать пиццу, перейди на главную страницу.
				</p>
				<img src={emptyCart} />
				<Link to="/">
					<span className={`${styles['button--black']}`}>Вернуться назад</span>
				</Link>
			</div>
		</>
	);
};

export default CartEmpty;
