import './SideBar.scss';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import LibraryBooksOutlinedIcon from '@mui/icons-material/LibraryBooksOutlined';
import { BlankSpacer } from '../BlankSpacer';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
export const SideBar = (): JSX.Element => {
  const [selectedItem, setSelectedItem] = useState('Information');
  const navigate = useNavigate();
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
  const sideBarItemClassName = (name: string) => {
    return `sideBarItem ${selectedItem === name ? 'selectedWrapper' : ''}`;
  };
  const sideBarItemNameClassName = (name: string) => {
    return `sideBarItemText ${selectedItem === name ? 'selectedItemName' : ''}`;
  };
  return (
    <div className="sideBar">
      <div className="sideBarWrapper">
        {sideBarItems.map((item, index) => {
          return (
            <div
              className={sideBarItemClassName(item.name)}
              key={-index}
              onClick={() => {
                setSelectedItem(item.name);
                item.name !== 'Information' ? navigate(item.name) : navigate('/');
              }}>
              {item.icon}
              <BlankSpacer width={12} />
              <span className={sideBarItemNameClassName(item.name)}>{item.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
