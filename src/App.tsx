/* eslint-disable multiline-ternary */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { createTheme, ThemeProvider } from '@mui/material';
import './App.scss';
import { appTheme } from './core/const';
import './core/scss/styles.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SignIn } from '@app/pages/SignIn';
import Layout from '@app/pages/Layouts/Layout';
import { Books, Home, Information } from '@app/pages';
import { ApolloProvider } from '@apollo/client';
import { useAppApolloClient, useAuthToken } from '@core/hooks';
import { MainApp } from '@core/contexts/MainApp';
const theme = createTheme(appTheme);
const App = () => {
  const client = useAppApolloClient();
  const { authToken } = useAuthToken();
  console.log('authToken', authToken);
  return (
    <ApolloProvider client={client}>
      <MainApp>
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
          </div>
        </ThemeProvider>
      </MainApp>
    </ApolloProvider>
  );
};

export default App;
