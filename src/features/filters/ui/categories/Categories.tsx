import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { setCategoryId } from '../../../../app/redux/slices/filterSlice';
import styles from './_categories.module.scss';

type TCategories = {
	name: string;
	id: number;
};

const categories: TCategories[] = [
	{ name: 'Все', id: 0 },
	{ name: 'Мясные', id: 1 },
	{ name: 'Вегетарианская', id: 2 },
	{ name: 'Гриль', id: 3 },
	{ name: 'Острые', id: 4 },
	{ name: 'Закрытые', id: 5 },
];
const Categories = () => {
	const dispatch = useDispatch();
	const [searchParams, setSearchParams] = useSearchParams();

	const filter =
		searchParams.get('currentCategory') === null
			? null
			: Number(searchParams.get('currentCategory'));

	return (
		<div className={styles['categories']}>
			<ul>
				{categories.map((elem) => {
					return (
						<li
							key={elem.id}
							onClick={() => {
								dispatch(setCategoryId(elem.id));
								setSearchParams((prev) => {
									elem.id !== 0
										? prev.set('currentCategory', String(elem.id))
										: prev.delete('currentCategory');
									return prev;
								});
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
