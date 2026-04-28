import { Link } from 'react-router-dom';
import emptyCart from '../../../shared/assets/img/empty-cart.png';

import styles from './_cart.module.scss';
const CartEmpty = () => {
	return (
		<>
			<div className={`${styles.cart} ${styles['cart--empty']}`}>
				<h2>Корзина пустая 😕</h2>
				<li></li>
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
