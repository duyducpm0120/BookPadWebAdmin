import { SideBar, Topbar } from '@app/components';
import { Outlet } from 'react-router-dom';
import './Home.scss';
export const Home = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start'
      }}>
      <Topbar />

      <div className="sideBarAndContentWrapper">
        <div className="sideBarWrapper">
          <SideBar />
        </div>
        <div className="contentWrapper">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
