/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { BookPadPages } from '@core/const';
import { createReducer } from 'typesafe-actions';
import type { GlobalActionsType } from './actions';
import { globalActions } from './actions';
import type { BookPadWAState } from './types';

export const initState: BookPadWAState = {
  CURRENT_PAGE: BookPadPages[0],
  CURRENT_PAGE_INDEX: 2,
  IS_LOADING: false
};
export const reducer = createReducer<BookPadWAState, GlobalActionsType>(initState)
  .handleAction(globalActions.setGlobal, (state, action): BookPadWAState => {
    return {
      ...state,
      ...action.payload.global
    };
  })
  .handleAction(globalActions.setCurrentPage, (state, action): BookPadWAState => {
    return {
      ...state,
      CURRENT_PAGE: action.payload.currentPage
    };
  })
  .handleAction(globalActions.setCurrentPageIndex, (state, action): BookPadWAState => {
    return {
      ...state,
      CURRENT_PAGE_INDEX: action.payload.index
    };
  })
  .handleAction(globalActions.setGlobalLoading, (state, action): BookPadWAState => {
    return {
      ...state,
      IS_LOADING: action.payload.loading
    };
  });
