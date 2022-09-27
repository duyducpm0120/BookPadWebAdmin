import { Checkbox, FormControlLabel, TextField } from '@mui/material';
import './SignIn.scss';
export const SignIn = (): JSX.Element => {
  return (
    <div className="signIn">
      <div className="signInWrapper">
        <TextField
          margin="normal"
          required
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          className="signInTextField"
          color="primary"
          fullWidth
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
        />
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        />
      </div>
    </div>
  );
};
