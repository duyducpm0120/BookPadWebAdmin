/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { createReducer } from 'typesafe-actions';
import type { GlobalActionsType } from './actions';
import { globalActions } from './actions';
import type { BookPadWAState } from './types';

export const initState: BookPadWAState = {
  CURRENT_PAGE: 'Infomations'
};
export const reducer = createReducer<BookPadWAState, GlobalActionsType>(initState).handleAction(
  globalActions.setGlobal,
  (state, action): BookPadWAState => {
    return {
      ...state,
      ...action.payload.global
    };
  }
);
