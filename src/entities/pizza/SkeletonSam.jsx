import '../../scss/components/_skeleton.scss';

const SkeletonSam = () => {
	return (
		<>
			<div className="pizza-block__skeleton">
				<div className="pizza-block__skeleton__image"></div>
				<div className="pizza-block__skeleton__title"></div>
				<div className="pizza-block__skeleton__selector"></div>
				<div className="pizza-block__skeleton__bottom">
					<div className="pizza-block__skeleton__price"></div>
					<div className="pizza-block__skeleton__button"></div>
				</div>
			</div>
		</>
	);
};

export default SkeletonSam;
