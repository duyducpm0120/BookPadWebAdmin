import { END_POINT, ReportModel } from '@core';
import axios from 'axios';
const getReportEndPoint = END_POINT + '/report/general';
export const getGeneralReport = async (token: string) => {
  const response = await axios.post(
    getReportEndPoint,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
  return new ReportModel(response.data.weekData, response.data.monthData, response.data.yearData);
};
