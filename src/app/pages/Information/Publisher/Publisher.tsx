import React from 'react';
import type { PublisherPageProps } from './Publisher.types';
import { EnhancedTable } from '@app/components';
import { useGlobalState } from '@core';

export const Publisher: React.FC<PublisherPageProps> = (props: PublisherPageProps) => {
  const { publisherData } = props;
  const { CURRENT_PAGE_INDEX, CURRENT_PAGE } = useGlobalState();

  return (
    <div style={{ height: 400, width: '100%' }}>
      <EnhancedTable
        tableHeader={CURRENT_PAGE.pages[CURRENT_PAGE_INDEX]}
        tableData={publisherData}
      />
    </div>
  );
};
