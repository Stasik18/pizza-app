import { useSearchParams } from 'react-router-dom';
import { useAppDispatch } from '../../../../app/redux/hooks';
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
	const dispatch = useAppDispatch();
	const [searchParams, setSearchParams] = useSearchParams();

	const filter =
		searchParams.get('currentCategory') === null ? 0 : Number(searchParams.get('currentCategory'));

	return (
		<div className={styles['categories']}>
			<ul>
				{categories.map((elem) => {
					return (
						<li
							key={elem.id}
							onClick={() => {
								// console.log(elem.id, filter); // разобрать
								dispatch(setCategoryId(elem.id));
								setSearchParams((prev) => {
									if (elem.id !== 0) {
										prev.set('currentCategory', String(elem.id));
									} else {
										prev.delete('currentCategory');
									}

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
