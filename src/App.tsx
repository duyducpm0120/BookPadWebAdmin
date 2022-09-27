import { createTheme, ThemeProvider } from '@mui/material';
import './App.scss';
import { appTheme } from './const';
import { SignIn } from './pages/SignIn';
import './scss/styles.scss';

// import { Topbar } from './components/topbar/Topbar';
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
