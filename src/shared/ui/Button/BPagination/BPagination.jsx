import React from 'react';
import styles from './bpagination.module.scss';
const BPagination = ({ page, setPage, title }) => {
	return (
		<>
			<button
				className={`${styles['pagination__button']} ${page === title ? styles['pagination__button--active'] : ''}`}
				onClick={() => setPage(title)}
			>
				{title}
			</button>
		</>
	);
};

export default BPagination;
