import type { BookPadPageItemType } from '@core/const';

export interface BookPadWAState {
  CURRENT_PAGE: BookPadPageItemType;
  CURRENT_PAGE_INDEX: number;
}

export enum BookPadWAPage {
  Infomations = 'Infomations',
  Books = 'Books'
}
