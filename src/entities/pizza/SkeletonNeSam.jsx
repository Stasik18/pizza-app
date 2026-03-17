import React from 'react';
import ContentLoader from 'react-content-loader';

const SkeletonNeSam = (props) => (
	<ContentLoader
		speed={1.5}
		width={280}
		height={465}
		viewBox="0 0 280 465"
		backgroundColor="#f3f3f3"
		foregroundColor="#ebebeb"
		{...props}
	>
		<circle cx="125" cy="125" r="125" />
		<rect x="0" y="264" rx="10" ry="10" width="280" height="20" />
		<rect x="0" y="293" rx="10" ry="10" width="280" height="88" />
		<rect x="128" y="391" rx="20" ry="20" width="152" height="45" />
		<rect x="0" y="401" rx="10" ry="10" width="92" height="30" />
	</ContentLoader>
);

export default SkeletonNeSam;
