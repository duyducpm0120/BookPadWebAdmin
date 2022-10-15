import { DispatchContext } from '@core/contexts';
import React from 'react';

export const useGlobalDispatch = () => {
  const context = React.useContext(DispatchContext);
  if (context === undefined) {
    throw new Error('useDispatch must be used within a Provider');
  }
  return context;
};
