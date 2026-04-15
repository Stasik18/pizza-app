import { use, useState, useRef, useEffect, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import QueryString from 'qs';

import '../../../app/styles/app.scss';

import PizzaCard from '../../../entities/pizza/PizzaCard';
import Cotegories from '../../../features/filters/ui/categories/Categories';
import Sort from '../../../features/filters/ui/sort/Sort';
import Pagination from '../../../features/pagination/Pagination';
import { sortCategory } from '../../../features/filters/ui/sort/Sort';
import { setQueryParams } from '../../../app/redux/slices/filterSlice';
import LoadingFetch from '../../../shared/api/LoadingFetch';
import { fetchPizza } from '../../../app/redux/slices/pizzasSlice';

const Home = () => {
	const searchText = useSelector((state) => state.searchSlice.searchText);
	const { items, status } = useSelector((state) => state.pizzasSlice);
	const dispatch = useDispatch();

	const [sortOrder, setSortOrder] = useState('desc'); // допилить после redux

	const [searchParams, setSearchParams] = useSearchParams();

	const typeFilter =
		searchParams.get('typeFilter') === null ? 'rating' : searchParams.get('typeFilter');
	const currentPage =
		searchParams.get('currentPage') === null ? 1 : searchParams.get('currentPage');
	const currentCategory =
		searchParams.get('currentCategory') === null ? 0 : searchParams.get('currentCategory');

	useEffect(() => {
		const params = {
			typeFilter,
			currentPage,
			searchText,
		};
		console.log(typeof currentCategory);
		Number(currentCategory) !== 0 ? (params.currentCategory = currentCategory) : params;

		dispatch(fetchPizza(params));
	}, [currentPage, typeFilter, currentCategory, searchText]);

	return (
		<div className="content">
			<div className="container">
				<div className="content__top">
					<Cotegories />
					<Sort />
				</div>
				<h2 className="content__title">Все пиццы</h2>
				<div className="content__items">
					{status === 'loading' ? (
						<LoadingFetch />
					) : (
						items.map((card) => {
							console.log(card);
							return <PizzaCard {...card} key={card.id} />;
						})
					)}
				</div>

				<Pagination totalPage={3} />
			</div>
		</div>
	);
};

export default Home;
