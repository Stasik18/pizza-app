import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTypeFilter } from '../../../../app/redux/slices/filterSlice';

import styles from './_sort.module.scss';

const Sort = () => {
	const typeFilter = useSelector((state) => state.filterSlice.typeFilter);
	const dispatch = useDispatch();
	console.log(typeFilter);
	const [sortElem, setSortElem] = useState([
		{ title: 'популярности', id: 0, sortParams: 'rating' },
		{ title: 'цене', id: 1, sortParams: 'price' },
		{ title: 'алфавиту', id: 2, sortParams: 'title' },
	]);
	const [open, setOpen] = useState(false);
	const menuRef = useRef(false);

	useEffect(() => {
		function handlerClick(e) {
			if (!menuRef.current.contains(e.target)) setOpen(false);
		}

		function handlerEsc(e) {
			if (e.key === 'Escape') setOpen(false);
		}

		document.addEventListener('click', handlerClick);
		document.addEventListener('keydown', handlerEsc);

		return () => {
			document.removeEventListener('click', handlerClick);
			document.removeEventListener('keydown', handlerEsc);
		};
	}, []);

	return (
		<div ref={menuRef} className={styles.sort}>
			<div onClick={() => setOpen(!open)} className={styles['sort__label']}>
				<svg
					className={open ? styles.rotate : ''}
					width="10"
					height="6"
					viewBox="0 0 10 6"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
						fill="#2C2C2C"
					/>
				</svg>
				<b>Сортировка по:</b>
				<span>
					{sortElem.map((elem) => {
						return elem.sortParams === typeFilter.type ? elem.title : '';
					})}
				</span>
			</div>
			<div
				className={`
			${styles.sort__popup}
			${!open ? '' : styles.active}
			`}
			>
				<ul>
					{sortElem.map((elem) => {
						return (
							<li
								onClick={() => {
									setOpen(!open);
									dispatch(setTypeFilter({ name: elem.title, type: elem.sortParams }));
								}}
								className={`
								${typeFilter.type === elem.sortParams ? styles.active : ''}
								`}
								key={elem.id}
							>
								{elem.title}
							</li>
						);
					})}
				</ul>
			</div>
		</div>
	);
};

export default Sort;
