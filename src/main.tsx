/* import React from 'react'*/
import ReactDOM from 'react-dom/client'
import '@mantine/core/styles.css';

import { MantineProvider } from '@mantine/core';
import { LoginPage } from './pages/Login.tsx';
import { RegisterPage } from './pages/Register.tsx';
import { NothingFoundBackground } from './pages/NotFound.tsx';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <MantineProvider forceColorScheme='dark'>
    <Router>
      <Routes>
        <Route path="/login" Component={LoginPage} />
        <Route path="/register" Component={RegisterPage} />
        <Route path="*" Component={NothingFoundBackground} />
      </Routes>
    </Router>
  </MantineProvider>
);