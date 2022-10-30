/* eslint-disable @typescript-eslint/no-empty-interface */
export interface BookPageProps {
  // ...//
}

export interface BookFilterState {
  name: string;
  status: string;
  author: string;
}

export enum BookStatusType {
  active = 'active',
  inactive = 'inactive'
}
