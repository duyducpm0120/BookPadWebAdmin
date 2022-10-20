import type { AlertType } from './types';
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

const setGlobalLoading = createAction('global/setGlobalLoading', (loading: boolean) => ({
  loading
}))();

const setGlobalAlert = createAction(
  'global/setGlobalAlert',
  ({ type, message, isShowAlert }: { type: AlertType; message: string; isShowAlert: boolean }) => ({
    type,
    isShowAlert,
    message
  })
)();

export const globalActions = {
  setGlobal,
  setCurrentPage,
  setCurrentPageIndex,
  setGlobalLoading,
  setGlobalAlert
};

export type GlobalActionsType = ActionType<typeof globalActions>;
