import { Route, Routes } from 'react-router-dom';
import React from 'react';

import './styles/app.scss';
import Header from '../widget/header/ui/Header';
import LoadingFetch from '../shared/api/LoadingFetch';
import Home from '../pages//Home/ui/Home.jsx';
import Cart from '../pages/Cart/ui/Cart.jsx';
import NotFound from '../pages/NotFound/ui/NotFound.jsx';

function App() {
	const [status, setStatus] = React.useState('success');

	const renderWay = {
		loading: <LoadingFetch />,
		error: <NotFound />,
		success: <Home setStatus={setStatus} />,
	};

	// function forSortPizzas(elem) {
	// 	const obj = {
	// 		2: function () {
	// 			console.log(elem);
	// 			const sortPizzas = [...pizzas].sort((a, b) => {
	// 				return a.title.localeCompare(b.title);
	// 			});

	// 			setPizzas(sortPizzas);
	// 		},
	// 		0: function () {
	// 			console.log(elem);
	// 			const sortPizzas = [...pizzas].sort((a, b) => {
	// 				return b.rating - a.rating;
	// 			});

	// 			setPizzas(sortPizzas);
	// 		},
	// 		1: function () {
	// 			console.log(elem);
	// 			const sortPizzas = [...pizzas].sort((a, b) => {
	// 				return b.price - a.price;
	// 			});
	// 			setPizzas(sortPizzas);
	// 		},
	// 	};

	// 	obj[elem.id]();
	// }
	// function forCategoriesPizzas(activePizzaCategories) {
	// 	if (activePizzaCategories === 1) {
	// 		setPizzas(pizzasSorted);
	// 	} else {
	// 		setPizzas(
	// 			pizzasSorted.filter((pizza) => {
	// 				return pizza.category === activePizzaCategories;
	// 			}),
	// 		);
	// 	}
	// }

	return (
		<div className="wrapper">
			<Header />
			<Routes>
				<Route path="/cart" element={<Cart />} />
				<Route path="/" element={renderWay[status]} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</div>
	);
}

export default App;
