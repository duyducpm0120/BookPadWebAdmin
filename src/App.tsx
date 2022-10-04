import { createTheme, ThemeProvider } from '@mui/material';
import './App.scss';
import { appTheme } from './core/const';
import './core/scss/styles.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SignIn } from '@app/pages/SignIn';
import Layout from '@app/pages/Layouts/Layout';
import { Home } from '@app/pages';
const theme = createTheme(appTheme);
function App(): JSX.Element {
  return (
    <ThemeProvider theme={theme}>
      <div className="app">
        {/* <Topbar /> */}
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<SignIn />} />
              <Route path="home" element={<Home />} />
              {/* <Route path="contact" element={<Contact />} />
              <Route path="*" element={<NoPage />} /> */}
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;
