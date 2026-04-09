import { useState } from 'react';
import { addCarts } from '../../app/redux/slices/cartSlice';
import { useDispatch, useSelector } from 'react-redux';

import styles from './_pizza-block.module.scss';

const findPizzaInCart = (itemsInCart, uniqueCode) => {
	return itemsInCart.find((e) => e.uniqueCode === uniqueCode);
};

const PizzaCard = ({ id, imageUrl, title, types, sizes, price, category, rating }) => {
	const itemsInCart = useSelector((state) => state.cartSlice.pizzasInCart);
	const dispatch = useDispatch();

	const pizzaType = ['тонкое', 'стандартное'];
	const [activeType, setActiveType] = useState(0);
	const [activeSize, setActiveSize] = useState(0);
	const uniqueCode = `${pizzaType[activeType]}, ${sizes[activeSize]}, ${id}`;

	const currentPizzas = findPizzaInCart(itemsInCart, uniqueCode);

	const toCart = () => {
		dispatch(
			addCarts({
				imageUrl: imageUrl,
				title: title,
				type: pizzaType[activeType],
				size: sizes[activeSize],
				price: price,

				id: id,
				uniqueCode: `${pizzaType[activeType]}, ${sizes[activeSize]}, ${id}`,
			}),
		);
	};

	return (
		<div className={styles['pizza-block']}>
			<img className={styles['pizza-block__image']} src={imageUrl} alt="Pizza" />
			<h4 className={styles['pizza-block__title']}>{title}</h4>
			<div className={styles['pizza-block__selector']}>
				<ul>
					{types.map((elem, index) => {
						return (
							<li
								onClick={() => setActiveType(index)}
								className={`
								${activeType === index ? styles.active : ''}
								`}
								key={elem}
							>
								{pizzaType[index]}
							</li>
						);
					})}
				</ul>
				<ul>
					{sizes.map((elem, index) => {
						return (
							<li
								onClick={() => {
									setActiveSize(index);
								}}
								className={`
								${activeSize === index ? styles.active : ''}
								`}
								key={elem}
							>
								{elem}см.
							</li>
						);
					})}
				</ul>
			</div>
			<div className={styles['pizza-block__bottom']}>
				<div className={styles['pizza-block__price']}>от {price} ₽</div>
				<div
					onClick={() => {
						toCart();
					}}
					className={`${styles.button} ${styles['button--outline']} ${styles['button--add']} `}
				>
					<svg
						width="12"
						height="12"
						viewBox="0 0 12 12"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
							fill="white"
						/>
					</svg>
					<span>Добавить</span>
					{currentPizzas && <i>{currentPizzas.count}</i>}
				</div>
			</div>
		</div>
	);
};
export default PizzaCard;
