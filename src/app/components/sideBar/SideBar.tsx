import './SideBar.scss';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import LibraryBooksOutlinedIcon from '@mui/icons-material/LibraryBooksOutlined';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Accordion, AccordionSummary, Typography, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { BlankSpacer } from '../BlankSpacer';

export const SideBar = (): JSX.Element => {
  const sideBarItems = [
    {
      icon: <InfoOutlinedIcon sx={{ width: 24, height: 24 }} />,
      name: 'Information'
    },
    {
      icon: <LibraryBooksOutlinedIcon sx={{ width: 24, height: 24 }} />,
      name: 'Books'
    }
  ];
  const [selectedItem, setSelectedItem] = useState('Information');
  const navigate = useNavigate();

  const renderSideBarItem = (item: { icon: JSX.Element; name: string }, index: number) => {
    switch (item.name) {
      case 'Information':
        return (
          <div className="sideBarItemAcordition" key={-index}>
            <Accordion
              elevation={0}
              sx={{
                width: '100%'
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
                <div
                  className="sideBarItemDetail"
                  onClick={() => {
                    setSelectedItem(item.name);
                    item.name !== 'Information' ? navigate(item.name) : navigate('/');
                  }}>
                  <Typography>Authors</Typography>
                </div>
                <BlankSpacer height={16} />
                <div
                  className="sideBarItemDetail"
                  onClick={() => {
                    setSelectedItem(item.name);
                    item.name !== 'Information' ? navigate(item.name) : navigate('/');
                  }}>
                  <Typography>Authors</Typography>
                </div>
                <BlankSpacer height={16} />
                <div
                  className="sideBarItemDetail"
                  onClick={() => {
                    setSelectedItem(item.name);
                    item.name !== 'Information' ? navigate(item.name) : navigate('/');
                  }}>
                  <Typography>Authors</Typography>
                </div>
              </AccordionDetails>
            </Accordion>
          </div>
        );
      default:
        return (
          <div
            className="sideBarItem"
            key={-index}
            onClick={() => {
              setSelectedItem(item.name);
              item.name !== 'Information' ? navigate(item.name) : navigate('/');
            }}>
            {item.icon}
            <BlankSpacer width={12} />
            <span className="sideBarItemText">{item.name}</span>
          </div>
        );
    }
  };

  return (
    <div className="sideBar">
      <div className="sideBarWrapper">
        {sideBarItems.map((item, index) => {
          return renderSideBarItem(item, index);
        })}
      </div>
    </div>
  );
};
