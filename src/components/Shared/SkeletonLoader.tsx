import React from "react";
import ContentLoader, { IContentLoaderProps } from "react-content-loader";

const SkeletonLoader = (
  props: JSX.IntrinsicAttributes & IContentLoaderProps
) => (
  <div className="flex justify-center">
    <ContentLoader
      width={224}
      height={336}
      viewBox="0 0 224 336"
      backgroundColor="#f0f0f0"
      foregroundColor="#dedede"
      {...props}
    >
      <rect x="43" y="304" rx="4" ry="4" width="271" height="9" />
      <rect x="44" y="323" rx="3" ry="3" width="119" height="6" />
      <rect x="42" y="77" rx="10" ry="10" width="388" height="217" />
    </ContentLoader>
  </div>
);

export default SkeletonLoader;
