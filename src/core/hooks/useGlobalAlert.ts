import { useGlobalDispatch, useGlobalState } from '@core';
import type { AlertType } from '@core/store';
import { globalActions } from '@core/store';
export const useGlobalAlert = () => {
  const globalDispatch = useGlobalDispatch();
  const { ALERT } = useGlobalState();
  const showAlert = ({ message, type }: { message: string; type: AlertType }) => {
    globalDispatch(
      globalActions.setGlobalAlert({
        isShowAlert: true,
        message,
        type
      })
    );
  };
  const hideAlert = () => {
    globalDispatch(
      globalActions.setGlobalAlert({
        isShowAlert: false,
        message: ALERT.MESSAGE,
        type: ALERT.TYPE
      })
    );
  };
  return {
    showAlert,
    hideAlert
  };
};
