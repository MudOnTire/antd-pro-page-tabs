import React from 'react';
import { useRouteMatch, useLocation } from 'umi';

export default (props) => {
  const match = useRouteMatch();
  const location = useLocation();
  console.log('props === ', props);
  console.log('match === ', match);
  console.log('location === ', location);
  return <>{props.children}</>;
}