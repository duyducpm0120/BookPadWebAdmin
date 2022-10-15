import type { GlobalActionsType } from '@core/store';
import React from 'react';

type Dispatch = (action: GlobalActionsType) => void;

export const DispatchContext = React.createContext<Dispatch | undefined>(undefined);

export const DispatchContextProvider = DispatchContext.Provider;

export const DispatchContextConsumer = DispatchContext.Consumer;
