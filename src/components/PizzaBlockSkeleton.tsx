import React from "react";
import ContentLoader from "react-content-loader";

const PizzaBlockSkeleton: React.FC = () => (
  <ContentLoader
    speed={2}
    width={280}
    height={465}
    viewBox="0 0 280 465"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    className="pizza-block"
  >
    <circle cx="130" cy="110" r="110" />
    <rect x="0" y="242" rx="10" ry="10" width="280" height="27" />
    <rect x="0" y="292" rx="10" ry="10" width="280" height="88" />
    <rect x="0" y="418" rx="10" ry="10" width="90" height="27" />
    <rect x="128" y="406" rx="20" ry="20" width="150" height="45" />
  </ContentLoader>
);

export default PizzaBlockSkeleton;
