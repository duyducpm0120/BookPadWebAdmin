/* eslint-disable react/jsx-no-undef */
import { BlankSpacer } from '@app/components';
import { SPACE, useGlobalDispatch, useGlobalState } from '@core';
import { CircularProgress } from '@mui/material';
import './Information.scss';
import { useViewModel } from './Information.ViewModel';
import { PublisherTable } from './Publisher/PublisherTable';
export interface InformartionContentType {
  name: string;
  value: string;
}

export const Information = (): JSX.Element => {
  const { selector, handler } = useViewModel();
  const { publisherData, isLoading } = selector;
  const { reloadPublisherData } = handler;
  const { CURRENT_PAGE_INDEX, CURRENT_PAGE } = useGlobalState();
  const globalDispatch = useGlobalDispatch();

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="contentDataWrapper">
          <BlankSpacer height={SPACE.spacing16} />
          <CircularProgress color="primary" />
        </div>
      );
    }
    return (
      <div className="contentDataWrapper">
        <BlankSpacer height={SPACE.spacing16} />
        {CURRENT_PAGE_INDEX === 0 && <></>}
        {CURRENT_PAGE_INDEX === 1 && <span>Books</span>}
        {CURRENT_PAGE_INDEX === 2 && (
          <PublisherTable publisherData={publisherData} reloadPublisherData={reloadPublisherData} />
        )}
      </div>
    );
  };
  return <div className="informationWrapper">{renderContent()}</div>;
};
