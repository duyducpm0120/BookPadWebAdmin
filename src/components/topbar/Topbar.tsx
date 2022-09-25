import { appName } from '@source/assets/images';
import './Topbar.css';
export const Topbar = (): JSX.Element => (
  <div className="topbar">
    <div className="topbarWrapper">
      <div className="topLeft">
        <img src={appName}></img>
      </div>
      <div className="topRight">right</div>
    </div>
  </div>
);
