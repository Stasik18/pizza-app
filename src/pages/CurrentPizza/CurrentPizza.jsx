import { useParams } from 'react-router-dom';

import styles from './currentPizza.module.scss';

const CurrentPizza = () => {
	const params = useParams();

	return (
		<div className={styles.container}>
			<h2>Наша пицца</h2>
			<img src="" />
			<p>lorem</p>
		</div>
	);
};

export default CurrentPizza;
