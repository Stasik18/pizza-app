import styles from './NotFound.module.scss';

const NotFound = () => {
	return (
		<div className={styles.root}>
			<span className={styles.smile}>👿</span>
			<h1>Такой страницы не существует </h1>
			<span className={styles.desriptions}>УЧИ УРОКИ ДЕБИЛ!!!</span>
		</div>
	);
};

export default NotFound;
