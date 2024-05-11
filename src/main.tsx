import ReactDOM from 'react-dom/client'
import '@mantine/core/styles.css';

import { MantineProvider } from '@mantine/core';
import { LoginPage } from './pages/Login.tsx';
import { RegisterPage } from './pages/Register.tsx';
import { NotFoundPage } from './pages/NotFound.tsx';
import { HomePage } from './pages/Home.tsx';
import { DashboardPage } from './pages/Dashboard.tsx';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <MantineProvider forceColorScheme='dark'>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
  </MantineProvider>
);