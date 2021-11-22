import React from 'react';
import Skeleton from '../../components/Skeleton';
import './index.css';

export default function Loading() {
  return (
    <div>
      <div className="loading-nav">
        <Skeleton width="37px" height="37px" />
        <Skeleton width="40%" height="37px" />
        <Skeleton width="37px" height="37px" />
      </div>
      <div className="loading-tab">
        <Skeleton width="20%" height="37px" />
        <Skeleton width="20%" height="37px" />
        <Skeleton width="20%" height="37px" />
      </div>

      <Skeleton width="100%" height="calc(100vh - 113px)" />
    </div>
  );
}
