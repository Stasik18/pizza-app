import styles from './_categories.module.scss';
import { useState } from 'react';
const Categories = ({ ...props }) => {
	const [categories, setCategories] = useState([
		{ name: 'Все', id: 0 },
		{ name: 'Мясные', id: 1 },
		{ name: 'Вегетарианская', id: 2 },
		{ name: 'Гриль', id: 3 },
		{ name: 'Острые', id: 4 },
		{ name: 'Закрытые', id: 5 },
	]);

	return (
		<div className={styles['categories']}>
			<ul>
				{categories.map((elem, index) => {
					return (
						<li
							key={elem.id}
							onClick={() => {
								props.changeCategoriesSorted(elem.id);
							}}
							className={`
							${elem.id === props.value ? styles.active : ''}
							`}
						>
							{elem.name}
						</li>
					);
				})}
			</ul>
		</div>
	);
};

export default Categories;
