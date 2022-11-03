/* eslint-disable react/jsx-no-undef */
import { BlankSpacer } from '@app/components';
import { SPACE, useGlobalDispatch, useGlobalState } from '@core';
import { CircularProgress } from '@mui/material';
import { AuthorTable } from './Authors';
import { CategoryTable } from './Categories';
import './Information.scss';
import { useViewModel } from './Information.ViewModel';
import { PublisherTable } from './Publishers/PublisherTable';
export interface InformartionContentType {
  name: string;
  value: string;
}

export const Information = (): JSX.Element => {
  const { selector, handler } = useViewModel();
  const { publisherData = [], isLoading, authorsData = [], categoriesData = [] } = selector;
  const { getAllCategoriesRefetch, getAllPublisherRefetch, getAllAuthorsRefetch } = handler;
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
        {CURRENT_PAGE.pages[CURRENT_PAGE_INDEX] === 'Authors' && (
          <AuthorTable
            authorsData={authorsData}
            refetchAuthorsData={async () => {
              await getAllAuthorsRefetch();
            }}
          />
        )}
        {CURRENT_PAGE.pages[CURRENT_PAGE_INDEX] === 'Categories' && (
          <CategoryTable
            categoriesData={categoriesData}
            refetchCategoriesData={async () => {
              getAllCategoriesRefetch();
            }}></CategoryTable>
        )}
        {CURRENT_PAGE.pages[CURRENT_PAGE_INDEX] === 'Publishers' && (
          <PublisherTable
            publisherData={publisherData}
            reloadPublisherData={async () => {
              await getAllPublisherRefetch();
            }}
          />
        )}
      </div>
    );
  };
  return <div className="informationWrapper">{renderContent()}</div>;
};
