import { safeGet, safeGetArray } from '@core/utils';
import type { Data } from '@core';
import { APP_THEME, ReportModel, useAuthToken, useMount } from '@core';
import { getGeneralReport } from '@core/services/AnalyticService';
import { useState } from 'react';
import type { AnalyticsItem } from './types';
import { IFilterStateEnum } from './types';
import _ from 'lodash';

export const useViewModel = () => {
  const { authToken } = useAuthToken();
  const [reportData, setReportData] = useState<ReportModel>(ReportModel.instantiate({}));
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [filterState, setFilterState] = useState<IFilterStateEnum>(IFilterStateEnum.WEEK);

  const analyticsData: AnalyticsItem[] = [
    {
      content: 'Total books',
      value: reportData.week.bookData.length > 0 ? reportData?.week.bookData[0].count : 0,
      name: 'bookData'
    },
    {
      content: 'Total Views',
      value: reportData.week.readData.length > 0 ? reportData?.week.readData[0].count : 0,
      name: 'readData'
    },
    {
      content: 'Active accounts',
      value: reportData.week.accountsData.length > 0 ? reportData?.week.accountsData[0].count : 0,
      name: 'accountsData'
    },
    {
      content: 'Total comments',

      value: reportData.week.commentData.length > 0 ? reportData?.week.commentData[0].count : 0,
      name: 'commentData'
    }
  ];

  const [currentAnalyticItem, setCurrentAnalyticItem] = useState<AnalyticsItem>(analyticsData[0]);

  const selectData: Data = safeGet(reportData, filterState, 'week');
  const selectedData = safeGetArray(selectData, currentAnalyticItem.name, []);
  const labels =
    filterState !== 'year'
      ? _.reverse(selectedData.map((item) => item.date))
      : selectedData.map((item) => item.date);
  const data = {
    labels,
    datasets: [
      {
        label: currentAnalyticItem.content,
        data:
          filterState !== 'year'
            ? _.reverse(selectedData.map((item) => item.count))
            : selectedData.map((item) => item.count),
        borderColor: APP_THEME.primary.main,
        backgroundColor: APP_THEME.primary.light
      }
    ]
  };

  useMount(async () => {
    try {
      const reportData = await getGeneralReport(authToken);
      console.log('book report here asdasd', reportData);
      setReportData(reportData);
      setIsLoading(false);
    } catch {}
  });
  return {
    authToken,
    reportData,
    isLoading,
    analyticsData,
    currentAnalyticItem,
    setCurrentAnalyticItem,
    labels,
    data,
    filterState,
    setFilterState
  };
};
