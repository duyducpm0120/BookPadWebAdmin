import { palette, RADIUS, SPACE } from '@core/const';
import { signIn } from '@core/services';
import { Button, Checkbox, FormControlLabel, Link, TextField } from '@mui/material';
import { useState } from 'react';
import './SignIn.scss';

export const SignIn = (): JSX.Element => {
  const [email, setEmail] = useState('vuong.dt.23@gmail.com');
  const [password, setPassword] = useState('emmawatson');
  const onSignInButtonClick = async (): Promise<void> => {
    try {
      const result = await signIn({ email, password });
      console.log('Sign in success', result);
    } catch (err) {
      console.log('signin err', err);
    }
  };
  return (
    <div className="signIn">
      <div className="signInWrapper">
        <span className="signInHeader">SIGN IN</span>
        <TextField
          margin="normal"
          required
          id="email"
          label="User name"
          name="email"
          autoComplete="email"
          autoFocus
          className="signInTextField"
          color="primary"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          InputProps={{ style: { borderRadius: RADIUS.radius6 } }}
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
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{ style: { borderRadius: RADIUS.radius6 } }}
        />
        <div className="rememberWrapper">
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
            color="primary"
            componentsProps={{ typography: { color: palette.text.primary } }}
          />
          <Link href="#">Forgot password?</Link>
        </div>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ height: SPACE.spacing40 }}
          onClick={onSignInButtonClick}
          color={'primary'}>
          Sign In
        </Button>
        {/* <BlankSpacer height={SPACE.spacing12} />
        <Link href="#" variant="body2">
          {"Don't have an account? Sign Up"}
        </Link> */}
      </div>
    </div>
  );
};
