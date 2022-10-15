import type { BookPadPageItemType } from './../const/pages';
import type { ActionType } from 'typesafe-actions';
import { createAction } from 'typesafe-actions';

const setGlobal = createAction('global/setGlobal', (global: any) => ({ global }))();

const setCurrentPage = createAction(
  'global/setCurrentPage',
  (currentPage: BookPadPageItemType) => ({ currentPage })
)();

const setCurrentPageIndex = createAction('global/setCurrentPageIndex', (index: number) => ({
  index
}))();
export const globalActions = {
  setGlobal,
  setCurrentPage,
  setCurrentPageIndex
};

export type GlobalActionsType = ActionType<typeof globalActions>;
