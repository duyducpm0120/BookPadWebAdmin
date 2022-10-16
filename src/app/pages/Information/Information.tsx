/* eslint-disable react/jsx-no-undef */
import { BlankSpacer, EnhancedTable } from '@app/components';
import { SPACE, useGlobalDispatch, useGlobalState } from '@core';
import { CircularProgress } from '@mui/material';
import { useId } from 'react';
import './Information.scss';
import { useViewModel } from './Information.ViewModel';
import { Publisher } from './Publisher/Publisher';
export interface InformartionContentType {
  name: string;
  value: string;
}

export const Information = (): JSX.Element => {
  const id = useId();
  const content: string[] = ['Authors', 'Books', 'Publishers'];
  const { selector } = useViewModel();
  const { publisherData, isLoading } = selector;
  const { CURRENT_PAGE_INDEX, CURRENT_PAGE } = useGlobalState();
  const globalDispatch = useGlobalDispatch();

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="contentDataWrapper">
          <CircularProgress color="primary" />
        </div>
      );
    }
    return (
      <div className="contentDataWrapper">
        <BlankSpacer height={SPACE.spacing16} />
        {CURRENT_PAGE_INDEX === 0 && (
          <EnhancedTable
            tableHeader={CURRENT_PAGE.pages[CURRENT_PAGE_INDEX]}
            tableData={publisherData}
          />
        )}
        {CURRENT_PAGE_INDEX === 1 && <span>Books</span>}
        {CURRENT_PAGE_INDEX === 2 && <Publisher publisherData={publisherData} />}
      </div>
    );
  };
  return <div className="informationWrapper">{renderContent()}</div>;
};
