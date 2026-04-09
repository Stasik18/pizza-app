import { use, useState, useRef, useEffect, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
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
	const { currentPage, typeFilter, currentCategory } = useSelector((state) => state.filterSlice);
	const searchText = useSelector((state) => state.searchSlice.searchText);
	const { items, status } = useSelector((state) => state.pizzasSlice);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [sortOrder, setSortOrder] = useState('desc'); // допилить после redux
	const isMounting = useRef(false);

	useEffect(() => {
		// если не пусто в адресной строке, собираем фильтры оттуда
		if (window.location.search) {
			const params = QueryString.parse(window.location.search.substring(1));

			const typeFilter = sortCategory.find((e) => {
				return e.type === params.typeFilter;
			});

			dispatch(
				setQueryParams({
					...params,
					typeFilter,
				}),
			);
		}
	}, []);

	//собираем адресуню строку из наших параметров после первого рендера + запрос
	useEffect(() => {
		if (isMounting.current) {
			const queryString = QueryString.stringify({
				typeFilter: typeFilter.type,
				currentPage: currentPage,
				currentCategory: currentCategory,
			});

			navigate(`?${queryString}`);
		}
		dispatch(
			fetchPizza({
				typeFilter: typeFilter.type,
				sortOrder,
				currentCategory,
				searchText,
				currentPage,
			}),
		);
		isMounting.current = true;
	}, [typeFilter.type, currentCategory, currentPage, searchText]);

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
