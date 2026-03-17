import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import styles from './_skeleton.module.scss';

const SkeletonRLS = () => {
	return (
		<div className={styles['pizza-block__skeleton']}>
			<Skeleton circle width={240} height={240} />
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					gap: 10,
				}}
			>
				<Skeleton width={240} height={20} borderRadius={10} />
				<Skeleton width={240} height={88} borderRadius={10} />
			</div>
			<div
				style={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
				}}
			>
				<Skeleton width={92} height={30} borderRadius={10} />
				<Skeleton width={122} height={45} borderRadius={10} />
			</div>
		</div>
	);
};

export default SkeletonRLS;
