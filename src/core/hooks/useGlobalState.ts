import { StateContext } from '@core/contexts';
import React from 'react';
export const useGlobalState = () => {
  const context = React.useContext(StateContext);
  if (context === undefined) {
    throw new Error('useGlobalState must be used within a Provider');
  }
  return context;
};
