import { appLogo } from '@core/assets/images';
import { SPACE } from '@core/const';
import { Avatar } from '@mui/material';
import { BlankSpacer } from '../BlankSpacer';
import './Topbar.scss';
export const Topbar = (): JSX.Element => {
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <img src={appLogo} className="logo" alt="BookPad" width={160}></img>
          {/* <TextField
            label="With normal TextField"
            InputProps={{
              endAdornment: (
                <IconButton>
                  <SearchIcon />
                </IconButton>
              )
            }}
          /> */}
        </div>

        <div className="topRight">
          <span>Duy Duc</span>
          <BlankSpacer width={SPACE.spacing12} />
          <Avatar
            alt="Duy Duc"
            src="https://scontent.fsgn2-4.fna.fbcdn.net/v/t1.6435-9/162016989_2971993669743629_5891791068429675603_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=fou_5fBzOmwAX9lHoC_&_nc_ht=scontent.fsgn2-4.fna&oh=00_AT-OZyYnYpcaVQePM3g-2nAGFwRI3hZep22rUoTs1lWUww&oe=6363C781"
          />
        </div>
      </div>
    </div>
  );
};
