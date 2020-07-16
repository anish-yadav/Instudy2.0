import * as React from 'react';

export const navigationRef = React.createRef();

export const navigate = (name, params) => {
  console.log('returning to ',name)
  navigationRef.current?.navigate(name, params);
}