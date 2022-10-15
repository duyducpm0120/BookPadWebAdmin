import type { ActionType } from 'typesafe-actions';
import { createAction } from 'typesafe-actions';

const setGlobal = createAction('global/setGlobal', (global: any) => ({ global }))();
export const globalActions = {
  setGlobal
};

export type GlobalActionsType = ActionType<typeof globalActions>;
