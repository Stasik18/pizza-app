import { use, useState, useRef, useEffect, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import QueryString from 'qs';
import axios from 'axios';

import '../../../app/styles/app.scss';

import PizzaCard from '../../../entities/pizza/PizzaCard';
import Cotegories from '../../../features/filters/ui/categories/Categories';
import Sort from '../../../features/filters/ui/sort/Sort';
import Pagination from '../../../features/pagination/Pagination';
import { sortCategory } from '../../../features/filters/ui/sort/Sort';
import {
	setCategoryId,
	setTypeFilter,
	setCurrentPage,
	setQueryParams,
} from '../../../app/redux/slices/filterSlice';

const Home = ({ ...props }) => {
	const { currentPage, typeFilter, currentCategory } = useSelector((state) => state.filterSlice);
	const searchText = useSelector((state) => state.searchSlice.searchText);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	console.log(typeFilter);

	const [pizzas, setPizzas] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [showSkeleton, setShowSkeleton] = useState(false);
	const [sortOrder, setSortOrder] = useState('desc'); // допилить после redux
	const [isLoading, setIsLoading] = useState(false);
	const search = searchText ? `${searchText}` : ''; // что вообще тут поменяется ебать

	const isMounting = useRef(false);

	useEffect(() => {
		if (window.location.search) {
			const params = QueryString.parse(window.location.search.substring(1));
			console.log(params);
			const typeFilter = sortCategory.find((e) => {
				return e.type === params.typeFilter;
			});
			console.log(typeFilter);

			dispatch(
				setQueryParams({
					...params,
					typeFilter,
				}),
			);
		}
	}, []);

	useEffect(() => {
		if (isMounting.current) {
			const queryString = QueryString.stringify({
				typeFilter: typeFilter.type,
				currentPage: currentPage,
				currentCategory: currentCategory,
			});
			console.log(queryString);
			navigate(`?${queryString}`);
		}
		isMounting.current = true;
		setIsLoading(true);
	}, [typeFilter.type, currentCategory, currentPage]);

	useEffect(() => {
		if (isLoading) {
			setLoading(true);
			const loadPizza = async () => {
				const url = new URL(
					`https://6989c620c04d974bc6a05c40.mockapi.io/items?&sortBy=rating&order=asc`,
				);
				url.searchParams.set('sortBy', typeFilter.type);
				url.searchParams.set('search', search);
				url.searchParams.set('page', currentPage);
				url.searchParams.set('limit', 4);
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
		}
	}, [typeFilter.type, sortOrder, currentCategory, searchText, currentPage, isLoading]);

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

				<Pagination totalPage={3} />
			</div>
		</div>
	);
};

export default Home;
