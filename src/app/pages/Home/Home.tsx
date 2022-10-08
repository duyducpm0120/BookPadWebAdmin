import { Topbar } from '@app/components';
import { useMount } from '@core/hooks';
import { getAllPublisher } from '@core/services';
import './Home.scss';

export const Home = () => {
  const { data, loading, error } = getAllPublisher();
  console.log(data, loading, error);
  useMount(async () => {});
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
