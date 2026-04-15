import { useParams, useNavigate } from 'react-router-dom';

import styles from './currentPizza.module.scss';
import axios from 'axios';
import { useState, useEffect } from 'react';

const CurrentPizza = () => {
	const { id } = useParams();
	const [currentPizza, setCurrentPizza] = useState(null);

	const navigate = useNavigate();
	const [error, setError] = useState(false);

	const pizzaType = ['тонкое', 'стандартное'];
	const [activeType, setActiveType] = useState(0);
	const [activeSize, setActiveSize] = useState(0);

	useEffect(() => {
		const fetchPizza = async () => {
			try {
				const response = await axios.get('https://6989c620c04d974bc6a05c40.mockapi.io/items/' + id);
				setCurrentPizza(response.data);
			} catch (error) {
				alert('Такой Пиццы нет');
				setError(true);
			}
		};

		fetchPizza();
	}, [id]);

	useEffect(() => {
		if (error) {
			navigate('/');
		}
	}, [error]);

	if (!currentPizza) {
		return 'Загрузка';
	}
	return (
		<div className={styles.currentPizza}>
			<section className={styles['currentPizza__left']}>
				<h2 className={styles['currentPizza__title']}>{currentPizza.title}</h2>
				<img className={styles['currentPizza__img']} src={currentPizza.imageUrl} alt="Pizza" />
			</section>
			<section className={styles['currentPizza__right']}>
				<p className={styles['currentPizza__info']}>Как бы текст про пиццу с бека</p>
				<ul>
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
				<ul>
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
								{elem}см.
							</li>
						);
					})}
				</ul>
			</section>
		</div>
	);
};

export default CurrentPizza;
