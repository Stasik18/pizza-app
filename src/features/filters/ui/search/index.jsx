import { useContext } from 'react';
import { SearchValue } from '../../../../app/App';
import styles from './search.module.scss';

const Search = () => {
	const { searchValue, setSearchValue } = useContext(SearchValue);

	return (
		<div className={styles.root}>
			<svg
				className={styles.icon}
				fill="#000000"
				width="800px"
				height="800px"
				viewBox="0 0 16 16"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M12.027 9.92L16 13.95 14 16l-4.075-3.976A6.465 6.465 0 0 1 6.5 13C2.91 13 0 10.083 0 6.5 0 2.91 2.917 0 6.5 0 10.09 0 13 2.917 13 6.5a6.463 6.463 0 0 1-.973 3.42zM1.997 6.452c0 2.48 2.014 4.5 4.5 4.5 2.48 0 4.5-2.015 4.5-4.5 0-2.48-2.015-4.5-4.5-4.5-2.48 0-4.5 2.014-4.5 4.5z"
					fillRule="evenodd"
				/>
			</svg>
			<input
				value={searchValue}
				onChange={(e) => {
					setSearchValue(e.target.value);
				}}
				className={styles.input}
				placeholder="Поиск пиццы"
			/>

			{searchValue && (
				<svg
					onClick={() => setSearchValue('')}
					className={styles.clear}
					fill="#000000"
					width="800px"
					height="800px"
					viewBox="0 0 16 16"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M0 14.545L1.455 16 8 9.455 14.545 16 16 14.545 9.455 8 16 1.455 14.545 0 8 6.545 1.455 0 0 1.455 6.545 8z"
						fill-rule="evenodd"
					/>
				</svg>
			)}
		</div>
	);
};

export default Search;
