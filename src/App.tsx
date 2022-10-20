/* eslint-disable multiline-ternary */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import {
  Alert,
  Backdrop,
  CircularProgress,
  createTheme,
  Snackbar,
  ThemeProvider
} from '@mui/material';
import './App.scss';
import { appTheme } from './core/const';
import './core/scss/styles.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SignIn } from '@app/pages/SignIn';
import Layout from '@app/pages/Layouts/Layout';
import { Books, Home, Information } from '@app/pages';
import { ApolloProvider } from '@apollo/client';
import { useAppApolloClient, useAuthToken, useGlobalState } from '@core/hooks';
import { useGlobalAlert } from '@core/hooks/useGlobalAlert';
const theme = createTheme(appTheme);
const App = () => {
  const client = useAppApolloClient();
  const { authToken } = useAuthToken();
  console.log('authToken', authToken);
  const { IS_LOADING, ALERT } = useGlobalState();
  const { IS_SHOW_ALERT, MESSAGE, TYPE } = ALERT;
  const { hideAlert } = useGlobalAlert();
  const handleClose = () => {
    hideAlert();
  };
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <div className="app">
          {/* <Topbar /> */}
          <BrowserRouter>
            <Routes>
              {authToken === undefined ? (
                <Route path="/" element={<Layout />}>
                  <Route index element={<SignIn />} />
                  {/* <Route path="contact" element={<Contact />} />
              <Route path="*" element={<NoPage />} /> */}
                </Route>
              ) : (
                <Route path="/" element={<Home />}>
                  <Route index element={<Information />}></Route>
                  <Route path="/Books" element={<Books />} />
                </Route>
              )}
            </Routes>
          </BrowserRouter>
          <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={IS_LOADING}
            onClick={() => {}}>
            <CircularProgress color="primary" />
          </Backdrop>
          <Snackbar open={IS_SHOW_ALERT} autoHideDuration={6000} onClose={handleClose}>
            <Alert
              onClose={() => {
                handleClose();
              }}
              severity={TYPE}
              sx={{ width: '100%' }}>
              {MESSAGE}
            </Alert>
          </Snackbar>
        </div>
      </ThemeProvider>
    </ApolloProvider>
  );
};

export default App;
