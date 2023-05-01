import React from 'react';
import ContentLoader from 'react-content-loader';

const Skeleton = (props) => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={456}
    viewBox="0 0 280 456"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="0" y="260" rx="0" ry="0" width="280" height="24" />
    <rect x="0" y="408" rx="0" ry="0" width="90" height="27" />
    <circle cx="140" cy="120" r="120" />
    <rect x="0" y="304" rx="10" ry="10" width="280" height="84" />
    <rect x="129" y="400" rx="25" ry="25" width="151" height="43" />
  </ContentLoader>
);

export default Skeleton;
