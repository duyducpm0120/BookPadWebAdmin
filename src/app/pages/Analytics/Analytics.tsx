import { APP_THEME, COMMON_COLOR } from '@core';
import { FONT_SIZE } from '@core/const/font';
import { Paper, Typography } from '@mui/material';
import { useStyles } from './styles';
import type { AnalyticsItem } from './types';
import { useState } from 'react';

export const AnalyticPage = () => {
  const styles = useStyles();

  const analyticsData: AnalyticsItem[] = [
    {
      content: 'Number of books',

      value: 10
    },
    {
      content: 'Number of Views',

      value: 112
    },
    {
      content: 'Active accounts',

      value: 10
    },
    {
      content: 'Number of ratings',

      value: 23
    }
  ];
  const [currentItem, setCurrentItem] = useState<AnalyticsItem>(analyticsData[0]);

  const currentItemBGColor = APP_THEME.primary.main;
  const currentItemTextColor = COMMON_COLOR.white;

  const renderAnalyticsItem = (item: AnalyticsItem) => {
    return (
      <div className={styles.wrapper}>
        <Paper
          style={{
            width: '100%',
            height: 150,
            backgroundColor:
              currentItem.content === item.content ? currentItemBGColor : COMMON_COLOR.white,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            borderRadius: 12,
            borderWidth: 2,
            borderColor: APP_THEME.primary.main,
            cursor: 'pointer'
          }}
          variant="outlined"
          onClick={() => {
            setCurrentItem(item);
          }}>
          <Typography
            fontWeight={'bold'}
            fontSize={FONT_SIZE.fontSize24}
            color={
              currentItem.content === item.content ? currentItemTextColor : APP_THEME.primary.main
            }>
            {item.value}
          </Typography>
          <Typography
            //   fontWeight={'bold'}
            fontSize={FONT_SIZE.fontSize14}
            color={
              currentItem.content === item.content ? currentItemTextColor : APP_THEME.primary.main
            }>
            {item.content}
          </Typography>
        </Paper>
      </div>
    );
  };
  return (
    <div className={styles.wrapper}>{analyticsData.map((item) => renderAnalyticsItem(item))}</div>
  );
};
