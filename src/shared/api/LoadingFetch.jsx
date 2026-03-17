import '../../app/styles/app.scss';
import SkeletonRLS from '../../entities/pizza/SkeletonRLS';
import SkeletonNeSam from '../../entities/pizza/SkeletonNeSam';
import Categories from '../../features/filters/ui/Categories';
import Sort from '../../features/filters/ui/Sort';

const LoadingFetch = ({ ...props }) => {
	return (
		<>
			<div className="content">
				<div className="container">
					<div className="content__top">
						<Categories changeCategoriesSorted={props.changeCategoriesSorted} />
						<Sort />
					</div>
					<h2 className="content__title">Все пиццы</h2>
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
