import { APP_THEME, COMMON_COLOR, SPACE, strings } from '@core';
import { FONT_SIZE } from '@core/const/font';
import { Box, CircularProgress, Paper, Typography } from '@mui/material';
import { useStyles } from './styles';
import type { AnalyticsItem } from './types';
import { IFilterStateEnum } from './types';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { BPTextField, BlankSpacer } from '@app/components';
import { useViewModel } from './ViewModel';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const
    }
  }
};

export const AnalyticPage = () => {
  const styles = useStyles();
  const {
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
  } = useViewModel();

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
              currentAnalyticItem.content === item.content
                ? currentItemBGColor
                : COMMON_COLOR.white,
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
            setCurrentAnalyticItem(item);
          }}>
          <Typography
            fontWeight={'bold'}
            fontSize={FONT_SIZE.fontSize24}
            color={
              currentAnalyticItem.content === item.content
                ? currentItemTextColor
                : APP_THEME.primary.main
            }>
            {item.value}
          </Typography>
          <Typography
            //   fontWeight={'bold'}
            fontSize={FONT_SIZE.fontSize14}
            color={
              currentAnalyticItem.content === item.content
                ? currentItemTextColor
                : APP_THEME.primary.main
            }>
            {item.content}
          </Typography>
        </Paper>
      </div>
    );
  };
  if (isLoading) {
    return (
      <Box className={styles.loadingWrapper}>
        <BlankSpacer height={SPACE.spacing16} />
        <CircularProgress color="primary" />
      </Box>
    );
  }
  return (
    <div className={styles.wrapper}>
      <div className={styles.itemContainer}>
        {analyticsData.map((item) => renderAnalyticsItem(item))}
      </div>

      <Paper
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          flexDirection: 'column'
        }}>
        <BlankSpacer height={SPACE.spacing16} />
        <div
          style={{
            marginLeft: SPACE.spacing16
          }}>
          <BPTextField
            label={strings.status}
            value={filterState}
            onChange={(e) => {
              setFilterState(e.target.value as IFilterStateEnum);
            }}
            multiSelectParams={{
              options: [
                { label: IFilterStateEnum.WEEK, value: IFilterStateEnum.WEEK },
                { label: IFilterStateEnum.MONTH, value: IFilterStateEnum.MONTH },
                { label: IFilterStateEnum.YEAR, value: IFilterStateEnum.YEAR }
              ]
            }}
            inputStyle={{
              width: 200,
              backgroundColor: COMMON_COLOR.white
            }}></BPTextField>
        </div>
        <Line options={options} data={data} />;
      </Paper>
    </div>
  );
};
