import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import '../../../app/styles/app.scss';

import PizzaCard from '../../../entities/pizza/PizzaCard';
import Cotegories from '../../../features/filters/ui/categories/Categories';
import Sort from '../../../features/filters/ui/sort/Sort';
import Pagination from '../../../features/pagination/Pagination';

import { useAppDispatch, useAppSelector } from '../../../app/redux/hooks';
import { fetchPizza } from '../../../app/redux/slices/pizzasSlice';
import LoadingFetch from '../../../shared/api/LoadingFetch';

const Home = () => {
	const searchText: string = useAppSelector((state) => state.searchSlice.searchText);
	const { items, status } = useAppSelector((state) => state.pizzasSlice);
	const dispatch = useAppDispatch();

	const [searchParams, _setSearchParams] = useSearchParams();

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

		if (Number(currentCategory) !== 0) {
			params.currentCategory = currentCategory;
		}

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
