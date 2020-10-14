import React from 'react';

import { AuthProvider } from './contexts/AuthContext';

import Routes from './routes';

import 'react-toastify/dist/ReactToastify.min.css';
import './assets/styles/global.css';

function App() {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}

export default App;
