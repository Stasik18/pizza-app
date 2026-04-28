import '../../app/styles/app.scss';
import SkeletonRLS from '../../entities/pizza/SkeletonRLS';

const LoadingFetch = () => {
	return (
		<>
			<div className="content">
				<div className="container">
					<div className="content__items">
						{' '}
						{Array(10)
							.fill(0)
							.map((_, i) => {
								return <SkeletonRLS key={i} />;
							})}{' '}
					</div>
				</div>
			</div>
		</>
	);
};

export default LoadingFetch;
