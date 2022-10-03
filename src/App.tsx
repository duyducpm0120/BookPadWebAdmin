import { createTheme, ThemeProvider } from '@mui/material';
import './App.scss';
import { appTheme } from './core/const';
import { SignIn } from './app/pages/SignIn';
import './core/scss/styles.scss';
const theme = createTheme(appTheme);
function App(): JSX.Element {
  return (
    <ThemeProvider theme={theme}>
      <div className="app">
        {/* <Topbar /> */}
        <SignIn></SignIn>
      </div>
    </ThemeProvider>
  );
}

export default App;
