import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCategoryId } from '../../../../app/redux/slices/filterSlice';
import styles from './_categories.module.scss';

const Categories = () => {
	const dispatch = useDispatch();
	const filter = useSelector((state) => state.filterSlice.currentCategory);

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
								dispatch(setCategoryId(elem.id));
							}}
							className={`
							${elem.id === filter ? styles.active : ''}
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
