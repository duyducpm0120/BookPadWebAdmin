/* eslint-disable no-case-declarations */
import './SideBar.scss';
import { useNavigate } from 'react-router-dom';
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { BlankSpacer } from '../BlankSpacer';
import type { BookPadPageItemType } from '@core';
import { useGlobalDispatch, BookPadPages } from '@core';
import { size } from 'lodash';
import { globalActions } from '@core/store';

export const SideBar = (): JSX.Element => {
  const navigate = useNavigate();
  const globalDispatch = useGlobalDispatch();

  const renderSideBarItem = (item: BookPadPageItemType, index: number) => {
    if (size(item.pages) > 0) {
      return (
        <div className="sideBarItemAcordition" key={`${-index}wrapper`}>
          <Accordion
            elevation={0}
            sx={{
              width: '100%'
            }}
            key={`${-index}accordion`}
            onClick={() => {
              navigate('/');
            }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              sx={{ marginBottom: 0, padding: 0 }}>
              <div className="sideBarItemSummary">
                {item.icon}
                <BlankSpacer width={12} />
                <span className="sideBarItemText">{item.name}</span>
              </div>
            </AccordionSummary>
            <AccordionDetails
              sx={{
                // backgroundColor: 'red',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                paddingLeft: 4,
                paddingTop: 0,
                paddingBottom: 0,
                marginTop: 0,
                marginBottom: 0
              }}>
              {item.pages.map((page, index) => {
                return (
                  <div key={`${-index} item wrapper`}>
                    <div
                      className="sideBarItemDetail"
                      key={`${-index}sideBarItemDetail`}
                      onClick={() => {
                        // page !== 'Information' ? navigate(detailItem) : navigate('/');
                        globalDispatch(globalActions.setCurrentPageIndex(index));
                      }}>
                      <Typography>{page}</Typography>
                    </div>
                    {index < size(item.pages) ? <BlankSpacer height={16} /> : null}
                  </div>
                );
              })}
            </AccordionDetails>
          </Accordion>
        </div>
      );
    }
    return (
      <div
        className="sideBarItem"
        key={`${-index}sideBarItem`}
        onClick={() => {
          item.name === 'Information' ? navigate('/') : navigate(item.name);
        }}>
        {item.icon}
        <BlankSpacer width={12} />
        <span className="sideBarItemText">{item.name}</span>
      </div>
    );
  };

  return (
    <div className="sideBar">
      <div className="sideBarWrapper">
        {BookPadPages.map((item, index) => {
          return renderSideBarItem(item, index);
        })}
      </div>
    </div>
  );
};
