import { Outlet } from 'react-router-dom';
import Header from '../header/ui/Header';

export default function Layout() {
	return (
		<div className="wrapper">
			<Header />
			<main>
				<Outlet />
			</main>
		</div>
	);
}
