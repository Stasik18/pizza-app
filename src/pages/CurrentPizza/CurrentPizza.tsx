import { useParams, useNavigate } from 'react-router-dom';

import styles from './currentPizza.module.scss';
import axios from 'axios';
import { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCarts, selectCart } from '../../app/redux/slices/cartSlice';

interface PizzaResponse {
	id: number;
	imageUrl: string;
	title: string;
	types: number[];
	sizes: number[];
	price: number;
	category: number;
	rating: number;
}

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

const findCurrentPizza = (pizzas: PizzaInCart[], uniqueCode: string) => {
	if (pizzas.length === 0) {
		return false;
	}
	return pizzas.find((e) => e.uniqueCode === uniqueCode);
};

const pizzaType: string[] = ['тонкое', 'стандартное'];

const CurrentPizza = () => {
	const { pizzasInCart } = useSelector(selectCart);
	const { id } = useParams();
	const [currentPizza, setCurrentPizza] = useState<PizzaResponse>();

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [error, setError] = useState(false);

	const [activeType, setActiveType] = useState<number>(0);
	const [activeSize, setActiveSize] = useState<number>(0);

	useEffect(() => {
		const fetchPizza = async () => {
			try {
				const response = await axios.get('https://6989c620c04d974bc6a05c40.mockapi.io/items/' + id);
				setCurrentPizza(response.data);
			} catch (error) {
				setError(true);
			}
		};

		fetchPizza();
	}, [id]);

	useEffect(() => {
		if (error) {
			alert('Такой Пиццы нет');
			navigate('/');
		}
	}, [error]);

	if (!currentPizza) {
		return 'Загрузка';
	}

	const memorUniqueCode = useMemo(() => {
		const uniqueCode: string = `${pizzaType[activeType]}, ${currentPizza.sizes[activeSize]}, ${currentPizza.id}`;

		return uniqueCode;
	}, [currentPizza.id, activeSize, activeType]);

	const memorCurrentPizzaCount = useMemo(() => {
		const currentPizzaCount = findCurrentPizza(pizzasInCart, memorUniqueCode);

		return currentPizzaCount;
	}, [memorUniqueCode, pizzasInCart]);

	const toCart = () => {
		dispatch(
			addCarts({
				imageUrl: currentPizza.imageUrl,
				title: currentPizza.title,
				type: pizzaType[activeType],
				size: currentPizza.sizes[activeSize],
				price: currentPizza.price,

				id: currentPizza.id,
				uniqueCode: memorUniqueCode,
			}),
		);
	};

	return (
		<div className={styles['currentPizza']}>
			<div className={styles['currentPizza__wrapper']}>
				<section className={styles['currentPizza__left']}>
					<img className={styles['currentPizza__img']} src={currentPizza.imageUrl} alt="Pizza" />
				</section>
				<section className={styles['currentPizza__right']}>
					<h2 className={styles['currentPizza__title']}>{currentPizza.title}</h2>
					<p className={styles['currentPizza__info']}>Как бы текст про пиццу с бека</p>
					<ul className={styles['currentPizza__type']}>
						{currentPizza.types.map((elem, index) => {
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
					<ul className={styles['currentPizza__size']}>
						{currentPizza.sizes.map((elem, index) => {
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
									{elem}см
								</li>
							);
						})}
					</ul>
					<span className={styles['currentPizza__price']}>Стоимость - {currentPizza.price} ₽</span>
					<button onClick={() => toCart()} className={styles['currentPizza__btn']}>
						Добавить {memorCurrentPizzaCount && <i>{memorCurrentPizzaCount.count}</i>}
					</button>
				</section>
			</div>
		</div>
	);
};

export default CurrentPizza;
