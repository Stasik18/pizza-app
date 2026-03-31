import { use, useState, useRef, useEffect, useContext } from 'react';
import { useSelector } from 'react-redux';

import '../../../app/styles/app.scss';
import PizzaCard from '../../../entities/pizza/PizzaCard';
import Cotegories from '../../../features/filters/ui/categories/Categories';
import Sort from '../../../features/filters/ui/sort/Sort';
import Pagination from '../../../features/pagination/Pagination';

import { SearchValue } from '../../../app/App';
import axios from 'axios';

const Home = ({ ...props }) => {
	const currentCategory = useSelector((state) => state.filterSlice.categoryId);
	const typeFilter = useSelector((state) => state.filterSlice.typeFilter.type);

	const [pizzas, setPizzas] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [showSkeleton, setShowSkeleton] = useState(false);
	const [sortOrder, setSortOrder] = useState('desc');

	const { searchValue, setSearchValue } = useContext(SearchValue);
	const search = searchValue ? `${searchValue}` : '';
	const [page, setPage] = useState(1);

	useEffect(() => {
		setLoading(true);
		const loadPizza = async () => {
			const url = new URL(
				`https://6989c620c04d974bc6a05c40.mockapi.io/items?&sortBy=rating&order=asc`,
			);
			url.searchParams.set('sortBy', typeFilter);
			url.searchParams.set('search', search);
			url.searchParams.set('page', page);
			url.searchParams.set('limit', 10);
			currentCategory === 0 ? url : url.searchParams.append('category', currentCategory);
			try {
				const response = await axios.get(url);
				const data = await response.data;
				setPizzas(data);
			} catch (e) {
				setError(e);
			} finally {
				setLoading(false);
			}
		};

		loadPizza();
	}, [typeFilter, sortOrder, currentCategory, searchValue, page]);

	useEffect(() => {
		let show;

		if (loading) {
			show = setTimeout(() => {
				setShowSkeleton(true);
			}, 300);
		} else {
			setShowSkeleton(false);
		}

		return () => {
			clearTimeout(show);
		};
	}, [loading]);

	if (showSkeleton) {
		props.setStatus = 'loading';
	} else if (error) {
		props.setStatus = 'error';
	}

	return (
		<div className="content">
			<div className="container">
				<div className="content__top">
					<Cotegories />
					<Sort />
				</div>
				<h2 className="content__title">Все пиццы</h2>
				<div className="content__items">
					{pizzas.map((card) => {
						return <PizzaCard {...card} key={card.id} />;
					})}
				</div>

				<Pagination totalPage={1} page={page} setPage={setPage} />
			</div>
		</div>
	);
};

export default Home;
