import { Topbar } from '@app/components';
import { useAuthToken } from '@core';
import { getAllPublisher } from '@core/services';
import { useEffect } from 'react';
import './Home.scss';

export const Home = () => {
  const { data, loading, error } = getAllPublisher();
  console.log(data, loading, error);
  const { authToken } = useAuthToken();
  console.log('authToken', authToken);
  useEffect(() => {
    if (!loading) console.log('data', data);
  }, [data, loading]);
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
          <span>aaaaa</span>
        </div>
        <div className="contentWrapper">
          <span>aaaaasdasdas</span>
        </div>
      </div>
    </div>
  );
};
