import type { BookPadWAState } from '@core/store';
import { initState } from '@core/store';
import React from 'react';

export const StateContext = React.createContext<BookPadWAState>(initState);

export const StateContextProvider = StateContext.Provider;

export const StateContextConsumer = StateContext.Consumer;
