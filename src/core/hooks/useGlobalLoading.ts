import { useGlobalDispatch, useGlobalState } from '@core';
import { globalActions } from '@core/store';

export const useGlobalLoading = () => {
  const { IS_LOADING } = useGlobalState();
  const globalDispatch = useGlobalDispatch();
  const showGlobalLoading = () => {
    globalDispatch(globalActions.setGlobalLoading(true));
  };
  const hideGlobalLoading = () => {
    globalDispatch(globalActions.setGlobalLoading(false));
  };
  return {
    IS_LOADING,
    showGlobalLoading,
    hideGlobalLoading
  };
};
