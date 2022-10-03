import { signIn } from '@core/services';
import { Button, Checkbox, FormControlLabel, TextField } from '@mui/material';
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
          InputProps={{ style: { borderRadius: 6 } }}
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
        />
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
          color="primary.dark"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          onClick={onSignInButtonClick}>
          Sign In
        </Button>
      </div>
    </div>
  );
};
