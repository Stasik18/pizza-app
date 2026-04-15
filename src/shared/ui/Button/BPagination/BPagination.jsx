import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

import { setCurrentPage } from '../../../../app/redux/slices/filterSlice';
import styles from './bpagination.module.scss';
const BPagination = ({ title }) => {
	const currentPage = useSelector((state) => state.filterSlice.currentPage);
	const dispatch = useDispatch();
	const [searchParams, setSearchParams] = useSearchParams();

	return (
		<>
			<button
				className={`${styles['pagination__button']} ${currentPage === title ? styles['pagination__button--active'] : ''}`}
				onClick={() => {
					setSearchParams((prev) => {
						prev.set('currentPage', title);
						return prev;
					});
					dispatch(setCurrentPage(title));
				}}
			>
				{title}
			</button>
		</>
	);
};

export default BPagination;
