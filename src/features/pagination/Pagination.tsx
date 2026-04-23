import React from 'react';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

import { setCurrentPage } from '../../app/redux/slices/filterSlice';
import BPagination from '../../shared/ui/Button/BPagination/BPagination';
import styles from './pagination.module.scss';

interface PaginationProps {
	totalPage: number;
}

const Pagination: React.FC<PaginationProps> = ({ totalPage }) => {
	const [searchParams, setSearchParams] = useSearchParams();

	const currentPage = Number(searchParams.get('currentPage') ?? 1);
	const dispatch = useDispatch();
	const prevPage = () => {
		if (currentPage >= 2) {
			dispatch(setCurrentPage(currentPage - 1));
			setSearchParams((prev) => {
				prev.set('currentPage', String(currentPage - 1));
				return prev;
			});
		}
	};

	const prevNext = () => {
		if (currentPage < totalPage) {
			dispatch(setCurrentPage(currentPage + 1));
			setSearchParams((prev) => {
				prev.set('currentPage', String(currentPage + 1));
				return prev;
			});
		}
	};

	const newFunc = (page: number, totalPage: number) => {
		let forJob = [];
		let result = [];

		if (totalPage < 5) {
			for (let i = 0; i < totalPage; i++) {
				result.push(i + 1);
			}
			return result;
		}

		if (page - 1 <= 2) {
			forJob.push(1, 2, 3, 4, 5);
		} else if (page - 1 > 2 && totalPage - page > 2) {
			forJob.push(1, page - 1, page, page + 1, totalPage);
		} else if (totalPage - page <= 2) {
			forJob.push(1, totalPage - 3, totalPage - 2, totalPage - 1, totalPage);
		}

		for (let i = 0; i < forJob.length; i++) {
			if (i !== forJob.length - 1) {
				if (forJob[i + 1] - forJob[i] > 1) {
					result.push(forJob[i]);

					result.push('...');
				} else {
					result.push(forJob[i]);
				}
			} else {
				result.push(forJob[i]);
			}
		}

		return result;
	};

	return (
		<div className={styles.pagination}>
			{totalPage > 1 && (
				<svg
					onClick={() => prevPage()}
					className={`${styles.pagination__arrow} ${styles['pagination__arrow--previous']} ${currentPage === 1 ? styles['pagination__arrow--disable'] : ''}`}
					width="800px"
					height="800px"
					viewBox="-3 0 32 32"
					version="1.1"
					xmlns="http://www.w3.org/2000/svg"
					xmlnsXlink="http://www.w3.org/1999/xlink"
				>
					<g id="icomoon-ignore"></g>
					<path d="M13.11 29.113c7.243 0 13.113-5.871 13.113-13.113s-5.87-13.113-13.113-13.113c-7.242 0-13.113 5.871-13.113 13.113s5.871 13.113 13.113 13.113zM13.11 3.936c6.652 0 12.064 5.412 12.064 12.064s-5.412 12.064-12.064 12.064c-6.653 0-12.064-5.412-12.064-12.064s5.411-12.064 12.064-12.064z"></path>
					<path d="M13.906 21.637l0.742 0.742 6.378-6.379-6.378-6.379-0.742 0.742 5.112 5.112h-12.727v1.049h12.727z"></path>
				</svg>
			)}
			{newFunc(currentPage, totalPage).map((elem, i) => {
				return typeof elem === 'string' ? (
					<span className={styles.dots} key={i}>
						{elem}
					</span>
				) : (
					<BPagination key={i} title={elem} />
				);
			})}

			{totalPage > 1 && (
				<svg
					onClick={() => prevNext()}
					className={`${styles.pagination__arrow}  ${styles['pagination__arrow--next']} ${currentPage === totalPage ? styles['pagination__arrow--disable'] : ''} `}
					width="800px"
					height="800px"
					viewBox="-3 0 32 32"
					version="1.1"
					xmlns="http://www.w3.org/2000/svg"
					xmlnsXlink="http://www.w3.org/1999/xlink"
				>
					<g id="icomoon-ignore"></g>
					<path d="M13.11 29.113c7.243 0 13.113-5.871 13.113-13.113s-5.87-13.113-13.113-13.113c-7.242 0-13.113 5.871-13.113 13.113s5.871 13.113 13.113 13.113zM13.11 3.936c6.652 0 12.064 5.412 12.064 12.064s-5.412 12.064-12.064 12.064c-6.653 0-12.064-5.412-12.064-12.064s5.411-12.064 12.064-12.064z"></path>
					<path d="M13.906 21.637l0.742 0.742 6.378-6.379-6.378-6.379-0.742 0.742 5.112 5.112h-12.727v1.049h12.727z"></path>
				</svg>
			)}
		</div>
	);
};

export default Pagination;
