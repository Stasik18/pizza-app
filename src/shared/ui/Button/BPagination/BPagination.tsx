import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch } from '../../../../app/redux/hooks';

import { setCurrentPage } from '../../../../app/redux/slices/filterSlice';
import styles from './bpagination.module.scss';

interface BPaginationProps {
	title: number;
}

const BPagination: React.FC<BPaginationProps> = ({ title }) => {
	const [searchParams, setSearchParams] = useSearchParams();

	const currentPage = Number(searchParams.get('currentPage') ?? 1);

	const dispatch = useAppDispatch();

	return (
		<>
			<button
				className={`${styles['pagination__button']} ${currentPage === title ? styles['pagination__button--active'] : ''}`}
				onClick={() => {
					setSearchParams((prev) => {
						prev.set('currentPage', String(title));
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
