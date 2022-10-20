import type { ActionType } from 'typesafe-actions';
import { createAction } from 'typesafe-actions';
export const setNewPublisherName = createAction(
  'Publisher/setNewPublisherName',
  ({ name }: { name: string }) => ({
    name
  })
);

export const PublisherTableAction = { setNewPublisherName };
export type PublisherTableType = ActionType<typeof PublisherTableAction>;
