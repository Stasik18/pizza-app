import { use, useState, useRef, useEffect, useContext } from 'react';

import '../../../app/styles/app.scss';
import PizzaCard from '../../../entities/pizza/PizzaCard';
import Cotegories from '../../../features/filters/ui/categories/Categories';
import Sort from '../../../features/filters/ui/sort/Sort';
import Pagination from '../../../features/pagination/Pagination';

import { SearchValue } from '../../../app/App';
const Home = ({ ...props }) => {
	const [pizzas, setPizzas] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [showSkeleton, setShowSkeleton] = useState(false);

	const [typeSorted, setTypeSorted] = useState('rating');
	const [categoriesSorted, setCategoriesSorted] = useState(0);
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
			url.searchParams.set('sortBy', typeSorted);
			url.searchParams.set('search', search);
			url.searchParams.set('page', page);
			url.searchParams.set('limit', 4);
			categoriesSorted === 0 ? url : url.searchParams.append('category', categoriesSorted);
			try {
				const response = await fetch(url);
				if (!response.ok) throw new Error('Ебобо');
				const data = await response.json();
				setPizzas(data);
			} catch (e) {
				setError(e);
			} finally {
				setLoading(false);
			}
		};

		loadPizza();
	}, [typeSorted, sortOrder, categoriesSorted, searchValue, page]);

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
					<Cotegories
						value={categoriesSorted}
						changeCategoriesSorted={(id) => setCategoriesSorted(id)}
					/>
					<Sort value={typeSorted} setTypeSorted={(sortParams) => setTypeSorted(sortParams)} />
				</div>
				<h2 className="content__title">Все пиццы</h2>
				<div className="content__items">
					{pizzas.map((card) => {
						return <PizzaCard {...card} key={card.id} />;
					})}
				</div>

				<Pagination totalPage={3} page={page} setPage={setPage} />
			</div>
		</div>
	);
};

export default Home;
