import type { BookPadPageItemType } from '@core/const';

export interface BookPadWAState {
  CURRENT_PAGE: BookPadPageItemType;
  CURRENT_PAGE_INDEX: number;
  IS_LOADING: boolean;
}

export enum BookPadWAPage {
  Infomations = 'Infomations',
  Books = 'Books'
}
