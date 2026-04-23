import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

import '../../../app/styles/app.scss';

import PizzaCard from '../../../entities/pizza/PizzaCard';
import Cotegories from '../../../features/filters/ui/categories/Categories';
import Sort from '../../../features/filters/ui/sort/Sort';
import Pagination from '../../../features/pagination/Pagination';

import { fetchPizza } from '../../../app/redux/slices/pizzasSlice';
import { AppDispatch, RootState } from '../../../app/redux/store/store';
import LoadingFetch from '../../../shared/api/LoadingFetch';

const Home = () => {
	const searchText: string = useSelector((state: RootState) => state.searchSlice.searchText);
	const { items, status } = useSelector((state: RootState) => state.pizzasSlice);
	const dispatch = useDispatch<AppDispatch>();

	const [sortOrder, setSortOrder] = useState('desc'); // допилить после redux

	const [searchParams, setSearchParams] = useSearchParams();

	const typeFilter: string = searchParams.get('typeFilter') ?? 'rating';
	const currentPage: number = Number(searchParams.get('currentPage') ?? 1);
	const currentCategory: number = Number(searchParams.get('currentCategory') ?? 0);

	useEffect(() => {
		interface FetchPizzaParams {
			typeFilter: string;
			currentPage: number;
			searchText: string;
			currentCategory?: number;
		}
		const params: FetchPizzaParams = {
			typeFilter,
			currentPage,
			searchText,
		};

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
