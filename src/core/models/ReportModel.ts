import { safeGet } from '@core/utils';
interface ObjectData {
  date: 'string';
  count: number;
}
export interface Data {
  bookData: ObjectData[];
  commentData: ObjectData[];
  accountsData: ObjectData[];
  readData: ObjectData[];
}
const defaultData = {
  bookData: [],
  commentData: [],
  accountsData: [],
  readData: []
};

interface WeekData extends Data {}

interface MonthData extends Data {}

interface YearData extends Data {}

export class ReportModel {
  week: WeekData;
  month: MonthData;
  year: YearData;

  constructor(weekData: WeekData, monthData: MonthData, yearData: YearData) {
    this.week = weekData;
    this.month = monthData;
    this.year = yearData;
  }

  public static instantiate = (json: any) => {
    const weekData = safeGet(json, 'weekData', defaultData);
    const monthData = safeGet(json, 'monthData', defaultData);
    const yearData = safeGet(json, 'yearData', defaultData);
    return new ReportModel(weekData, monthData, yearData);
  };
}
