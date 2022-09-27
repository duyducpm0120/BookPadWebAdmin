import { appLogo } from '@source/assets/images';
import './Topbar.scss';
export const Topbar = (): JSX.Element => (
  <div className="topbar">
    <div className="topbarWrapper">
      <div className="topLeft">
        <img src={appLogo} className="logo" alt="BookPad" width={160}></img>
      </div>
      <div className="topRight">right</div>
    </div>
  </div>
);
