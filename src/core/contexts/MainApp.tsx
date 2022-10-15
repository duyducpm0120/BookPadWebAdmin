import type { BookPadWAState } from '@core/store';
import { initState, reducer } from '@core/store';
import type { ReactNode } from 'react';
import { useReducer } from 'react';
import { DispatchContextProvider } from './dispatch_context';
import { StateContextProvider } from './state_context';

export const MainApp = ({
  children,
  globalState = initState
}: {
  children: ReactNode;
  globalState?: BookPadWAState;
}) => {
  const [state, dispatch] = useReducer(reducer, globalState);
  return (
    <DispatchContextProvider value={dispatch}>
      <StateContextProvider value={state}>{children}</StateContextProvider>
    </DispatchContextProvider>
  );
};
