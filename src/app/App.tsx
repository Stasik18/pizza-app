import { Route, Routes } from 'react-router-dom';

import './styles/app.scss';
import Layout from '../widget/layout/Layout';
import Home from '../pages/Home/ui/Home';
import Cart from '../pages/Cart/ui/Cart';
import CurrentPizza from '../pages/CurrentPizza/CurrentPizza';
import NotFound from '../pages/NotFound/ui/NotFound';

function App() {
	return (
		<Routes>
			<Route path="/" element={<Layout />}>
				<Route path="/cart" element={<Cart />} />
				<Route path="/pizza/:id" element={<CurrentPizza />} />
				<Route path="/" element={<Home />} />
				<Route path="*" element={<NotFound />} />
			</Route>
		</Routes>
	);
}

export default App;
