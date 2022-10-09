import { Select, MenuItem } from '@mui/material';
import { useState } from 'react';
import './Information.scss';
import { Publisher } from './Publisher';

export interface InformartionContentType {
  name: string;
  value: string;
}

export const Information = (): JSX.Element => {
  const content: string[] = ['Authors', 'Books', 'Publishers'];
  const [selectedContent, setSelectedContent] = useState<string>('Author');
  return (
    <div className="informationWrapper">
      <div className="contentInfoWrapper">
        <span className="contentHeader">{selectedContent}</span>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedContent}
          label=""
          onChange={(event) => {
            console.log('event value', event.target);
            setSelectedContent(event.target.value);
          }}
          style={{ width: '30%' }}>
          {content.map((item, index) => {
            return (
              <MenuItem value={item} key={-index}>
                {item}
              </MenuItem>
            );
          })}
        </Select>
      </div>
      <div className="contentDataWrapper">
        {selectedContent === 'Authors' && <span>Author</span>}
        {selectedContent === 'Books' && <span>Books</span>}
        {selectedContent === 'Publishers' && (
          <span>
            <Publisher />
          </span>
        )}
      </div>
    </div>
  );
};
