import { Route, Routes } from 'react-router-dom';
import React from 'react';

import './styles/app.scss';
import Header from '../widget/header/ui/Header';
import Home from '../pages//Home/ui/Home.jsx';
import Cart from '../pages/Cart/ui/Cart.jsx';
import CurrentPizza from '../pages/CurrentPizza/CurrentPizza.jsx';
import NotFound from '../pages/NotFound/ui/NotFound.jsx';

function App() {
	return (
		<div className="wrapper">
			<Header />
			<Routes>
				<Route path="/cart" element={<Cart />} />
				<Route path="/pizza/:id" element={<CurrentPizza />} />
				<Route path="/" element={<Home />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</div>
	);
}

export default App;
