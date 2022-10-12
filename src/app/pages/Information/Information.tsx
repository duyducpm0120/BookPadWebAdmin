/* eslint-disable react/jsx-no-undef */
import { BlankSpacer, EnhancedTable } from '@app/components';
import { COMMON_CORLOR } from '@core';
import { Select, MenuItem } from '@mui/material';
import { useState } from 'react';
import './Information.scss';
import { useViewModel } from './Information.ViewModel';
import { Publisher } from './Publisher/Publisher';
export interface InformartionContentType {
  name: string;
  value: string;
}

export const Information = (): JSX.Element => {
  const content: string[] = ['Authors', 'Books', 'Publishers'];
  const [selectedContent, setSelectedContent] = useState<string>('Authors');
  const { selector } = useViewModel();
  const { publisherData, isLoading } = selector;

  const renderContent = () => {
    // if (isLoading) {
    //   return (
    //     <div className="contentDataWrapper">
    //       <CircularProgress color="primary" />
    //     </div>
    //   );
    // }
    return (
      <div className="contentDataWrapper">
        {selectedContent === 'Authors' && <EnhancedTable tableHeader={selectedContent} />}
        {selectedContent === 'Books' && <span>Books</span>}
        {selectedContent === 'Publishers' && <Publisher publisherData={publisherData} />}
      </div>
    );
  };
  return (
    <div className="informationWrapper">
      <BlankSpacer height={12} />
      <div className="contentInfoWrapper">
        {/* <span className="contentHeader">{selectedContent}</span> */}
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedContent}
          label=""
          onChange={(event) => {
            console.log('event value', event.target);
            setSelectedContent(event.target.value);
          }}
          style={{ width: '30%', backgroundColor: COMMON_CORLOR.white }}
          defaultValue={selectedContent}>
          {content.map((item, index) => {
            return (
              <MenuItem value={item} key={-index}>
                {item}
              </MenuItem>
            );
          })}
        </Select>
      </div>
      <BlankSpacer height={16} />
      {renderContent()}
    </div>
  );
};
