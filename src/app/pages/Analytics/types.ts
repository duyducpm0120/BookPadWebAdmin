export interface AnalyticsItem {
  content: string;
  value: number;
  name: string;
}

export enum IFilterStateEnum {
  WEEK = 'week',
  MONTH = 'month',
  YEAR = 'year'
}
